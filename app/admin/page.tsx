"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Settings,
  CheckCircle,
  UserPlus,
  Building,
  DollarSign,
  Activity,
  Share2,
} from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  // Mock data for the admin dashboard
  const platformStats = {
    totalUsers: 12845,
    userGrowth: 12.5,
    totalInvestors: 8762,
    investorGrowth: 15.3,
    totalFounders: 4083,
    founderGrowth: 8.7,
    totalFundsRaised: 28500000,
    fundsGrowth: 22.4,
    activeProjects: 342,
    projectGrowth: 5.2,
    successfulProjects: 187,
    successRate: 78.5,
    averageRaise: 152000,
    averageRaiseGrowth: 3.8,
    platformRevenue: 1425000,
    revenueGrowth: 18.6,
  }

  // Recent activity data
  const recentActivity = [
    {
      id: "1",
      type: "investment",
      user: "John Doe",
      project: "DecentraVault",
      amount: 25000,
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "project_created",
      user: "Sarah Johnson",
      project: "MetaCanvas",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "milestone_completed",
      user: "Michael Chen",
      project: "ChainGovernance",
      milestone: "Smart Contract Audit",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "funds_released",
      user: "System",
      project: "DecentraVault",
      amount: 50000,
      milestone: "Beta Launch",
      time: "2 days ago",
    },
    {
      id: "5",
      type: "user_registered",
      user: "Emily Watson",
      role: "Investor",
      time: "2 days ago",
    },
  ]

  // User acquisition data
  const userAcquisitionData = [
    { date: "Mar 1, 2025", investors: 120, founders: 45 },
    { date: "Mar 8, 2025", investors: 145, founders: 52 },
    { date: "Mar 15, 2025", investors: 165, founders: 58 },
    { date: "Mar 22, 2025", investors: 190, founders: 63 },
    { date: "Mar 29, 2025", investors: 210, founders: 70 },
    { date: "Apr 5, 2025", investors: 235, founders: 78 },
    { date: "Apr 12, 2025", investors: 260, founders: 85 },
  ]

  // Revenue data
  const revenueData = [
    { month: "Jan 2025", transaction: 85000, subscription: 45000, premium: 25000 },
    { month: "Feb 2025", transaction: 92000, subscription: 48000, premium: 28000 },
    { month: "Mar 2025", transaction: 105000, subscription: 52000, premium: 32000 },
    { month: "Apr 2025", transaction: 118000, subscription: 56000, premium: 36000 },
  ]

  // Project metrics
  const projectMetrics = [
    { category: "DeFi", count: 87, percentage: 25.4, funds: 8500000 },
    { category: "NFT", count: 65, percentage: 19.0, funds: 5200000 },
    { category: "Infrastructure", count: 58, percentage: 17.0, funds: 6800000 },
    { category: "Gaming", count: 45, percentage: 13.2, funds: 3500000 },
    { category: "DAO", count: 42, percentage: 12.3, funds: 2800000 },
    { category: "Other", count: 45, percentage: 13.1, funds: 1700000 },
  ]

  // Pending approvals
  const pendingApprovals = [
    {
      id: "1",
      type: "project",
      name: "DeFi Aggregator Pro",
      founder: "Robert Smith",
      category: "DeFi",
      submittedDate: "Apr 10, 2025",
      status: "pending_review",
    },
    {
      id: "2",
      type: "milestone",
      project: "MetaCanvas",
      milestone: "Mobile App Launch",
      requestedAmount: 75000,
      submittedDate: "Apr 12, 2025",
      status: "pending_verification",
    },
    {
      id: "3",
      type: "withdrawal",
      project: "ChainGovernance",
      founder: "Michael Chen",
      amount: 120000,
      submittedDate: "Apr 13, 2025",
      status: "pending_approval",
    },
    {
      id: "4",
      type: "project",
      name: "GameFi World",
      founder: "Jennifer Lee",
      category: "Gaming",
      submittedDate: "Apr 14, 2025",
      status: "pending_review",
    },
  ]

  // Velocity metrics
  const velocityMetrics = {
    demandSide: [
      { metric: "Daily Active Investors", value: 1245, change: 8.5 },
      { metric: "New Investor Signups (Weekly)", value: 385, change: 12.3 },
      { metric: "Conversion Rate", value: "7.8%", change: 1.2 },
      { metric: "Fiat-to-Crypto Conversion", value: "65.3%", change: 5.7 },
      { metric: "Average Investment Per Backer", value: "5,200 USDC", change: 3.2 },
      { metric: "Repeat Investment Rate", value: "42.5%", change: 4.8 },
    ],
    supplySide: [
      { metric: "New Projects (Weekly)", value: 28, change: 6.2 },
      { metric: "Application Approval Rate", value: "72.4%", change: -2.1 },
      { metric: "Founder Retention Rate", value: "68.5%", change: 3.5 },
      { metric: "Time to First Backer", value: "2.3 days", change: -15.4 },
      { metric: "Funding Goal Achievement", value: "78.5%", change: 5.2 },
      { metric: "AI Verification Adoption", value: "85.2%", change: 7.8 },
    ],
    financialMetrics: [
      { metric: "Transaction Fee Revenue (Weekly)", value: "28,500 USDC", change: 12.5 },
      { metric: "Platform Fees from Raises", value: "145,000 USDC", change: 18.3 },
      { metric: "Premium AI Advisory Revenue", value: "32,500 USDC", change: 22.7 },
      { metric: "Subscription Revenue", value: "56,000 USDC", change: 8.4 },
      { metric: "Smart Contract Execution Fees", value: "12,800 USDC", change: 5.2 },
      { metric: "Total Weekly Revenue", value: "274,800 USDC", change: 14.8 },
    ],
  }

  // Projects with upcoming milestones
  const upcomingMilestones = [
    {
      id: "1",
      project: "DecentraVault",
      milestone: "Mainnet Launch",
      dueDate: "Apr 25, 2025",
      amount: 100000,
      progress: 85,
      status: "on_track",
    },
    {
      id: "2",
      project: "MetaCanvas",
      milestone: "Mobile App Beta",
      dueDate: "Apr 30, 2025",
      amount: 75000,
      progress: 65,
      status: "on_track",
    },
    {
      id: "3",
      project: "ChainGovernance",
      milestone: "Security Audit",
      dueDate: "May 5, 2025",
      amount: 50000,
      progress: 40,
      status: "at_risk",
    },
    {
      id: "4",
      project: "GameFi World",
      milestone: "Gameplay Demo",
      dueDate: "May 10, 2025",
      amount: 80000,
      progress: 25,
      status: "delayed",
    },
  ]

  // Detailed metrics for the new metrics dashboard
  const detailedMetrics = {
    // Demand-Side (Investors & Backers) - Phase 1
    investorAcquisition: [
      {
        metric: "Daily Active Investors (DAI)",
        value: 1245,
        change: 8.5,
        description: "Number of investors logging into the platform daily",
      },
      {
        metric: "New Investor Signups per Week",
        value: 385,
        change: 12.3,
        description: "Growth rate of new investors registering",
      },
      {
        metric: "Conversion Rate",
        value: "7.8%",
        change: 1.2,
        description: "Percentage of visitors who sign up and fund a project",
      },
      {
        metric: "Fiat-to-Crypto Conversion Rate",
        value: "65.3%",
        change: 5.7,
        description: "Percentage of fiat users who complete an investment in crypto",
      },
      {
        metric: "Founders Joining a Startup",
        value: 42,
        change: 15.2,
        description: "Number of founders joining existing startups",
      },
      {
        metric: "Founders Creating a Startup",
        value: 28,
        change: 6.2,
        description: "Number of founders creating new startups",
      },
      {
        metric: "Founders with Incomplete Profiles",
        value: 156,
        change: -12.4,
        description: "Number of founders who haven't completed their profiles",
      },
    ],

    // Demand-Side (Investors & Backers) - Phase 2
    investorEngagement: [
      {
        metric: "Average Investment Per Backer",
        value: "5,200 USDC",
        change: 3.2,
        description: "Median investment size across backers",
      },
      {
        metric: "Repeat Investment Rate",
        value: "42.5%",
        change: 4.8,
        description: "Percentage of investors making multiple investments",
      },
      {
        metric: "Investor Retention Rate (Week 1)",
        value: "78.3%",
        change: 2.1,
        description: "Percentage of investors returning after 1 week",
      },
      {
        metric: "Investor Retention Rate (Week 4)",
        value: "65.7%",
        change: 3.5,
        description: "Percentage of investors returning after 4 weeks",
      },
      {
        metric: "Total Funds Deployed per Week",
        value: "1.25M USDC",
        change: 18.4,
        description: "Velocity of investment inflows",
      },
      {
        metric: "AI Investment Recommendation Usage",
        value: "58.2%",
        change: 7.6,
        description: "Percentage of investors using AI-driven recommendations",
      },
    ],

    // Demand-Side (Investors & Backers) - Phase 2
    investorMonetization: [
      {
        metric: "Transaction Fee Revenue (Weekly)",
        value: "28,500 USDC",
        change: 12.5,
        description: "Revenue generated from investment transaction fees",
      },
      {
        metric: "Fiat On-Ramp Fees",
        value: "12,300 USDC",
        change: 8.7,
        description: "Revenue from fiat-to-crypto conversions",
      },
      {
        metric: "Withdrawal & Exit Fees",
        value: "8,750 USDC",
        change: 5.2,
        description: "Fees generated when investors liquidate or transfer funds",
      },
      {
        metric: "Premium AI Advisory Revenue",
        value: "32,500 USDC",
        change: 22.7,
        description: "Earnings from investors using premium AI-driven investment insights",
      },
      {
        metric: "Backer Subscription Revenue",
        value: "45,200 USDC",
        change: 15.3,
        description: "Revenue from subscription-based investment analytics tools",
      },
    ],

    // Demand-Side (Investors & Backers)
    investorNetwork: [
      {
        metric: "Referral Conversion Rate",
        value: "28.5%",
        change: 4.2,
        description: "Percentage of investors signing up via referrals",
      },
      {
        metric: "Social Sharing - Mentions",
        value: 1245,
        change: 32.5,
        description: "Number of social media mentions",
      },
      { metric: "Social Sharing - Reposts", value: 875, change: 28.7, description: "Number of reposts about projects" },
      {
        metric: "Social Sharing - Engagement",
        value: "18.3%",
        change: 5.4,
        description: "Engagement rate around project investments",
      },
    ],

    // Supply-Side (Founders & Projects)
    founderAcquisition: [
      {
        metric: "New Projects Launched per Week",
        value: 28,
        change: 6.2,
        description: "Number of campaigns initiated",
      },
      {
        metric: "Application Approval Rate",
        value: "72.4%",
        change: -2.1,
        description: "Percentage of projects approved vs. rejected by AI evaluation",
      },
      {
        metric: "Founder Retention Rate",
        value: "68.5%",
        change: 3.5,
        description: "Percentage of founders launching multiple projects",
      },
    ],

    // Supply-Side (Founders & Projects) - Phase 2
    fundingVelocity: [
      {
        metric: "Time to First Backer",
        value: "2.3 days",
        change: -15.4,
        description: "Average time it takes for a project to receive its first investment",
      },
      {
        metric: "Funding Goal Achievement Rate",
        value: "78.5%",
        change: 5.2,
        description: "Percentage of projects that meet their target",
      },
      {
        metric: "Average Raise per Project",
        value: "152,000 USDC",
        change: 3.8,
        description: "Median capital raised by early-stage founders",
      },
      {
        metric: "AI Verification Adoption Rate",
        value: "85.2%",
        change: 7.8,
        description: "Percentage of founders opting into AI evaluation and credibility scoring",
      },
    ],

    // Supply-Side (Founders & Projects) - Phase 2
    founderMonetization: [
      {
        metric: "Platform Fees from Successful Raises",
        value: "145,000 USDC",
        change: 18.3,
        description: "Percentage of total funds raised collected as platform fees",
      },
      {
        metric: "AI Verification Revenue",
        value: "28,500 USDC",
        change: 22.5,
        description: "Revenue from AI-driven due diligence and credibility scoring services",
      },
      {
        metric: "Founder Subscription Revenue",
        value: "42,300 USDC",
        change: 12.8,
        description: "Revenue from premium founder tools and growth services",
      },
      {
        metric: "Smart Contract Execution Fees",
        value: "12,800 USDC",
        change: 5.2,
        description: "Revenue from blockchain-based transactions for campaign management",
      },
      {
        metric: "Accelerator & Partner Fees",
        value: "35,000 USDC",
        change: 28.4,
        description: "Earnings from incubator/accelerator programs and ecosystem partners",
      },
    ],

    // Supply-Side (Founders & Projects) - Phase 2
    founderEngagement: [
      {
        metric: "Repeat Founders Rate",
        value: "32.5%",
        change: 8.7,
        description: "Percentage of founders launching multiple projects",
      },
      {
        metric: "Founder-Backer Interactions per Project",
        value: 28,
        change: 12.4,
        description: "Messages, updates, and engagement levels",
      },
      {
        metric: "Founder Support Requests",
        value: 145,
        change: -8.2,
        description: "Frequency and nature of support tickets submitted",
      },
    ],
  }

  // Weekly trends data for metrics
  const weeklyTrends = {
    dailyActiveInvestors: [980, 1050, 1120, 1180, 1210, 1245, 1280],
    newInvestorSignups: [320, 345, 360, 375, 380, 385, 395],
    conversionRate: [7.2, 7.3, 7.5, 7.6, 7.7, 7.8, 7.9],
    fiatToCrypto: [62.5, 63.1, 63.8, 64.2, 64.8, 65.3, 65.8],
    newProjects: [22, 24, 25, 26, 27, 28, 30],
    approvalRate: [74.2, 73.8, 73.5, 73.1, 72.8, 72.4, 72.1],
    transactionFees: [24500, 25800, 26400, 27200, 27800, 28500, 29200],
    platformFees: [128000, 132000, 136000, 140000, 142000, 145000, 148000],
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-[#A3A8AF]">{formattedDate} - Platform Analytics & Management</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B]">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 bg-[#1F2A3D] p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Users & Growth
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Projects
          </TabsTrigger>
          <TabsTrigger value="financials" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Financials
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Metrics Dashboard
          </TabsTrigger>
          <TabsTrigger value="approvals" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Approvals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Total Users</CardDescription>
                <CardTitle className="text-2xl text-white">{platformStats.totalUsers.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.userGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Total Funds Raised</CardDescription>
                <CardTitle className="text-2xl text-white">
                  {(platformStats.totalFundsRaised / 1000000).toFixed(1)}M USDC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.fundsGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Active Projects</CardDescription>
                <CardTitle className="text-2xl text-white">{platformStats.activeProjects}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.projectGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Platform Revenue</CardDescription>
                <CardTitle className="text-2xl text-white">
                  {(platformStats.platformRevenue / 1000).toFixed(1)}K USDC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.revenueGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-[#202C41] border-[#313E54] lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Platform Growth</CardTitle>
                  <Select defaultValue="3months">
                    <SelectTrigger className="w-[180px] bg-[#1F2A3D] border-[#313E54] text-white">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="6months">Last 6 months</SelectItem>
                      <SelectItem value="1year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-[#1F2A3D] rounded-lg border border-[#313E54] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=300&width=800&text=Platform+Growth+Chart"
                      alt="Platform growth chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-[#1F2A3D] p-3 rounded-lg border border-[#313E54]">
                    <p className="text-xs text-[#A3A8AF] mb-1">Investors</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{platformStats.totalInvestors.toLocaleString()}</p>
                      <Badge className="bg-green-900/30 text-green-400 border-green-800">
                        +{platformStats.investorGrowth}%
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-[#1F2A3D] p-3 rounded-lg border border-[#313E54]">
                    <p className="text-xs text-[#A3A8AF] mb-1">Founders</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{platformStats.totalFounders.toLocaleString()}</p>
                      <Badge className="bg-green-900/30 text-green-400 border-green-800">
                        +{platformStats.founderGrowth}%
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-[#1F2A3D] p-3 rounded-lg border border-[#313E54]">
                    <p className="text-xs text-[#A3A8AF] mb-1">Success Rate</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{platformStats.successRate}%</p>
                      <Badge className="bg-green-900/30 text-green-400 border-green-800">+5.2%</Badge>
                    </div>
                  </div>

                  <div className="bg-[#1F2A3D] p-3 rounded-lg border border-[#313E54]">
                    <p className="text-xs text-[#A3A8AF] mb-1">Avg. Raise</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">
                        {platformStats.averageRaise.toLocaleString()} USDC
                      </p>
                      <Badge className="bg-green-900/30 text-green-400 border-green-800">
                        +{platformStats.averageRaiseGrowth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#29305F] p-2 rounded-full">
                          {activity.type === "investment" ? (
                            <Wallet className="h-4 w-4 text-white" />
                          ) : activity.type === "project_created" ? (
                            <Building className="h-4 w-4 text-white" />
                          ) : activity.type === "milestone_completed" ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : activity.type === "funds_released" ? (
                            <DollarSign className="h-4 w-4 text-white" />
                          ) : (
                            <UserPlus className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            {activity.type === "investment"
                              ? `${activity.user} invested ${activity.amount.toLocaleString()} USDC in ${activity.project}`
                              : activity.type === "project_created"
                                ? `${activity.user} created project ${activity.project}`
                                : activity.type === "milestone_completed"
                                  ? `${activity.project} completed milestone: ${activity.milestone}`
                                  : activity.type === "funds_released"
                                    ? `${activity.amount.toLocaleString()} USDC released to ${activity.project} for ${activity.milestone}`
                                    : `${activity.user} registered as ${activity.role}`}
                          </h4>
                          <p className="text-xs text-[#A3A8AF] mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full text-[#A3A8AF]">
                  View All Activity 
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">Key Velocity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Demand-Side (Investors)</h3>
                    <div className="space-y-3">
                      {velocityMetrics.demandSide.slice(0, 3).map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                        >
                          <span className="text-[#A3A8AF]">{metric.metric}</span>
                          <div className="flex items-center">
                            <span className="text-white font-medium mr-2">{metric.value}</span>
                            <Badge
                              className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                            >
                              {metric.change >= 0 ? "+" : ""}
                              {metric.change}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Supply-Side (Founders)</h3>
                    <div className="space-y-3">
                      {velocityMetrics.supplySide.slice(0, 3).map((metric, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                        >
                          <span className="text-[#A3A8AF]">{metric.metric}</span>
                          <div className="flex items-center">
                            <span className="text-white font-medium mr-2">{metric.value}</span>
                            <Badge
                              className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                            >
                              {metric.change >= 0 ? "+" : ""}
                              {metric.change}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-white border-[#3D4E6B] bg-black hover:bg-[#1A2537]"
                  onClick={() => setActiveTab("metrics")}
                >
                  View All Metrics
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">Upcoming Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone) => (
                    <div key={milestone.id} className="p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-white">{milestone.project}</h4>
                          <p className="text-sm text-[#A3A8AF]">{milestone.milestone}</p>
                        </div>
                        <Badge
                          className={`
                          ${
                            milestone.status === "on_track"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : milestone.status === "at_risk"
                                ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                : "bg-red-900/30 text-red-400 border-red-800"
                          }
                        `}
                        >
                          {milestone.status === "on_track"
                            ? "On Track"
                            : milestone.status === "at_risk"
                              ? "At Risk"
                              : "Delayed"}
                        </Badge>
                      </div>

                      <div className="flex items-center text-xs text-[#A3A8AF] mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        Due: {milestone.dueDate}
                        <span className="mx-2">•</span>
                        <DollarSign className="mr-1 h-3 w-3" />
                        {milestone.amount.toLocaleString()} USDC
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#A3A8AF]">Progress</span>
                          <span className="text-[#A3A8AF]">{milestone.progress}%</span>
                        </div>
                        <Progress
                          value={milestone.progress}
                          className="h-2 bg-[#1F2A3D]"
                          indicatorClassName={`
                            ${
                              milestone.status === "on_track"
                                ? "bg-green-500"
                                : milestone.status === "at_risk"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }
                          `}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-white border-[#3D4E6B] bg-black hover:bg-[#1A2537]"
                  onClick={() => setActiveTab("projects")}
                >
                  View All Milestones
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Other existing tabs content here */}

        {/* New Metrics Dashboard Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Daily Active Investors</CardDescription>
                <CardTitle className="text-2xl text-white">{detailedMetrics.investorAcquisition[0].value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {detailedMetrics.investorAcquisition[0].change}% increase from last week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">New Investor Signups (Weekly)</CardDescription>
                <CardTitle className="text-2xl text-white">{detailedMetrics.investorAcquisition[1].value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {detailedMetrics.investorAcquisition[1].change}% increase from last week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">New Projects (Weekly)</CardDescription>
                <CardTitle className="text-2xl text-white">{detailedMetrics.founderAcquisition[0].value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {detailedMetrics.founderAcquisition[0].change}% increase from last week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Weekly Revenue</CardDescription>
                <CardTitle className="text-2xl text-white">{detailedMetrics.investorMonetization[0].value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {detailedMetrics.investorMonetization[0].change}% increase from last week
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white">Key Metrics Trends</CardTitle>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[180px] bg-[#1F2A3D] border-[#313E54] text-white">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center bg-[#1F2A3D] rounded-lg border border-[#313E54] relative overflow-hidden">
                  <div className="absolute inset-0">
                    <Image
                      src="/placeholder.svg?height=350&width=800&text=Key+Metrics+Trends+Chart"
                      alt="Key metrics trends chart"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">Weekly Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                    <h3 className="text-white font-medium mb-2">Daily Active Investors</h3>
                    <div className="flex items-center space-x-2">
                      {weeklyTrends.dailyActiveInvestors.map((value, index) => (
                        <div key={index} className="flex-1 h-16 flex flex-col items-center justify-end">
                          <div
                            className="w-full bg-blue-500 rounded-t-sm"
                            style={{
                              height: `${(value / Math.max(...weeklyTrends.dailyActiveInvestors)) * 100}%`,
                              opacity: index === weeklyTrends.dailyActiveInvestors.length - 1 ? 1 : 0.6 + index * 0.05,
                            }}
                          ></div>
                          <span className="text-xs text-[#A3A8AF] mt-1">D{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-[#A3A8AF]">7 days ago: {weeklyTrends.dailyActiveInvestors[0]}</span>
                      <span className="text-xs text-green-400">Today: {weeklyTrends.dailyActiveInvestors[6]}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                    <h3 className="text-white font-medium mb-2">New Investor Signups</h3>
                    <div className="flex items-center space-x-2">
                      {weeklyTrends.newInvestorSignups.map((value, index) => (
                        <div key={index} className="flex-1 h-16 flex flex-col items-center justify-end">
                          <div
                            className="w-full bg-purple-500 rounded-t-sm"
                            style={{
                              height: `${(value / Math.max(...weeklyTrends.newInvestorSignups)) * 100}%`,
                              opacity: index === weeklyTrends.newInvestorSignups.length - 1 ? 1 : 0.6 + index * 0.05,
                            }}
                          ></div>
                          <span className="text-xs text-[#A3A8AF] mt-1">D{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-[#A3A8AF]">7 days ago: {weeklyTrends.newInvestorSignups[0]}</span>
                      <span className="text-xs text-green-400">Today: {weeklyTrends.newInvestorSignups[6]}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                    <h3 className="text-white font-medium mb-2">Transaction Fee Revenue</h3>
                    <div className="flex items-center space-x-2">
                      {weeklyTrends.transactionFees.map((value, index) => (
                        <div key={index} className="flex-1 h-16 flex flex-col items-center justify-end">
                          <div
                            className="w-full bg-green-500 rounded-t-sm"
                            style={{
                              height: `${(value / Math.max(...weeklyTrends.transactionFees)) * 100}%`,
                              opacity: index === weeklyTrends.transactionFees.length - 1 ? 1 : 0.6 + index * 0.05,
                            }}
                          ></div>
                          <span className="text-xs text-[#A3A8AF] mt-1">D{index + 1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-[#A3A8AF]">7 days ago: {weeklyTrends.transactionFees[0]} USDC</span>
                      <span className="text-xs text-green-400">Today: {weeklyTrends.transactionFees[6]} USDC</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demand-Side Metrics - Phase 1 */}
          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  Demand-Side Metrics (Investors & Backers) - Phase 1
                </div>
              </CardTitle>
              <CardDescription className="text-[#A3A8AF]">
                Key acquisition metrics for the investor side of the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedMetrics.investorAcquisition.map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-white font-medium">{metric.metric}</h3>
                        <p className="text-sm text-[#A3A8AF]">{metric.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-white">{metric.value}</div>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demand-Side Metrics - Phase 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  <div className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-purple-400" />
                    Investor Engagement Metrics - Phase 2
                  </div>
                </CardTitle>
                <CardDescription className="text-[#A3A8AF]">
                  Metrics tracking investor engagement and platform stickiness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detailedMetrics.investorEngagement.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                    >
                      <div>
                        <div className="text-white font-medium">{metric.metric}</div>
                        <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium mr-2">{metric.value}</span>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-green-400" />
                    Investor Monetization Metrics - Phase 2
                  </div>
                </CardTitle>
                <CardDescription className="text-[#A3A8AF]">
                  Revenue metrics from the investor side of the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detailedMetrics.investorMonetization.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                    >
                      <div>
                        <div className="text-white font-medium">{metric.metric}</div>
                        <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium mr-2">{metric.value}</span>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Effects & Referrals */}
          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                <div className="flex items-center">
                  <Share2 className="mr-2 h-5 w-5 text-blue-400" />
                  Network Effects & Referrals
                </div>
              </CardTitle>
              <CardDescription className="text-[#A3A8AF]">
                Metrics tracking platform virality and network growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailedMetrics.investorNetwork.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                  >
                    <div>
                      <div className="text-white font-medium">{metric.metric}</div>
                      <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-white font-medium mr-2">{metric.value}</span>
                      <Badge
                        className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                      >
                        {metric.change >= 0 ? "+" : ""}
                        {metric.change}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Supply-Side Metrics */}
          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                <div className="flex items-center">
                  <Building className="mr-2 h-5 w-5 text-amber-400" />
                  Supply-Side Metrics (Founders & Projects)
                </div>
              </CardTitle>
              <CardDescription className="text-[#A3A8AF]">
                Key metrics for the founder side of the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Founder Acquisition</h3>
                  {detailedMetrics.founderAcquisition.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                    >
                      <div>
                        <div className="text-white font-medium">{metric.metric}</div>
                        <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium mr-2">{metric.value}</span>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Funding Velocity - Phase 2</h3>
                  {detailedMetrics.fundingVelocity.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                    >
                      <div>
                        <div className="text-white font-medium">{metric.metric}</div>
                        <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium mr-2">{metric.value}</span>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Founder Engagement - Phase 2</h3>
                  {detailedMetrics.founderEngagement.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1F2A3D] border border-[#313E54]"
                    >
                      <div>
                        <div className="text-white font-medium">{metric.metric}</div>
                        <div className="text-xs text-[#A3A8AF]">{metric.description}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-white font-medium mr-2">{metric.value}</span>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? "+" : ""}
                          {metric.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Founder Monetization */}
          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-green-400" />
                  Founder Monetization Metrics - Phase 2
                </div>
              </CardTitle>
              <CardDescription className="text-[#A3A8AF]">
                Revenue metrics from the founder side of the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedMetrics.founderMonetization.map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg bg-[#1F2A3D] border border-[#313E54]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-white font-medium">{metric.metric}</h3>
                        <p className="text-sm text-[#A3A8AF]">{metric.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-white">{metric.value}</div>
                        <Badge
                          className={`${metric.change >= 0 ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                        >
                          {metric.change >= 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(metric.change)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrics Dashboard Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              <Settings className="mr-2 h-4 w-4" />
              Configure Metrics
            </Button>
            <Button className="bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B]">
              <Download className="mr-2 h-4 w-4" />
              Export Metrics Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Total Users</CardDescription>
                <CardTitle className="text-2xl text-white">{platformStats.totalUsers.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.userGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Investors</CardDescription>
                <CardTitle className="text-2xl text-white">{platformStats.totalInvestors.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.investorGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Founders</CardDescription>
                <CardTitle className="text-2xl text-white">{platformStats.totalFounders.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {platformStats.founderGrowth}% increase from last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#202C41] border-[#313E54]">
              <CardHeader className="pb-2">
                <CardDescription className="text-[#A3A8AF]">Investor/Founder Ratio</CardDescription>
                <CardTitle className="text-2xl text-white">2.14:1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  6.2% increase from last month
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Projects tab content */}
        </TabsContent>

        <TabsContent value="financials" className="space-y-6">
          {/* Financials tab content */}
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          {/* Approvals tab content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

