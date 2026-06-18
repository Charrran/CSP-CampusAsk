"use client";

import { BookOpen, MessageSquare, Shield, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { fetchJson } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AdminAnalyticsResponse, ApiResponse, ModerationQueueResponse } from "@/types";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AdminAnalyticsResponse | null>(null);
  const [moderationCount, setModerationCount] = useState(0);

  useEffect(() => {
    Promise.all([
      fetchJson<ApiResponse<AdminAnalyticsResponse>>("/api/admin/analytics"),
      fetchJson<ApiResponse<ModerationQueueResponse>>("/api/admin/moderation"),
    ])
      .then(([analyticsResponse, moderationResponse]) => {
        setAnalytics(analyticsResponse.data ?? null);
        setModerationCount(moderationResponse.data?.totalFlagged ?? 0);
      })
      .catch(() => toast.error("Failed to load admin dashboard"));
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: analytics?.users.total ?? 0,
      description: "Registered users",
      icon: Users,
      trend: `${analytics?.users.students ?? 0} students, ${analytics?.users.faculty ?? 0} faculty`,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Total Doubts",
      value: analytics?.doubts.total ?? 0,
      description: "Questions posted",
      icon: MessageSquare,
      trend: `${analytics?.doubts.open ?? 0} open`,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      title: "Total Subjects",
      value: analytics?.subjectStats.length ?? 0,
      description: "Available subjects",
      icon: BookOpen,
      trend: "Academic catalog",
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: "Pending Moderation",
      value: moderationCount,
      description: "Items to review",
      icon: Shield,
      trend: moderationCount ? "Needs review" : "Nothing to moderate",
      color: "text-violet-600 bg-violet-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent border border-violet-500/10 p-6 lg:p-8">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-3 text-xs font-medium">Admin Portal</Badge>
          <h2 className="text-2xl font-bold tracking-tight">Hello, {user?.name?.split(" ")[0] || "Admin"}</h2>
          <p className="text-muted-foreground mt-1 max-w-lg">Manage users, subjects, and moderate platform activity from your admin dashboard.</p>
          <Link href="/admin/users">
            <Button className="mt-4 gap-2 cursor-pointer" size="sm">
              Manage Users <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Subject Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(analytics?.subjectStats ?? []).slice(0, 6).map((subject) => (
              <div key={subject.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="font-medium">{subject.name}</span>
                <Badge variant="secondary">{subject._count.doubts} doubts</Badge>
              </div>
            ))}
            {!analytics?.subjectStats.length && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Shield className="h-6 w-6 text-muted-foreground mb-4" />
                <h3 className="font-medium text-foreground">No activity yet</h3>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
