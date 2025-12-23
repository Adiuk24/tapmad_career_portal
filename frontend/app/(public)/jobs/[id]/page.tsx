"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  description: string;
  requirements: string;
  salaryRangeMin?: number;
  salaryRangeMax?: number;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatJobType = (type: string) => {
    return type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Job not found</p>
        <Link href="/jobs">
          <Button className="mt-4">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-4">← Back to Jobs</Button>
        </Link>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-4">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formatJobType(job.jobType)}
                  </div>
                  {job.salaryRangeMin && job.salaryRangeMax && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      PKR {job.salaryRangeMin.toLocaleString()} - {job.salaryRangeMax.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {formatJobType(job.jobType)}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none whitespace-pre-wrap">
                  {job.description}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none whitespace-pre-wrap">
                  {job.requirements}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
                <CardDescription>Ready to join our team?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href={`/apply/${job.id}`}>
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  You'll need to sign in or create an account to apply
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

