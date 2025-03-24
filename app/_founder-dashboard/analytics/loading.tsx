import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-purple-200/70">Track your project's performance and investor engagement</p>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[120px] bg-[#1F2A3D]" />
            <Skeleton className="h-10 w-[100px] bg-[#1F2A3D]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-purple-200/70">
                    <Skeleton className="h-4 w-24 bg-[#1F2A3D]" />
                  </CardDescription>
                  <CardTitle className="text-2xl text-white">
                    <Skeleton className="h-8 w-32 bg-[#1F2A3D]" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-40 bg-[#1F2A3D]" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px] bg-[#1F2A3D]" />
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                <Skeleton className="h-6 w-48 bg-[#1F2A3D]" />
              </CardTitle>
              <CardDescription className="text-purple-200/70">
                <Skeleton className="h-4 w-64 bg-[#1F2A3D]" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[350px] w-full bg-[#1F2A3D]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

