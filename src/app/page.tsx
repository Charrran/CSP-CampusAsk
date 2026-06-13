import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RootPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md mx-auto p-6 text-center shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-2">CampusAsk</CardTitle>
          <CardDescription className="text-lg text-gray-600">Instant academic doubt resolution for students and faculty</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center space-x-4 mt-4">
          <Link href="/login" passHref>
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="outline">Register</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}

