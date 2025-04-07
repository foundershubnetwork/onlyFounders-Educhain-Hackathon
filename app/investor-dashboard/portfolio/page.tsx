"use client"

import { useState } from "react"
import Image from "next/image"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  Filter,
  Download,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { PortfolioAnalytics } from "@/components/portfolio-analytics"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for the portfolio
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

  // Portfolio summary stats
  const portfolioStats = {
    totalInvested: investments.reduce((sum, inv) => sum + inv.invested, 0),
    totalValue: investments.reduce((sum, inv) => sum + inv.currentValue, 0),
    totalGrowth: (
      (investments.reduce((sum, inv) => sum + inv.currentValue, 0) /
        investments.reduce((sum, inv) => sum + inv.invested, 0) -
        1) *
      100
    ).toFixed(1),
    bestPerforming: investments.reduce((best, inv) => (inv.growth > best.growth ? inv : best), investments[0]),
    worstPerforming: investments.reduce((worst, inv) => (inv.growth < worst.growth ? inv : worst), investments[0]),
  }

  // Filter investments based on active tab
  const filteredInvestments =
    activeTab === "all"
      ? investments
      : activeTab === "active"
        ? investments.filter((inv) => inv.status === "active")
        : activeTab === "at_risk"
          ? investments.filter((inv) => inv.status === "at_risk")
          : investments.filter((inv) => inv.status === "completed")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Portfolio</h1>
            <p className="text-purple-200/70">Manage and track your investments</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Wallet className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Invested</CardDescription>
              <CardTitle className="text-2xl text-white">
                {portfolioStats.totalInvested.toLocaleString()} USDC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                15.3% increase from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Current Value</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.totalValue.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                {portfolioStats.totalGrowth}% total growth
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Best Performing</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.bestPerforming.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                {portfolioStats.bestPerforming.growth}% growth
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Worst Performing</CardDescription>
              <CardTitle className="text-2xl text-white">{portfolioStats.worstPerforming.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-sm flex items-center ${portfolioStats.worstPerforming.growth < 0 ? "text-red-500" : "text-green-500"}`}
              >
                {portfolioStats.worstPerforming.growth < 0 ? (
                  <TrendingDown className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingUp className="mr-1 h-4 w-4" />
                )}
                {portfolioStats.worstPerforming.growth}% growth
              </div>
            </CardContent>
          </Card>
        </div>

        <PortfolioAnalytics />

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Your Investments</h2>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#1F2A3D] p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="active" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Active
                </TabsTrigger>
                <TabsTrigger value="at_risk" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  At Risk
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {filteredInvestments.map((investment) => (
              <Card
                key={investment.id}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
              >
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
        </div>
      </div>
    </DashboardLayout>
  )
}

