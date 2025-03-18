"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Download,
  Mail,
  MessageSquare,
  CheckCircle,
  Users,
  UserPlus,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  ExternalLink,
} from "lucide-react"

export default function InvestorsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for investors
  const investors = [
    {
      id: "1",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=AT",
      email: "alex@example.com",
      investmentAmount: 25000,
      investmentDate: "Mar 25, 2025",
      status: "active",
      type: "individual",
      verified: true,
      location: "San Francisco, CA",
      portfolio: 12,
      previousInvestments: 8,
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      email: "sarah@example.com",
      investmentAmount: 15000,
      investmentDate: "Mar 22, 2025",
      status: "active",
      type: "individual",
      verified: true,
      location: "New York, NY",
      portfolio: 5,
      previousInvestments: 3,
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      email: "michael@example.com",
      investmentAmount: 30000,
      investmentDate: "Mar 18, 2025",
      status: "pending",
      type: "individual",
      verified: false,
      location: "Miami, FL",
      portfolio: 7,
      previousInvestments: 4,
    },
    {
      id: "4",
      name: "Quantum Ventures",
      avatar: "/placeholder.svg?height=40&width=40&text=QV",
      email: "investments@quantumventures.com",
      investmentAmount: 100000,
      investmentDate: "Mar 15, 2025",
      status: "active",
      type: "institutional",
      verified: true,
      location: "Boston, MA",
      portfolio: 35,
      previousInvestments: 28,
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      email: "david@example.com",
      investmentAmount: 20000,
      investmentDate: "Mar 10, 2025",
      status: "active",
      type: "individual",
      verified: true,
      location: "Seattle, WA",
      portfolio: 9,
      previousInvestments: 6,
    },
    {
      id: "6",
      name: "Blue Horizon Capital",
      avatar: "/placeholder.svg?height=40&width=40&text=BH",
      email: "invest@bluehorizon.com",
      investmentAmount: 75000,
      investmentDate: "Mar 5, 2025",
      status: "active",
      type: "institutional",
      verified: true,
      location: "Chicago, IL",
      portfolio: 42,
      previousInvestments: 35,
    },
    {
      id: "7",
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      email: "emma@example.com",
      investmentAmount: 10000,
      investmentDate: "Mar 1, 2025",
      status: "inactive",
      type: "individual",
      verified: true,
      location: "Austin, TX",
      portfolio: 3,
      previousInvestments: 1,
    },
  ]

  // Filter investors based on active tab and search query
  const filteredInvestors = investors
    .filter((investor) => {
      if (activeTab === "all") return true
      if (activeTab === "individual") return investor.type === "individual"
      if (activeTab === "institutional") return investor.type === "institutional"
      if (activeTab === "pending") return investor.status === "pending"
      return true
    })
    .filter(
      (investor) =>
        investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // Calculate investor stats
  const totalInvestors = investors.length
  const totalInvestment = investors.reduce((sum, investor) => sum + investor.investmentAmount, 0)
  const avgInvestment = totalInvestment / totalInvestors
  const individualInvestors = investors.filter((investor) => investor.type === "individual").length
  const institutionalInvestors = investors.filter((investor) => investor.type === "institutional").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Investors</h1>
            <p className="text-purple-200/70">Manage and communicate with your investors</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Investor
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1F2A3D] border-[#313E54] text-white">
                <DialogHeader>
                  <DialogTitle>Invite Investor</DialogTitle>
                  <DialogDescription className="text-purple-200/70">
                    Send an invitation to a potential investor.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="investor@example.com"
                      className="bg-[#29305F] border-[#313E54] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      placeholder="Enter a personal message"
                      className="w-full min-h-[100px] rounded-md bg-[#29305F] border border-[#313E54] text-white p-2"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investors</CardDescription>
              <CardTitle className="text-2xl text-white">{totalInvestors}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />3 new this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{totalInvestment.toLocaleString()} USDC</CardTitle>
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
              <CardDescription className="text-purple-200/70">Avg. Investment</CardDescription>
              <CardTitle className="text-2xl text-white">{Math.round(avgInvestment).toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                12% higher than platform average
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Investor Types</CardDescription>
              <CardTitle className="text-2xl text-white">
                {individualInvestors} / {institutionalInvestors}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <Users className="mr-1 h-4 w-4" />
                Individual / Institutional
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#1F2A3D] p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="individual" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Individual
                </TabsTrigger>
                <TabsTrigger
                  value="institutional"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Institutional
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Pending
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Search investors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#313E54]">
                      <th className="text-left p-4 text-[#A3A8AF] font-medium">Investor</th>
                      <th className="text-left p-4 text-[#A3A8AF] font-medium">Type</th>
                      <th className="text-left p-4 text-[#A3A8AF] font-medium">Amount</th>
                      <th className="text-left p-4 text-[#A3A8AF] font-medium">Date</th>
                      <th className="text-left p-4 text-[#A3A8AF] font-medium">Status</th>
                      <th className="text-right p-4 text-[#A3A8AF] font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvestors.map((investor) => (
                      <tr key={investor.id} className="border-b border-[#313E54] hover:bg-[#1F2A3D]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={investor.avatar} alt={investor.name} />
                              <AvatarFallback>{investor.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-1">
                                <h4 className="font-medium text-white">{investor.name}</h4>
                                {investor.verified && <CheckCircle className="h-3 w-3 text-blue-400" />}
                              </div>
                              <p className="text-xs text-[#A3A8AF]">{investor.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={`
                              ${
                                investor.type === "individual"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                  : "bg-purple-900/30 text-purple-400 border-purple-800"
                              }
                            `}
                          >
                            {investor.type === "individual" ? "Individual" : "Institutional"}
                          </Badge>
                        </td>
                        <td className="p-4 text-white">{investor.investmentAmount.toLocaleString()} USDC</td>
                        <td className="p-4">
                          <div className="flex items-center text-[#A3A8AF]">
                            <Calendar className="mr-1 h-3 w-3" />
                            {investor.investmentDate}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={`
                              ${
                                investor.status === "active"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : investor.status === "pending"
                                    ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                    : "bg-red-900/30 text-red-400 border-red-800"
                              }
                            `}
                          >
                            {investor.status === "active"
                              ? "Active"
                              : investor.status === "pending"
                                ? "Pending"
                                : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF]">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF]">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF]">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredInvestors.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-[#A3A8AF]">No investors found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

