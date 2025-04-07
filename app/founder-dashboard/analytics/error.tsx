"use client"

import { useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Analytics page error:", error)
  }, [error])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-purple-200/70">Track your project's performance and investor engagement</p>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <AlertTriangle className="h-16 w-16 text-amber-400 mb-4" />
            <CardTitle className="text-xl text-white mb-2">Something went wrong</CardTitle>
            <CardDescription className="text-purple-200/70 text-center mb-6">
              We encountered an error while loading the analytics data.
            </CardDescription>
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Raised</CardDescription>
              <CardTitle className="text-2xl text-white">750,000 USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">75% of target reached</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investors</CardDescription>
              <CardTitle className="text-2xl text-white">42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+10% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Milestones Completed</CardDescription>
              <CardTitle className="text-2xl text-white">3/8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">On track for next milestone</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investor Engagement</CardDescription>
              <CardTitle className="text-2xl text-white">High</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500">+25% comment activity</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

