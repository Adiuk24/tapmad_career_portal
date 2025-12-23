"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Mail } from "lucide-react";

interface Candidate {
  id: string;
  fullName: string;
  email: string;
  applicantProfile?: {
    phone?: string;
    linkedinUrl?: string;
    experienceYears?: number;
  };
  _count: {
    applications: number;
  };
  applications: Array<{
    status: string;
    job: {
      title: string;
      department: string;
    };
  }>;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, [search]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const params = search ? { search } : {};
      const data = await api.getCandidates(params);
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Candidate Database</h1>
        <p className="text-gray-600 mt-2">Browse and search all candidates</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      {loading ? (
        <div className="text-center py-12">Loading candidates...</div>
      ) : candidates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No candidates found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{candidate.fullName}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {candidate.email}
                    </CardDescription>
                    {candidate.applicantProfile?.phone && (
                      <CardDescription className="mt-1">
                        Phone: {candidate.applicantProfile.phone}
                      </CardDescription>
                    )}
                    {candidate.applicantProfile?.experienceYears && (
                      <CardDescription className="mt-1">
                        Experience: {candidate.applicantProfile.experienceYears} years
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant="outline">
                    {candidate._count.applications} application(s)
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Recent Applications:</div>
                  {candidate.applications.slice(0, 3).map((app, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {app.job.title} ({app.job.department}) -{" "}
                      <Badge variant="outline" className="text-xs">
                        {app.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                  {candidate.applications.length === 0 && (
                    <div className="text-sm text-gray-500">No applications yet</div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/dashboard/applications?candidate=${candidate.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Applications
                    </Button>
                  </Link>
                  {candidate.applicantProfile?.linkedinUrl && (
                    <a
                      href={candidate.applicantProfile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        LinkedIn
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

