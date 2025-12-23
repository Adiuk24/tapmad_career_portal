"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await api.getHRAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <p className="text-gray-600 mt-2">Insights into your recruitment process</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.avgTimeToHire || 0} days
            </div>
            <p className="text-xs text-muted-foreground">Average processing time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hired</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalHired || 0}</div>
            <p className="text-xs text-muted-foreground">Successful hires</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications by Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.applicationsByStatus?.map((item: any) => (
                <div key={item.status} className="flex justify-between text-sm">
                  <span className="capitalize">{item.status.replace("_", " ")}</span>
                  <span className="font-medium">{item._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Departments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics?.applicationsByDepartment?.slice(0, 3).map((item: any) => (
                <div key={item.department} className="flex justify-between text-sm">
                  <span>{item.department}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Applications by Status</CardTitle>
            <CardDescription>Distribution of application statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.applicationsByStatus?.map((item: any) => (
                <div key={item.status}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm capitalize">
                      {item.status.replace("_", " ")}
                    </span>
                    <span className="text-sm font-medium">{item._count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (item._count /
                            analytics.applicationsByStatus.reduce(
                              (acc: number, i: any) => acc + i._count,
                              0
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Jobs by Applications</CardTitle>
            <CardDescription>Most popular job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.applicationsByJob?.slice(0, 5).map((item: any, index: number) => (
                <div key={item.jobId} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="text-sm">Job ID: {item.jobId.slice(0, 8)}...</span>
                  </div>
                  <span className="text-sm font-medium">{item._count} applications</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

