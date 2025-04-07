"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, Clock, CheckCircle, Bookmark, Plus, Star, Trash2, Bell } from "lucide-react"

export default function WatchlistPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for the watchlist
  const watchlistProjects = [
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
      starred: true,
      notifications: true,
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
      starred: false,
      notifications: true,
    },
    {
      id: "3",
      name: "CryptoSwap",
      logo: "/placeholder.svg?height=40&width=40&text=CS",
      category: "DeFi",
      description: "Decentralized exchange with cross-chain swapping capabilities",
      raisedAmount: 180000,
      targetAmount: 250000,
      backers: 45,
      daysLeft: 12,
      starred: true,
      notifications: false,
    },
    {
      id: "4",
      name: "ArtBlock",
      logo: "/placeholder.svg?height=40&width=40&text=AB",
      category: "NFT",
      description: "AI-generated NFT platform with royalty distribution",
      raisedAmount: 120000,
      targetAmount: 200000,
      backers: 32,
      daysLeft: 8,
      starred: false,
      notifications: false,
    },
    {
      id: "5",
      name: "DataChain",
      logo: "/placeholder.svg?height=40&width=40&text=DC",
      category: "Infrastructure",
      description: "Decentralized data storage solution with encryption",
      raisedAmount: 320000,
      targetAmount: 400000,
      backers: 78,
      daysLeft: 15,
      starred: true,
      notifications: true,
    },
  ]

  // Filter projects based on search query
  const filteredProjects = watchlistProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Watchlist</h1>
            <p className="text-purple-200/70">Track projects you're interested in</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Search watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
            >
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
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <CheckCircle className="h-3 w-3 text-blue-400" />
                      </div>
                      <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54]">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={project.starred ? "text-yellow-400" : "text-[#A3A8AF]"}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={project.notifications ? "text-blue-400" : "text-[#A3A8AF]"}
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#A3A8AF] hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
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
                  asChild
                >
                  <Link href={`/marketplace/project/${project.id}`}>View</Link>
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Invest Now
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-[#1F2A3D] p-4 mb-4">
              <Plus className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Add to Watchlist</h3>
            <p className="text-[#A3A8AF] text-center mb-4">Discover and add more projects to your watchlist</p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Bookmark className="mr-2 h-4 w-4" />
              Browse Projects
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

