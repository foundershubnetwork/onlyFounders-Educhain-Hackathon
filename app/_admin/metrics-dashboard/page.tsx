"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  Building,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Wallet,
} from "lucide-react"
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function MetricsDashboardPage() {
  const [timeframe, setTimeframe] = useState("7d")

  // Sample data for platform metrics
  const platformMetrics = [
    { name: "Total Users", value: 12580, change: 15.4, icon: Users, trend: "up" },
    { name: "Active Projects", value: 342, change: 8.7, icon: Building, trend: "up" },
    { name: "Total Volume", value: 4250000, change: 23.6, icon: DollarSign, trend: "up" },
    { name: "Avg. ROI", value: 32.8, change: -2.1, icon: TrendingUp, trend: "down" },
  ]

  // Sample data for weekly metrics
  const weeklyData = [
    { day: "Mon", investors: 120, founders: 45, volume: 125000 },
    { day: "Tue", investors: 145, founders: 52, volume: 142000 },
    { day: "Wed", investors: 160, founders: 58, volume: 168000 },
    { day: "Thu", investors: 170, founders: 62, volume: 185000 },
    { day: "Fri", investors: 190, founders: 70, volume: 210000 },
    { day: "Sat", investors: 160, founders: 55, volume: 175000 },
    { day: "Sun", investors: 140, founders: 48, volume: 155000 },
  ]

  // Sample data for investor metrics
  const investorMetrics = [
    {
      phase: "Acquisition",
      metrics: [
        { name: "New Signups", value: 1250, change: 12.5, target: 1500, percentToTarget: 83.3 },
        { name: "KYC Completion", value: 78.5, change: 5.2, target: 85, percentToTarget: 92.4 },
        { name: "Wallet Connection", value: 92.3, change: 3.1, target: 95, percentToTarget: 97.2 },
      ],
    },
    {
      phase: "Activation",
      metrics: [
        { name: "Profile Completion", value: 68.7, change: 8.3, target: 80, percentToTarget: 85.9 },
        { name: "First Project View", value: 82.4, change: 6.7, target: 90, percentToTarget: 91.6 },
        { name: "AI Assistant Usage", value: 45.2, change: 15.8, target: 60, percentToTarget: 75.3 },
      ],
    },
    {
      phase: "Investment",
      metrics: [
        { name: "First Investment", value: 32.5, change: 7.8, target: 40, percentToTarget: 81.3 },
        { name: "Avg. Investment Size", value: 2850, change: 12.4, target: 3000, percentToTarget: 95.0 },
        { name: "Multi-Project Investors", value: 28.6, change: 9.2, target: 35, percentToTarget: 81.7 },
      ],
    },
    {
      phase: "Retention",
      metrics: [
        { name: "30-Day Retention", value: 72.3, change: 4.5, target: 80, percentToTarget: 90.4 },
        { name: "Repeat Investments", value: 45.8, change: 8.9, target: 55, percentToTarget: 83.3 },
        { name: "Referrals", value: 18.2, change: 22.5, target: 25, percentToTarget: 72.8 },
      ],
    },
  ]

  // Sample data for founder metrics
  const founderMetrics = [
    {
      phase: "Acquisition",
      metrics: [
        { name: "New Project Submissions", value: 185, change: 15.6, target: 200, percentToTarget: 92.5 },
        { name: "KYB Completion", value: 82.7, change: 7.3, target: 90, percentToTarget: 91.9 },
        { name: "Team Verification", value: 88.5, change: 5.2, target: 95, percentToTarget: 93.2 },
      ],
    },
    {
      phase: "Activation",
      metrics: [
        { name: "Project Profile Completion", value: 76.3, change: 9.5, target: 85, percentToTarget: 89.8 },
        { name: "Milestone Definition", value: 68.9, change: 12.7, target: 80, percentToTarget: 86.1 },
        { name: "AI Tools Usage", value: 52.4, change: 18.3, target: 65, percentToTarget: 80.6 },
      ],
    },
    {
      phase: "Funding",
      metrics: [
        { name: "Projects Funded", value: 58.2, change: 14.3, target: 70, percentToTarget: 83.1 },
        { name: "Avg. Funding Amount", value: 325000, change: 18.2, target: 350000, percentToTarget: 92.9 },
        { name: "Funding Goal Achievement", value: 72.5, change: 8.7, target: 80, percentToTarget: 90.6 },
      ],
    },
    {
      phase: "Retention",
      metrics: [
        { name: "Milestone Completion", value: 78.3, change: 6.2, target: 85, percentToTarget: 92.1 },
        { name: "Update Frequency", value: 65.7, change: 9.5, target: 75, percentToTarget: 87.6 },
        { name: "Follow-on Funding", value: 32.4, change: 25.6, target: 40, percentToTarget: 81.0 },
      ],
    },
  ]

  // Sample data for financial metrics
  const financialMetrics = [
    {
      category: "Revenue",
      metrics: [
        { name: "Platform Fees", value: 325000, change: 18.5, target: 400000, percentToTarget: 81.3 },
        { name: "Subscription Revenue", value: 185000, change: 22.3, target: 200000, percentToTarget: 92.5 },
        { name: "Token Listing Fees", value: 78000, change: 15.7, target: 100000, percentToTarget: 78.0 },
      ],
    },
    {
      category: "Transaction Volume",
      metrics: [
        { name: "Total Investment Volume", value: 4250000, change: 23.6, target: 5000000, percentToTarget: 85.0 },
        { name: "Average Transaction Size", value: 3850, change: 12.4, target: 4000, percentToTarget: 96.3 },
        { name: "Transaction Growth Rate", value: 18.7, change: 5.3, target: 20, percentToTarget: 93.5 },
      ],
    },
    {
      category: "Platform Health",
      metrics: [
        {
          name: "User Acquisition Cost",
          value: 85,
          change: -12.5,
          target: 75,
          percentToTarget: 88.2,
          lowerIsBetter: true,
        },
        { name: "Customer Lifetime Value", value: 1250, change: 15.8, target: 1500, percentToTarget: 83.3 },
        { name: "Revenue per User", value: 42.5, change: 8.7, target: 50, percentToTarget: 85.0 },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Metrics Dashboard</h1>
          <p className="text-[#A3A8AF]">Key performance indicators and analytics for Optimus AI</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px] bg-[#1F2A3D] border-[#313E54] text-white">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-white border-[#313E54] bg-[#1F2A3D] hover:bg-[#29305F]">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((metric) => (
          <Card key={metric.name} className="bg-[#202C41] border-[#313E54]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#29305F]">
                    <metric.icon className="h-5 w-5 text-[#635BFF]" />
                  </div>
                  <div className="text-[#A3A8AF] text-sm">{metric.name}</div>
                </div>
                <Badge
                  className={`${
                    metric.trend === "up"
                      ? "bg-green-900/30 text-green-400 border-green-800"
                      : "bg-red-900/30 text-red-400 border-red-800"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  )}
                  {Math.abs(metric.change)}%
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">
                {metric.name.includes("Volume") || metric.name.includes("ROI")
                  ? metric.name.includes("ROI")
                    ? `${metric.value}%`
                    : `${(metric.value / 1000000).toFixed(2)}M USDC`
                  : metric.value.toLocaleString()}
              </div>
              <div className="text-xs text-[#A3A8AF] mt-1">vs. previous {timeframe}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Metrics Comparison */}
      <Card className="bg-[#202C41] border-[#313E54]">
        <CardHeader>
          <CardTitle className="text-xl text-white">Weekly Metrics Comparison</CardTitle>
          <CardDescription className="text-[#A3A8AF]">
            User activity and transaction volume over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ChartContainer
              config={{
                investors: {
                  label: "New Investors",
                  color: "hsl(var(--chart-1))",
                },
                founders: {
                  label: "New Founders",
                  color: "hsl(var(--chart-2))",
                },
                volume: {
                  label: "Transaction Volume (USDC)",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#313E54" />
                  <XAxis dataKey="day" stroke="#A3A8AF" />
                  <YAxis yAxisId="left" stroke="#A3A8AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#A3A8AF" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="investors"
                    stroke="var(--color-investors)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="founders"
                    stroke="var(--color-founders)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="volume"
                    stroke="var(--color-volume)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">User Acquisition</h3>
              </div>
              <div className="text-2xl font-bold text-white">1,085</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5% vs. previous week
              </div>
            </div>

            <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">Engagement Rate</h3>
              </div>
              <div className="text-2xl font-bold text-white">68.7%</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8.3% vs. previous week
              </div>
            </div>

            <div className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">Avg. Transaction</h3>
              </div>
              <div className="text-2xl font-bold text-white">3,850 USDC</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                5.2% vs. previous week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics Tabs */}
      <Tabs defaultValue="investor" className="space-y-6">
        <TabsList className="bg-[#1F2A3D] p-1 rounded-lg">
          <TabsTrigger value="investor" className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Investor Metrics
          </TabsTrigger>
          <TabsTrigger value="founder" className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white">
            <Building className="mr-2 h-4 w-4" />
            Founder Metrics
          </TabsTrigger>
          <TabsTrigger value="financial" className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white">
            <DollarSign className="mr-2 h-4 w-4" />
            Financial Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="investor">
          {investorMetrics.map((phaseData) => (
            <Card key={phaseData.phase} className="bg-[#202C41] border-[#313E54] mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">{phaseData.phase} Phase Metrics</CardTitle>
                <CardDescription className="text-[#A3A8AF]">
                  Key metrics for the investor {phaseData.phase.toLowerCase()} phase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {phaseData.metrics.map((metric) => (
                    <div key={metric.name} className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{metric.name}</div>
                        <Badge
                          className={`${
                            (metric.lowerIsBetter ? metric.change < 0 : metric.change > 0)
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-red-900/30 text-red-400 border-red-800"
                          }`}
                        >
                          {(metric.lowerIsBetter ? metric.change < 0 : metric.change > 0) ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </Badge>
                      </div>

                      <div className="text-2xl font-bold text-white">
                        {typeof metric.value === "number" &&
                        metric.value > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.value.toLocaleString()
                          : metric.name.includes("Rate") ||
                              metric.name.includes("Completion") ||
                              metric.name.includes("Retention")
                            ? `${metric.value}%`
                            : metric.value}
                      </div>

                      <div className="text-xs text-[#A3A8AF] mt-1">
                        Target:{" "}
                        {typeof metric.target === "number" &&
                        metric.target > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.target.toLocaleString()
                          : metric.name.includes("Rate") ||
                              metric.name.includes("Completion") ||
                              metric.name.includes("Retention")
                            ? `${metric.target}%`
                            : metric.target}
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A3A8AF]">Progress to Target</span>
                          <span className="text-white">{metric.percentToTarget}%</span>
                        </div>
                        <Progress
                          value={metric.percentToTarget}
                          className="h-1.5 bg-[#29305F]/30"
                          indicatorClassName={`${
                            metric.percentToTarget >= 90
                              ? "bg-green-500"
                              : metric.percentToTarget >= 75
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="founder">
          {founderMetrics.map((phaseData) => (
            <Card key={phaseData.phase} className="bg-[#202C41] border-[#313E54] mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">{phaseData.phase} Phase Metrics</CardTitle>
                <CardDescription className="text-[#A3A8AF]">
                  Key metrics for the founder {phaseData.phase.toLowerCase()} phase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {phaseData.metrics.map((metric) => (
                    <div key={metric.name} className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{metric.name}</div>
                        <Badge
                          className={`${
                            (metric.lowerIsBetter ? metric.change < 0 : metric.change > 0)
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-red-900/30 text-red-400 border-red-800"
                          }`}
                        >
                          {(metric.lowerIsBetter ? metric.change < 0 : metric.change > 0) ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </Badge>
                      </div>

                      <div className="text-2xl font-bold text-white">
                        {typeof metric.value === "number" &&
                        metric.value > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.value.toLocaleString()
                          : metric.name.includes("Rate") ||
                              metric.name.includes("Completion") ||
                              metric.name.includes("Frequency")
                            ? `${metric.value}%`
                            : metric.value}
                      </div>

                      <div className="text-xs text-[#A3A8AF] mt-1">
                        Target:{" "}
                        {typeof metric.target === "number" &&
                        metric.target > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.target.toLocaleString()
                          : metric.name.includes("Rate") ||
                              metric.name.includes("Completion") ||
                              metric.name.includes("Frequency")
                            ? `${metric.target}%`
                            : metric.target}
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A3A8AF]">Progress to Target</span>
                          <span className="text-white">{metric.percentToTarget}%</span>
                        </div>
                        <Progress
                          value={metric.percentToTarget}
                          className="h-1.5 bg-[#29305F]/30"
                          indicatorClassName={`${
                            metric.percentToTarget >= 90
                              ? "bg-green-500"
                              : metric.percentToTarget >= 75
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="financial">
          {financialMetrics.map((categoryData) => (
            <Card key={categoryData.category} className="bg-[#202C41] border-[#313E54] mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-white">{categoryData.category} Metrics</CardTitle>
                <CardDescription className="text-[#A3A8AF]">
                  Key financial metrics for {categoryData.category.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {categoryData.metrics.map((metric) => (
                    <div key={metric.name} className="bg-[#1F2A3D] p-4 rounded-lg border border-[#313E54]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-medium">{metric.name}</div>
                        <Badge
                          className={`${
                            (metric.lowerIsBetter ? metric.change < 0 : metric.change > 0)
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-red-900/30 text-red-400 border-red-800"
                          }`}
                        >
                          {(metric.lowerIsBetter ? metric.change < 0 : metric.change > 0) ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </Badge>
                      </div>

                      <div className="text-2xl font-bold text-white">
                        {typeof metric.value === "number" &&
                        metric.value > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.value.toLocaleString()
                          : metric.name.includes("Rate") || metric.name.includes("Growth")
                            ? `${metric.value}%`
                            : metric.value}
                      </div>

                      <div className="text-xs text-[#A3A8AF] mt-1">
                        Target:{" "}
                        {typeof metric.target === "number" &&
                        metric.target > 1000 &&
                        !metric.name.includes("Rate") &&
                        !metric.name.includes("%")
                          ? metric.target.toLocaleString()
                          : metric.name.includes("Rate") || metric.name.includes("Growth")
                            ? `${metric.target}%`
                            : metric.target}
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A3A8AF]">Progress to Target</span>
                          <span className="text-white">{metric.percentToTarget}%</span>
                        </div>
                        <Progress
                          value={metric.percentToTarget}
                          className="h-1.5 bg-[#29305F]/30"
                          indicatorClassName={`${
                            metric.percentToTarget >= 90
                              ? "bg-green-500"
                              : metric.percentToTarget >= 75
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

