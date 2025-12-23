"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Linkedin, FileText } from "lucide-react";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchApplication();
    }
  }, [params.id]);

  const fetchApplication = async () => {
    setLoading(true);
    try {
      const data = await api.getApplication(params.id as string);
      setApplication(data);
      setStatus(data.status);
      setNotes(data.notes || "");
    } catch (error) {
      console.error("Error fetching application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await api.updateApplicationStatus(params.id as string, status, notes);
      fetchApplication();
      alert("Status updated successfully");
    } catch (error) {
      alert("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  const handleNotesUpdate = async () => {
    setUpdating(true);
    try {
      await api.addApplicationNotes(params.id as string, notes);
      fetchApplication();
      alert("Notes updated successfully");
    } catch (error) {
      alert("Error updating notes");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!application) {
    return <div className="text-center py-12">Application not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Application Details</h1>
          <p className="text-gray-600 mt-2">
            {application.job.title} • {application.job.department}
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Candidate Info */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold text-lg">{application.applicant.fullName}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {application.applicant.email}
                </div>
                {application.applicant.applicantProfile?.phone && (
                  <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {application.applicant.applicantProfile.phone}
                  </div>
                )}
                {application.applicant.applicantProfile?.linkedinUrl && (
                  <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <Linkedin className="h-4 w-4" />
                    <a
                      href={application.applicant.applicantProfile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          {application.coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm">{application.coverLetter}</div>
              </CardContent>
            </Card>
          )}

          {/* Resume */}
          {application.resumeUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </a>
              </CardContent>
            </Card>
          )}

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.statusHistory?.map((history: any, idx: number) => (
                  <div key={idx} className="border-l-2 pl-4 pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{history.status.replace("_", " ")}</Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(history.changedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Changed by: {history.changer.fullName}
                    </div>
                    {history.notes && (
                      <div className="text-sm text-gray-500 mt-1">{history.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="offer_extended">Offer Extended</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this application..."
                />
              </div>
              <Button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full"
              >
                {updating ? "Updating..." : "Update Status"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Add internal notes (only visible to HR team)..."
              />
              <Button
                onClick={handleNotesUpdate}
                disabled={updating}
                variant="outline"
                className="w-full"
              >
                {updating ? "Saving..." : "Save Notes"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

