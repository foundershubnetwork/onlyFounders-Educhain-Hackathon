"use client"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, CheckCircle, LineChart, Plus, Calendar, Clock, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FounderDashboardPage() {
  // Mock data for the dashboard
  const projectStats = {
    totalRaised: 750000,
    targetAmount: 1000000,
    investors: 42,
    avgInvestment: 17857,
    nextMilestone: "Mobile App Beta",
    nextMilestoneDate: "Apr 30, 2025",
    completedMilestones: 3,
    totalMilestones: 8,
  }

  const recentInvestors = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=48&width=48",
      amount: 25000,
      date: "Mar 25, 2025",
      verified: true,
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=48&width=48",
      amount: 15000,
      date: "Mar 22, 2025",
      verified: true,
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=48&width=48",
      amount: 30000,
      date: "Mar 18, 2025",
      verified: false,
    },
  ]

  const upcomingMilestones = [
    {
      id: "1",
      title: "Mobile App Beta",
      description: "Launch beta version of mobile app with core features",
      dueDate: "Apr 30, 2025",
      progress: 65,
      status: "in_progress",
    },
    {
      id: "2",
      title: "Security Audit",
      description: "Complete third-party security audit of platform",
      dueDate: "May 15, 2025",
      progress: 30,
      status: "in_progress",
    },
    {
      id: "3",
      title: "Mainnet Launch",
      description: "Full production launch on mainnet",
      dueDate: "Jun 30, 2025",
      progress: 10,
      status: "not_started",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Founder Dashboard</h1>
            <p className="text-purple-200/70">Manage your project and track fundraising progress</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/founder-dashboard/updates">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <FileText className="mr-2 h-4 w-4" />
                Post Update
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Raised</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.totalRaised.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                75% of target reached
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investors</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.investors}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />5 new investors this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Avg. Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{projectStats.avgInvestment.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12% higher than platform average
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Milestones</CardDescription>
              <CardTitle className="text-2xl text-white">
                {projectStats.completedMilestones}/{projectStats.totalMilestones}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-400 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Next: {projectStats.nextMilestone}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-white">Fundraising Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-purple-200/70">Raised</span>
                  <span className="text-white">
                    {projectStats.totalRaised.toLocaleString()} / {projectStats.targetAmount.toLocaleString()} USDC
                  </span>
                </div>
                <Progress
                  value={(projectStats.totalRaised / projectStats.targetAmount) * 100}
                  className="h-2 bg-purple-900/30"
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                />

                <div className="h-[300px] flex items-center justify-center bg-purple-900/30 rounded-lg border border-purple-800/20 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=300&width=600&text=Fundraising+Progress+Chart"
                      alt="Fundraising progress chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div className="relative z-10">
                    <LineChart className="h-12 w-12 text-purple-200/70 mx-auto mb-4" />
                    <p className="text-purple-200/70">Fundraising progress over time</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Recent Investors</h3>
                  <div className="space-y-3">
                    {recentInvestors.map((investor) => (
                      <div
                        key={investor.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-purple-900/30 border border-purple-800/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden relative">
                            <Image
                              src={investor.avatar || "/placeholder.svg"}
                              alt={investor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="font-medium text-white">{investor.name}</h4>
                              {investor.verified && <CheckCircle className="h-3 w-3 text-blue-400" />}
                            </div>
                            <div className="text-xs text-purple-200/70">{investor.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">{investor.amount.toLocaleString()} USDC</div>
                        </div>
                      </div>
                    ))}

                    <Link href="/founder-dashboard/investors">
                      <Button
                        variant="outline"
                        className="w-full text-white border-purple-800/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-purple-900/50"
                      >
                        View All Investors
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Upcoming Milestones</CardTitle>
                <Link href="/founder-dashboard/milestones">
                  <Button variant="link" className="text-blue-400">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMilestones.map((milestone) => (
                  <div key={milestone.id} className="p-3 rounded-lg bg-purple-900/30 border border-purple-800/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{milestone.title}</h4>
                      <Badge
                        className={`
                          ${
                            milestone.status === "completed"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : milestone.status === "in_progress"
                                ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                : "bg-purple-900/30 text-purple-400 border-purple-800"
                          }
                        `}
                      >
                        {milestone.status === "completed"
                          ? "Completed"
                          : milestone.status === "in_progress"
                            ? "In Progress"
                            : "Not Started"}
                      </Badge>
                    </div>

                    <p className="text-sm text-purple-200/70 mb-2">{milestone.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-purple-200/70">Progress</span>
                        <span className="text-purple-200/70">{milestone.progress}%</span>
                      </div>
                      <Progress
                        value={milestone.progress}
                        className="h-2 bg-purple-900/30"
                        indicatorClassName={`
                          ${
                            milestone.status === "completed"
                              ? "bg-green-500"
                              : milestone.status === "in_progress"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                          }
                        `}
                      />

                      <div className="flex items-center text-xs text-purple-200/70">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due: {milestone.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/founder-dashboard/milestones">
                <Button className="w-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-purple-900/50 text-white border border-purple-800/20">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

