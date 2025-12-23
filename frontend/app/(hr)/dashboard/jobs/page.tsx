"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { api } from "@/lib/api";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
  createdAt: string;
  _count?: {
    applications: number;
  };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs using API utility (includes auth token)
    api.getJobs()
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-gray-600 mt-2">Manage all job postings</p>
        </div>
        <Link href="/dashboard/jobs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">No jobs posted yet</p>
            <Link href="/dashboard/jobs/new">
              <Button>Post Your First Job</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {job.department} • {job.location}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {job._count?.applications || 0} applications
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/jobs/${job.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

