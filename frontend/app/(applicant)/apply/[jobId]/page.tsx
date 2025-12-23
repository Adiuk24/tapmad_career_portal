"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeUrl: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/apply/${params.jobId}`);
    }
  }, [status, router, params.jobId]);

  useEffect(() => {
    if (params.jobId) {
      fetchJob();
    }
  }, [params.jobId]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.jobId}`);
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createApplication({
        jobId: params.jobId,
        ...formData,
      });
      router.push("/applications?success=true");
    } catch (error) {
      alert("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
          {job && (
            <p className="text-gray-600">{job.title} • {job.department}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>Fill in your details to apply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="resumeUrl">Resume URL</Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://example.com/resume.pdf"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                />
                <p className="text-xs text-gray-500">
                  Upload your resume to a file hosting service and paste the URL here
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  rows={8}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

