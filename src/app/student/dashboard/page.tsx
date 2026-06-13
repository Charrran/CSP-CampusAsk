"use client";

import {
  MessageSquare,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "My Doubts",
    value: "0",
    description: "Total doubts posted",
    icon: MessageSquare,
    trend: "Post your first doubt",
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Answered",
    value: "0",
    description: "Doubts with answers",
    icon: CheckCircle2,
    trend: "No answers yet",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    title: "Pending Meetings",
    value: "0",
    description: "Scheduled sessions",
    icon: Clock,
    trend: "No meetings scheduled",
    color: "text-amber-600 bg-amber-100",
  },
  {
    title: "Saved Doubts",
    value: "0",
    description: "Bookmarked for later",
    icon: TrendingUp,
    trend: "Save interesting doubts",
    color: "text-violet-600 bg-violet-100",
  },
];

export default function StudentDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-6 lg:p-8">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-3 text-xs font-medium">
            Welcome back
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight">
            Hello, {user?.name?.split(" ")[0] || "Student"} 👋
          </h2>
          <p className="text-muted-foreground mt-1 max-w-lg">
            Ready to resolve some doubts? Post a new question or browse the
            knowledge base to find answers.
          </p>
          <Button className="mt-4 gap-2 cursor-pointer" size="sm">
            Post a Doubt <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 group"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground">No activity yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Your recent doubts, answers, and meeting activities will appear
              here. Get started by posting your first doubt!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
