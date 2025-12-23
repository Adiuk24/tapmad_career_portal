const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Get backend JWT token from NextAuth session
async function getBackendToken(): Promise<string | null> {
  try {
    // Get NextAuth session
    const sessionResponse = await fetch("/api/auth/session");
    if (!sessionResponse.ok) {
      return null;
    }
    
    const session = await sessionResponse.json();
    if (!session?.user?.id) {
      return null;
    }

    // Check if we have a cached token
    const cachedToken = localStorage.getItem("backend_jwt_token");
    if (cachedToken) {
      // Verify token is still valid (not expired)
      try {
        const payload = JSON.parse(atob(cachedToken.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          return cachedToken;
        }
      } catch {
        // Token invalid, clear it
        localStorage.removeItem("backend_jwt_token");
      }
    }

    // Exchange NextAuth session for backend JWT token
    const exchangeResponse = await fetch(`${API_URL}/auth/exchange-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        email: session.user.email,
        role: session.user.role,
      }),
    });

    if (!exchangeResponse.ok) {
      return null;
    }

    const { token } = await exchangeResponse.json();
    
    // Cache the token
    if (token) {
      localStorage.setItem("backend_jwt_token", token);
    }
    
    return token;
  } catch (error) {
    console.error("Error getting backend token:", error);
    return null;
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Get backend JWT token
  const token = await getBackendToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add Authorization header with JWT token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // If unauthorized, clear cached token and retry once
  if (response.status === 401 && token) {
    localStorage.removeItem("backend_jwt_token");
    const newToken = await getBackendToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      const retryResponse = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
        credentials: "include",
      });
      if (!retryResponse.ok) {
        const error = await retryResponse.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || "Request failed");
      }
      return retryResponse.json();
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}

export const api = {
  // Jobs
  getJobs: (params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return fetch(`${API_URL}/jobs${queryString}`).then((res) => res.json());
  },
  getJob: (id: string) => {
    return fetch(`${API_URL}/jobs/${id}`).then((res) => res.json());
  },
  createJob: (data: any) => {
    return fetchWithAuth("/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updateJob: (id: string, data: any) => {
    return fetchWithAuth(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  deleteJob: (id: string) => {
    return fetchWithAuth(`/jobs/${id}`, {
      method: "DELETE",
    });
  },

  // Applications
  getApplications: (params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return fetchWithAuth(`/applications${queryString}`);
  },
  getApplication: (id: string) => {
    return fetchWithAuth(`/applications/${id}`);
  },
  createApplication: (data: any) => {
    return fetchWithAuth("/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  updateApplicationStatus: (id: string, status: string, notes?: string) => {
    return fetchWithAuth(`/applications/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, notes }),
    });
  },
  addApplicationNotes: (id: string, notes: string) => {
    return fetchWithAuth(`/applications/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ notes }),
    });
  },

  // Users
  getProfile: () => {
    return fetchWithAuth("/users/profile");
  },
  updateProfile: (data: any) => {
    return fetchWithAuth("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // HR endpoints
  getHRStats: () => {
    return fetchWithAuth("/hr/stats");
  },
  getHRAnalytics: (params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return fetchWithAuth(`/hr/analytics${queryString}`);
  },
  getCandidates: (params?: Record<string, string>) => {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    return fetchWithAuth(`/hr/candidates${queryString}`);
  },

  // Saved Jobs
  getSavedJobs: () => {
    return fetchWithAuth("/saved-jobs");
  },
  saveJob: (jobId: string) => {
    return fetchWithAuth("/saved-jobs", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
  },
  unsaveJob: (jobId: string) => {
    return fetchWithAuth(`/saved-jobs/${jobId}`, {
      method: "DELETE",
    });
  },
};
