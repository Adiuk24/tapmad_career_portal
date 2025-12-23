# 🔌 API Reference — Complete Endpoint Documentation

**For:** Developers, API consumers, Frontend developers  
**Updated:** December 23, 2025  
**Base URL:** `http://localhost:8000` (development) or `https://api.yourdomain.com` (production)

---

## 📖 Table of Contents

1. [Authentication](#authentication)
2. [Auth Endpoints](#auth-endpoints)
3. [Jobs Endpoints](#jobs-endpoints)
4. [Applications Endpoints](#applications-endpoints)
5. [Users Endpoints](#users-endpoints)
6. [Saved Jobs Endpoints](#saved-jobs-endpoints)
7. [HR Endpoints](#hr-endpoints)
8. [Error Handling](#error-handling)
9. [Status Codes](#status-codes)

---

## 🔐 Authentication

### How It Works

1. **Register or Login** → Get JWT token
2. **Add token to requests** → API verifies you
3. **Token expires** → Get new token with refresh token
4. **Make authenticated requests** → Success!

### Token Header Format

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Example Request

```bash
curl -H "Authorization: Bearer eyJhbGc..." http://localhost:8000/api/auth/me
```

---

## 🔑 Auth Endpoints

### 1. Register User

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "applicant" // or "hr"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- `400` — Email already exists
- `400` — Invalid email format
- `400` — Password too short

---

### 2. Login

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- `401` — Invalid credentials
- `404` — User not found

---

### 3. Get Current User

**GET** `/api/auth/me`

**Headers Required:** 
```
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "applicant",
  "createdAt": "2024-12-23T10:00:00Z"
}
```

---

### 4. Refresh Token

**POST** `/api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 💼 Jobs Endpoints

### 1. Get All Jobs

**GET** `/api/jobs`

**Query Parameters (optional):**
```
?page=1              // Page number (default: 1)
&limit=10            // Results per page (default: 10)
&search=engineer     // Search in title/description
&category=engineering // Filter by category
&jobType=fulltime    // Filter by job type
&minSalary=50000     // Min salary filter
&maxSalary=150000    // Max salary filter
&location=remote     // Filter by location
&sort=newest         // Sort by: newest, oldest, salary_high, salary_low
```

**Response (200):**
```json
{
  "jobs": [
    {
      "id": "job_123",
      "title": "Senior React Developer",
      "company": "TechCorp",
      "category": "Engineering",
      "description": "Join our team...",
      "minSalary": 100000,
      "maxSalary": 150000,
      "currency": "USD",
      "location": "San Francisco",
      "jobType": "Full-time",
      "workMode": "Hybrid",
      "requiredSkills": ["React", "TypeScript", "Node.js"],
      "createdAt": "2024-12-23T10:00:00Z",
      "expiresAt": "2025-01-22T10:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "pages": 5
}
```

---

### 2. Get Single Job

**GET** `/api/jobs/:jobId`

**Response (200):**
```json
{
  "id": "job_123",
  "title": "Senior React Developer",
  "company": "TechCorp",
  "category": "Engineering",
  "description": "Join our team...",
  "minSalary": 100000,
  "maxSalary": 150000,
  "currency": "USD",
  "location": "San Francisco",
  "jobType": "Full-time",
  "workMode": "Hybrid",
  "requiredSkills": ["React", "TypeScript"],
  "niceToHaveSkills": ["Next.js", "GraphQL"],
  "requirements": "5+ years experience",
  "postedBy": {
    "id": "hr_123",
    "name": "Jane Smith"
  },
  "applicationCount": 23,
  "createdAt": "2024-12-23T10:00:00Z",
  "expiresAt": "2025-01-22T10:00:00Z"
}
```

---

### 3. Post a New Job (HR Only)

**POST** `/api/jobs`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "title": "Senior React Developer",
  "company": "TechCorp",
  "category": "Engineering",
  "description": "We're looking for...",
  "minSalary": 100000,
  "maxSalary": 150000,
  "currency": "USD",
  "location": "San Francisco, CA",
  "jobType": "Full-time",
  "workMode": "Hybrid",
  "requiredSkills": ["React", "TypeScript"],
  "niceToHaveSkills": ["Next.js"],
  "numberOfPositions": 2,
  "requirements": "5+ years experience"
}
```

**Response (201):**
```json
{
  "id": "job_456",
  "title": "Senior React Developer",
  // ... rest of job data
}
```

**Errors:**
- `401` — Not authenticated
- `403` — Not an HR user
- `400` — Missing required fields

---

### 4. Update Job (HR Only)

**PUT** `/api/jobs/:jobId`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:** (Same as create, optional fields)
```json
{
  "title": "Principal React Developer",
  "minSalary": 120000
}
```

**Response (200):** Updated job data

---

### 5. Delete Job (HR Only)

**DELETE** `/api/jobs/:jobId`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Response (204):** No content

---

## 📝 Applications Endpoints

### 1. Get All Applications

**GET** `/api/applications`

**Query Parameters (optional):**
```
?jobId=job_123        // Filter by job
&status=shortlisted   // Filter by status
&page=1               // Pagination
&limit=10             // Per page
&sortBy=newest        // Sort order
```

**Response (200):**
```json
{
  "applications": [
    {
      "id": "app_123",
      "applicantId": "user_123",
      "applicant": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "jobId": "job_123",
      "job": {
        "title": "Senior React Developer"
      },
      "status": "SHORTLISTED",
      "resumeUrl": "https://...", // null if not uploaded yet
      "coverLetter": "I'm interested because...",
      "rating": 5,
      "notes": "Great candidate",
      "appliedAt": "2024-12-23T10:00:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "pages": 2
}
```

---

### 2. Get Single Application

**GET** `/api/applications/:applicationId`

**Response (200):**
```json
{
  "id": "app_123",
  "applicantId": "user_123",
  "applicant": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "jobId": "job_123",
  "job": {
    "title": "Senior React Developer"
  },
  "status": "SHORTLISTED",
  "resumeUrl": null,
  "coverLetter": "I'm interested...",
  "rating": 5,
  "notes": "Great communication skills",
  "appliedAt": "2024-12-23T10:00:00Z",
  "statusHistory": [
    {
      "status": "PENDING",
      "changedAt": "2024-12-23T10:00:00Z"
    },
    {
      "status": "SHORTLISTED",
      "changedAt": "2024-12-23T11:00:00Z"
    }
  ]
}
```

---

### 3. Apply to Job

**POST** `/api/applications`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "jobId": "job_123",
  "coverLetter": "I'm very interested in this role because..."
}
```

**Response (201):**
```json
{
  "id": "app_456",
  "status": "PENDING",
  "jobId": "job_123",
  "appliedAt": "2024-12-23T10:00:00Z"
}
```

**Errors:**
- `401` — Not authenticated
- `400` — Already applied to this job
- `404` — Job not found

---

### 4. Update Application Status (HR Only)

**PUT** `/api/applications/:applicationId`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "status": "INTERVIEW", // PENDING, IN_REVIEW, SHORTLISTED, INTERVIEW, OFFER, HIRED, REJECTED
  "notes": "Schedule phone interview"
}
```

**Response (200):**
```json
{
  "id": "app_123",
  "status": "INTERVIEW",
  "notes": "Schedule phone interview",
  "updatedAt": "2024-12-23T11:00:00Z"
}
```

---

### 5. Add Note to Application (HR Only)

**POST** `/api/applications/:applicationId/notes`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "note": "Excellent technical skills, move to next round"
}
```

**Response (201):**
```json
{
  "id": "note_123",
  "text": "Excellent technical skills...",
  "createdAt": "2024-12-23T11:00:00Z"
}
```

---

### 6. Rate Application (HR Only)

**PUT** `/api/applications/:applicationId/rate`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "rating": 5 // 1-5
}
```

**Response (200):**
```json
{
  "id": "app_123",
  "rating": 5
}
```

---

## 👤 Users Endpoints

### 1. Get User Profile

**GET** `/api/users/:userId`

**Response (200):**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "applicant",
  "createdAt": "2024-12-23T10:00:00Z",
  "profile": {
    "phone": "555-1234",
    "location": "San Francisco",
    "bio": "Software engineer with 5+ years experience"
  }
}
```

---

### 2. Update User Profile

**PUT** `/api/users/profile`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "555-1234",
  "location": "San Francisco, CA",
  "bio": "Experienced software engineer"
}
```

**Response (200):**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "profile": {
    "phone": "555-1234",
    "location": "San Francisco, CA",
    "bio": "Experienced software engineer"
  }
}
```

---

### 3. Upload Resume

**POST** `/api/users/resume`

**Headers Required:**
```
Authorization: Bearer TOKEN
Content-Type: multipart/form-data
```

**Request Body:**
```
file: [PDF or DOC file]
```

**Response (200):**
```json
{
  "resumeUrl": "https://storage.example.com/resume.pdf"
}
```

**Note:** Currently returns mock URL. Phase 2 will integrate with cloud storage.

---

## 💾 Saved Jobs Endpoints

### 1. Get Saved Jobs

**GET** `/api/saved-jobs`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "savedJobs": [
    {
      "id": "saved_123",
      "jobId": "job_123",
      "job": {
        "id": "job_123",
        "title": "Senior React Developer",
        "company": "TechCorp"
      },
      "savedAt": "2024-12-23T10:00:00Z"
    }
  ]
}
```

---

### 2. Save a Job

**POST** `/api/saved-jobs`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "jobId": "job_123"
}
```

**Response (201):**
```json
{
  "id": "saved_456",
  "jobId": "job_123",
  "savedAt": "2024-12-23T10:00:00Z"
}
```

---

### 3. Remove Saved Job

**DELETE** `/api/saved-jobs/:jobId`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Response (204):** No content

---

## 📊 HR Endpoints

### 1. Get HR Dashboard Stats

**GET** `/api/hr/dashboard`

**Headers Required:**
```
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "stats": {
    "totalJobsPosted": 5,
    "activeApplications": 23,
    "shortlisted": 8,
    "hired": 2,
    "rejected": 5
  },
  "recentApplications": [
    {
      "id": "app_123",
      "applicantName": "Jane Smith",
      "jobTitle": "Senior Engineer",
      "appliedAt": "2024-12-23T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Analytics

**GET** `/api/hr/analytics`

**Query Parameters (optional):**
```
?startDate=2024-12-01   // Format: YYYY-MM-DD
&endDate=2024-12-31
```

**Response (200):**
```json
{
  "analytics": {
    "totalViews": 450,
    "totalApplications": 45,
    "applicationRate": "10%",
    "statusBreakdown": {
      "PENDING": 20,
      "SHORTLISTED": 15,
      "INTERVIEW": 5,
      "OFFER": 3,
      "HIRED": 2
    },
    "topJobs": [
      {
        "title": "Senior React Developer",
        "applications": 12,
        "views": 150
      }
    ],
    "timeToHire": 14 // Average days
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": {
    "field": ["error description"]
  }
}
```

### Example Error

```json
{
  "error": "Validation error",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

---

## 📊 Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| **200** | Success | Request completed successfully |
| **201** | Created | Resource created (POST) |
| **204** | No Content | Successful DELETE |
| **400** | Bad Request | Invalid data, missing fields |
| **401** | Unauthorized | Missing or invalid token |
| **403** | Forbidden | Don't have permission |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Email already exists, already applied |
| **500** | Server Error | Server problem, try again later |

---

## 🧪 Testing with cURL

### Register

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "Test@1234",
    "role": "applicant"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "Test@1234"
  }'
```

### Get All Jobs

```bash
curl http://localhost:8000/api/jobs
```

### Apply to Job

```bash
curl -X POST http://localhost:8000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job_123",
    "coverLetter": "I am interested"
  }'
```

---

## 🔐 Role-Based Access

| Endpoint | Public | Applicant | HR | Admin |
|----------|--------|-----------|-------|-------|
| GET /jobs | ✅ | ✅ | ✅ | ✅ |
| POST /jobs | ❌ | ❌ | ✅ | ✅ |
| PUT /jobs/:id | ❌ | ❌ | ✅ | ✅ |
| DELETE /jobs/:id | ❌ | ❌ | ✅ | ✅ |
| POST /applications | ❌ | ✅ | ❌ | ✅ |
| GET /applications | ❌ | ⚠️ Own only | ✅ | ✅ |
| PUT /applications/:id | ❌ | ❌ | ✅ | ✅ |
| GET /hr/analytics | ❌ | ❌ | ✅ | ✅ |

---

## 📞 Need Help?

- **API not responding?** Check backend is running: `curl http://localhost:8000/health`
- **Authentication failed?** Make sure token is in `Authorization: Bearer` header
- **Can't apply to job?** Make sure you're logged in as applicant
- **Can't post job?** Make sure you're logged in as HR

---

**Last Updated:** December 23, 2025  
**Base URL:** See your `.env` file  
**Questions?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Need a feature? Contribute on GitHub:** https://github.com/Adiuk24/tapmad_career_portal
