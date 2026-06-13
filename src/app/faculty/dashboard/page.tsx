"use client";

import {
  BookOpen,
  MessageSquare,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Subjects Assigned",
    value: "0",
    description: "Your teaching subjects",
    icon: BookOpen,
    trend: "Awaiting assignment",
    color: "text-blue-600 bg-blue-100",
  },
  {
    title: "Doubts to Answer",
    value: "0",
    description: "Pending in your subjects",
    icon: MessageSquare,
    trend: "No pending doubts",
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    title: "Pending Meetings",
    value: "0",
    description: "Meeting requests",
    icon: Calendar,
    trend: "No requests yet",
    color: "text-amber-600 bg-amber-100",
  },
  {
    title: "Students Helped",
    value: "0",
    description: "Total answers given",
    icon: Users,
    trend: "Start answering doubts",
    color: "text-violet-600 bg-violet-100",
  },
];

export default function FacultyDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/10 p-6 lg:p-8">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-3 text-xs font-medium">
            Faculty Portal
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight">
            Hello, {user?.name?.split(" ")[0] || "Professor"} 👋
          </h2>
          <p className="text-muted-foreground mt-1 max-w-lg">
            Review pending doubts from students in your subjects and manage
            your meeting schedule.
          </p>
          <Button className="mt-4 gap-2 cursor-pointer" size="sm">
            Answer Doubts <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
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
              Answered doubts and meeting activity will show up here once you
              start engaging with students.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
