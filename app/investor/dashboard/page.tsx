"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sparkles,
  Wallet,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  BookOpen,
  Award,
  Star,
  MessageSquare,
  Bookmark,
  Zap,
} from "lucide-react"

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("portfolio")

  // Mock data for the investor dashboard
  const portfolioStats = {
    totalInvested: 125000,
    investmentGrowth: 18.5,
    activeInvestments: 12,
    averageReturn: 22.4,
    totalProjects: 15,
    successfulExits: 3,
  }

  // Portfolio investments
  const investments = [
    {
      id: "1",
      name: "DecentraVault",
      logo: "/placeholder.svg?height=40&width=40&text=DV",
      category: "DeFi",
      invested: 25000,
      currentValue: 32500,
      growth: 30,
      progress: 75,
      status: "active",
      nextMilestone: "Mainnet Launch",
      nextMilestoneDate: "Apr 25, 2025",
    },
    {
      id: "2",
      name: "MetaCanvas",
      logo: "/placeholder.svg?height=40&width=40&text=MC",
      category: "NFT",
      invested: 15000,
      currentValue: 18750,
      growth: 25,
      progress: 60,
      status: "active",
      nextMilestone: "Mobile App Beta",
      nextMilestoneDate: "Apr 30, 2025",
    },
    {
      id: "3",
      name: "ChainGovernance",
      logo: "/placeholder.svg?height=40&width=40&text=CG",
      category: "DAO",
      invested: 20000,
      currentValue: 19000,
      growth: -5,
      progress: 40,
      status: "at_risk",
      nextMilestone: "Security Audit",
      nextMilestoneDate: "May 5, 2025",
    },
    {
      id: "4",
      name: "GameFi World",
      logo: "/placeholder.svg?height=40&width=40&text=GW",
      category: "Gaming",
      invested: 30000,
      currentValue: 36000,
      growth: 20,
      progress: 25,
      status: "active",
      nextMilestone: "Gameplay Demo",
      nextMilestoneDate: "May 10, 2025",
    },
    {
      id: "5",
      name: "BlockSync",
      logo: "/placeholder.svg?height=40&width=40&text=BS",
      category: "Infrastructure",
      invested: 35000,
      currentValue: 42000,
      growth: 20,
      progress: 90,
      status: "completed",
      nextMilestone: "Final Release",
      nextMilestoneDate: "Apr 20, 2025",
    },
  ]

  // Recommended projects
  const recommendedProjects = [
    {
      id: "1",
      name: "CryptoSwap",
      logo: "/placeholder.svg?height=40&width=40&text=CS",
      category: "DeFi",
      description: "Decentralized exchange with cross-chain swapping capabilities",
      raisedAmount: 180000,
      targetAmount: 250000,
      backers: 45,
      daysLeft: 12,
      matchScore: 92,
    },
    {
      id: "2",
      name: "ArtBlock",
      logo: "/placeholder.svg?height=40&width=40&text=AB",
      category: "NFT",
      description: "AI-generated NFT platform with royalty distribution",
      raisedAmount: 120000,
      targetAmount: 200000,
      backers: 32,
      daysLeft: 8,
      matchScore: 88,
    },
    {
      id: "3",
      name: "DataChain",
      logo: "/placeholder.svg?height=40&width=40&text=DC",
      category: "Infrastructure",
      description: "Decentralized data storage solution with encryption",
      raisedAmount: 320000,
      targetAmount: 400000,
      backers: 78,
      daysLeft: 15,
      matchScore: 85,
    },
  ]

  // Bookmarked projects
  const bookmarkedProjects = [
    {
      id: "1",
      name: "VirtualRealms",
      logo: "/placeholder.svg?height=40&width=40&text=VR",
      category: "Metaverse",
      description: "Immersive virtual world with blockchain-based economy",
      raisedAmount: 280000,
      targetAmount: 350000,
      backers: 65,
      daysLeft: 10,
    },
    {
      id: "2",
      name: "TokenGate",
      logo: "/placeholder.svg?height=40&width=40&text=TG",
      category: "Access",
      description: "Token-gated community platform with governance",
      raisedAmount: 150000,
      targetAmount: 200000,
      backers: 42,
      daysLeft: 5,
    },
  ]

  // Learning quests
  const learningQuests = [
    {
      id: "1",
      title: "Web3 Investment Fundamentals",
      description: "Learn the basics of investing in Web3 projects",
      progress: 75,
      modules: 4,
      completedModules: 3,
      xp: 150,
      timeEstimate: "2 hours",
    },
    {
      id: "2",
      title: "Due Diligence Masterclass",
      description: "Advanced techniques for evaluating Web3 startups",
      progress: 30,
      modules: 5,
      completedModules: 1.5,
      xp: 200,
      timeEstimate: "3 hours",
    },
    {
      id: "3",
      title: "Tokenomics 101",
      description: "Understanding token economics and valuation models",
      progress: 0,
      modules: 3,
      completedModules: 0,
      xp: 100,
      timeEstimate: "1.5 hours",
    },
  ]

  // Recent notifications
  const notifications = [
    {
      id: "1",
      type: "milestone",
      project: "DecentraVault",
      message: "Completed milestone: Smart Contract Audit",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "investment",
      project: "MetaCanvas",
      message: "Your investment of 5,000 USDC has been confirmed",
      time: "1 day ago",
    },
    {
      id: "3",
      type: "update",
      project: "ChainGovernance",
      message: "New update posted: Development Progress Report",
      time: "2 days ago",
    },
    {
      id: "4",
      type: "alert",
      project: "GameFi World",
      message: "Milestone deadline approaching in 3 days",
      time: "3 days ago",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      {/* Header with Logo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Optimus AI</h1>
            <p className="text-[#A3A8AF]">Investor Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
            <Bell className="mr-2 h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Notifications</span>
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36&text=JD" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-[#202C41] border-[#313E54]">
          <CardHeader className="pb-2">
            <CardDescription className="text-[#A3A8AF]">Total Invested</CardDescription>
            <CardTitle className="text-2xl text-white">{portfolioStats.totalInvested.toLocaleString()} USDC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-500 flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              {portfolioStats.investmentGrowth}% increase from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#202C41] border-[#313E54]">
          <CardHeader className="pb-2">
            <CardDescription className="text-[#A3A8AF]">Active Investments</CardDescription>
            <CardTitle className="text-2xl text-white">{portfolioStats.activeInvestments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-[#A3A8AF]">{portfolioStats.totalProjects} total projects</div>
          </CardContent>
        </Card>

        <Card className="bg-[#202C41] border-[#313E54]">
          <CardHeader className="pb-2">
            <CardDescription className="text-[#A3A8AF]">Average Return</CardDescription>
            <CardTitle className="text-2xl text-white">{portfolioStats.averageReturn}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-green-500 flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              3.2% increase from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#202C41] border-[#313E54]">
          <CardHeader className="pb-2">
            <CardDescription className="text-[#A3A8AF]">Successful Exits</CardDescription>
            <CardTitle className="text-2xl text-white">{portfolioStats.successfulExits}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-[#A3A8AF]">20% success rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 bg-[#1F2A3D] p-1 rounded-lg">
          <TabsTrigger value="portfolio" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="discover" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Discover
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Bookmarks
          </TabsTrigger>
          <TabsTrigger value="learn" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Learn & Earn
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-black data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Portfolio Tab Content */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Your Investments</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Wallet className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {investments.map((investment) => (
              <Card key={investment.id} className="bg-[#202C41] border-[#313E54]">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="bg-[#1F2A3D] p-2 rounded-lg">
                        <Image
                          src={investment.logo || "/placeholder.svg"}
                          alt={investment.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{investment.name}</h3>
                        <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                          {investment.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div>
                        <p className="text-xs text-[#A3A8AF]">Invested</p>
                        <p className="font-medium text-white">{investment.invested.toLocaleString()} USDC</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Current Value</p>
                        <p className="font-medium text-white">{investment.currentValue.toLocaleString()} USDC</p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Growth</p>
                        <p
                          className={`font-medium flex items-center ${investment.growth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {investment.growth >= 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {Math.abs(investment.growth)}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#A3A8AF]">Status</p>
                        <Badge
                          className={`
                          ${
                            investment.status === "active"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : investment.status === "at_risk"
                                ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                : investment.status === "completed"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                  : "bg-red-900/30 text-red-400 border-red-800"
                          }
                        `}
                        >
                          {investment.status === "active"
                            ? "Active"
                            : investment.status === "at_risk"
                              ? "At Risk"
                              : investment.status === "completed"
                                ? "Completed"
                                : "Delayed"}
                        </Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                      View Details
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Project Progress</span>
                      <span className="text-[#A3A8AF]">{investment.progress}%</span>
                    </div>
                    <Progress
                      value={investment.progress}
                      className="h-2 bg-[#1F2A3D]"
                      indicatorClassName={`
                        ${
                          investment.status === "active"
                            ? "bg-blue-500"
                            : investment.status === "at_risk"
                              ? "bg-amber-500"
                              : investment.status === "completed"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }
                      `}
                    />

                    <div className="flex items-center text-xs text-[#A3A8AF]">
                      <Clock className="mr-1 h-3 w-3" />
                      Next Milestone: {investment.nextMilestone}
                      <span className="mx-2">•</span>
                      <Calendar className="mr-1 h-3 w-3" />
                      Due: {investment.nextMilestoneDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              View All Investments
            </Button>
          </div>
        </TabsContent>

        {/* Discover Tab Content */}
        <TabsContent value="discover" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Recommended Projects</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProjects.map((project) => (
              <Card key={project.id} className="bg-[#202C41] border-[#313E54]">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1F2A3D] p-2 rounded-lg">
                        <Image
                          src={project.logo || "/placeholder.svg"}
                          alt={project.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-blue-900/30 text-blue-400 border-blue-800 flex items-center">
                      <Sparkles className="mr-1 h-3 w-3" />
                      {project.matchScore}% Match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[#A3A8AF]">{project.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Raised</span>
                      <span className="text-[#A3A8AF]">
                        {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(project.raisedAmount / project.targetAmount) * 100}
                      className="h-2 bg-[#1F2A3D]"
                      indicatorClassName="bg-blue-500"
                    />

                    <div className="flex justify-between text-xs text-[#A3A8AF]">
                      <span>{project.raisedAmount.toLocaleString()} USDC</span>
                      <span>{project.targetAmount.toLocaleString()} USDC</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-[#A3A8AF]">
                      <Users className="mr-1 h-4 w-4" />
                      {project.backers} backers
                    </div>
                    <div className="flex items-center text-[#A3A8AF]">
                      <Clock className="mr-1 h-4 w-4" />
                      {project.daysLeft} days left
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]"
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">View Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              Explore More Projects
            </Button>
          </div>
        </TabsContent>

        {/* Bookmarks Tab Content */}
        <TabsContent value="bookmarks" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Bookmarked Projects</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
                <input
                  type="text"
                  placeholder="Search bookmarks..."
                  className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarkedProjects.map((project) => (
              <Card key={project.id} className="bg-[#202C41] border-[#313E54]">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1F2A3D] p-2 rounded-lg">
                      <Image
                        src={project.logo || "/placeholder.svg"}
                        alt={project.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{project.name}</h3>
                      <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-[#A3A8AF]">{project.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Raised</span>
                      <span className="text-[#A3A8AF]">
                        {Math.round((project.raisedAmount / project.targetAmount) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(project.raisedAmount / project.targetAmount) * 100}
                      className="h-2 bg-[#1F2A3D]"
                      indicatorClassName="bg-blue-500"
                    />

                    <div className="flex justify-between text-xs text-[#A3A8AF]">
                      <span>{project.raisedAmount.toLocaleString()} USDC</span>
                      <span>{project.targetAmount.toLocaleString()} USDC</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-[#A3A8AF]">
                      <Users className="mr-1 h-4 w-4" />
                      {project.backers} backers
                    </div>
                    <div className="flex items-center text-[#A3A8AF]">
                      <Clock className="mr-1 h-4 w-4" />
                      {project.daysLeft} days left
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]"
                  >
                    <Bookmark className="mr-2 h-4 w-4 text-blue-500" />
                    Saved
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">View Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {bookmarkedProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bookmark className="h-12 w-12 text-[#A3A8AF] mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No bookmarked projects yet</h3>
              <p className="text-[#A3A8AF] max-w-md">
                You haven't bookmarked any projects yet. Browse the marketplace and save projects you're interested in.
              </p>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">Explore Projects</Button>
            </div>
          )}
        </TabsContent>

        {/* Learn & Earn Tab Content */}
        <TabsContent value="learn" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Learning Quests</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                <BookOpen className="mr-2 h-4 w-4" />
                All Courses
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Award className="mr-2 h-4 w-4" />
                Your Achievements
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningQuests.map((quest) => (
              <Card key={quest.id} className="bg-[#202C41] border-[#313E54]">
                <CardHeader>
                  <CardTitle className="text-white">{quest.title}</CardTitle>
                  <CardDescription className="text-[#A3A8AF]">{quest.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Progress</span>
                      <span className="text-[#A3A8AF]">{quest.progress}%</span>
                    </div>
                    <Progress value={quest.progress} className="h-2 bg-[#1F2A3D]" indicatorClassName="bg-blue-500" />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-[#A3A8AF]">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {quest.completedModules}/{quest.modules} modules
                    </div>
                    <div className="flex items-center text-[#A3A8AF]">
                      <Clock className="mr-1 h-4 w-4" />
                      {quest.timeEstimate}
                    </div>
                    <div className="flex items-center text-[#A3A8AF]">
                      <Zap className="mr-1 h-4 w-4 text-yellow-500" />
                      {quest.xp} XP
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    {quest.progress > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-[#202C41] border-[#313E54]">
            <CardHeader>
              <CardTitle className="text-white">Your Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <Star className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Level 3 Investor</h3>
                        <p className="text-xs text-[#A3A8AF]">450 XP to next level</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">550 XP</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Level Progress</span>
                      <span className="text-[#A3A8AF]">55%</span>
                    </div>
                    <Progress value={55} className="h-2 bg-[#1F2A3D]" indicatorClassName="bg-blue-500" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Achievements</h3>
                        <p className="text-xs text-[#A3A8AF]">5 of 25 completed</p>
                      </div>
                    </div>
                    <Badge className="bg-green-900/30 text-green-400 border-green-800">20%</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#A3A8AF]">Achievement Progress</span>
                      <span className="text-[#A3A8AF]">20%</span>
                    </div>
                    <Progress value={20} className="h-2 bg-[#1F2A3D]" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab Content */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Recent Notifications</h2>
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              Mark All as Read
            </Button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="bg-[#202C41] border-[#313E54]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "milestone"
                          ? "bg-green-500/20"
                          : notification.type === "investment"
                            ? "bg-blue-500/20"
                            : notification.type === "update"
                              ? "bg-purple-500/20"
                              : "bg-amber-500/20"
                      }`}
                    >
                      {notification.type === "milestone" ? (
                        <CheckCircle className={`h-5 w-5 text-green-500`} />
                      ) : notification.type === "investment" ? (
                        <Wallet className={`h-5 w-5 text-blue-500`} />
                      ) : notification.type === "update" ? (
                        <MessageSquare className={`h-5 w-5 text-purple-500`} />
                      ) : (
                        <AlertCircle className={`h-5 w-5 text-amber-500`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3 className="font-medium text-white">{notification.project}</h3>
                        <span className="text-xs text-[#A3A8AF]">{notification.time}</span>
                      </div>
                      <p className="text-sm text-[#A3A8AF] mt-1">{notification.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              View All Notifications
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

