"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AppLayout } from "@/components/layout/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Filter, Search, Star, TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react"

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for projects
  const projects = [
    {
      id: "decentravault",
      name: "DecentraVault",
      tagline: "Decentralized storage solution with enhanced security and privacy",
      description:
        "DecentraVault is building a next-generation decentralized storage platform that combines blockchain security with advanced encryption to provide unparalleled data privacy and protection.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "Infrastructure",
      stage: "Seed",
      raised: 750000,
      target: 1500000,
      investors: 120,
      deadline: "Apr 30, 2025",
      team: [
        {
          name: "Sarah Johnson",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Michael Chen",
          role: "CTO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.8,
      trending: true,
      featured: true,
    },
    {
      id: "metacanvas",
      name: "MetaCanvas",
      tagline: "Web3 creative platform for digital artists and collectors",
      description:
        "MetaCanvas is revolutionizing digital art creation and ownership with a comprehensive platform that enables artists to create, showcase, and monetize their work through NFTs and collaborative projects.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "NFTs",
      stage: "Series A",
      raised: 3200000,
      target: 5000000,
      investors: 245,
      deadline: "May 15, 2025",
      team: [
        {
          name: "Alex Rodriguez",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Emily Watson",
          role: "Creative Director",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.5,
      trending: true,
      featured: false,
    },
    {
      id: "chaingovernance",
      name: "ChainGovernance",
      tagline: "DAO governance framework for decentralized decision-making",
      description:
        "ChainGovernance provides a comprehensive solution for creating, managing, and optimizing DAO governance systems, enabling truly decentralized and efficient community decision-making.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "DAOs",
      stage: "Pre-seed",
      raised: 350000,
      target: 800000,
      investors: 75,
      deadline: "Apr 20, 2025",
      team: [
        {
          name: "David Kim",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Sophia Martinez",
          role: "Head of Operations",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.2,
      trending: false,
      featured: true,
    },
    {
      id: "defiexchange",
      name: "DeFiExchange",
      tagline: "Cross-chain decentralized exchange with advanced trading features",
      description:
        "DeFiExchange is building a next-generation DEX that supports cross-chain trading, advanced order types, and institutional-grade liquidity, all while maintaining true decentralization.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "DeFi",
      stage: "Seed",
      raised: 900000,
      target: 2000000,
      investors: 150,
      deadline: "May 5, 2025",
      team: [
        {
          name: "James Wilson",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Anna Lee",
          role: "CTO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.6,
      trending: true,
      featured: false,
    },
    {
      id: "cryptoanalytics",
      name: "CryptoAnalytics",
      tagline: "AI-powered analytics platform for crypto markets",
      description:
        "CryptoAnalytics leverages artificial intelligence and machine learning to provide real-time market insights, predictive analytics, and trading signals for cryptocurrency investors.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "Analytics",
      stage: "Series A",
      raised: 2800000,
      target: 4000000,
      investors: 210,
      deadline: "Jun 10, 2025",
      team: [
        {
          name: "Robert Chang",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Lisa Brown",
          role: "Head of Data Science",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.4,
      trending: false,
      featured: true,
    },
    {
      id: "nftmarketplace",
      name: "NFTMarketplace",
      tagline: "Community-owned NFT marketplace with creator-first features",
      description:
        "NFTMarketplace is building a decentralized, community-owned NFT platform that prioritizes creator royalties, fair fee distribution, and innovative discovery mechanisms.",
      logo: "/placeholder.svg?height=80&width=80",
      banner: "/placeholder.svg?height=300&width=600",
      category: "NFTs",
      stage: "Seed",
      raised: 650000,
      target: 1200000,
      investors: 95,
      deadline: "Apr 25, 2025",
      team: [
        {
          name: "Thomas Garcia",
          role: "Founder & CEO",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          name: "Michelle Park",
          role: "Product Lead",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
      rating: 4.3,
      trending: false,
      featured: false,
    },
  ]

  // Filter projects based on active tab
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true
    if (activeTab === "trending") return project.trending
    if (activeTab === "featured") return project.featured
    return project.category.toLowerCase() === activeTab.toLowerCase()
  })

  // Featured projects for the hero section
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2)

  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Startup Marketplace</h1>
            <p className="text-gray-400">Discover and invest in promising blockchain projects</p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
            >
              <div className="relative h-48 w-full">
                <Image src={project.banner || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-600">Featured</Badge>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Badge className="bg-purple-600">{project.stage}</Badge>
                  <Badge variant="outline" className="bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
                    {project.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-800">
                    <Image src={project.logo || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">{project.name}</CardTitle>
                    <CardDescription className="text-gray-400">{project.tagline}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Raised</span>
                    <span className="text-white font-medium">
                      ${project.raised.toLocaleString()} / ${project.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(project.raised / project.target) * 100}
                    className="h-2 bg-gray-800"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Investors</div>
                    <div className="text-white font-medium">{project.investors}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Rating</div>
                    <div className="text-white font-medium flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                      {project.rating}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Closes</div>
                    <div className="text-white font-medium">{project.deadline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {project.team.slice(0, 2).map((member, index) => (
                    <Avatar key={index} className="h-8 w-8 border-2 border-gray-800">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="text-sm text-gray-400">
                    {project.team[0].name} {project.team.length > 1 ? `+ ${project.team.length - 1} more` : ""}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Link href={`/marketplace/${project.id}`}>View Project</Link>
                </Button>
                <Button variant="outline" className="w-10 p-0 text-gray-400 border-gray-700">
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search projects..." className="pl-9 bg-gray-900 border-gray-700 text-white" />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="mostFunded">Most Funded</SelectItem>
              <SelectItem value="closingSoon">Closing Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              All Projects
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="defi"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              DeFi
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              value="infrastructure"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hidden md:flex"
            >
              Infrastructure
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={project.banner || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    {project.trending && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-600">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden bg-gray-800">
                        <Image
                          src={project.logo || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{project.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-600 text-xs">{project.stage}</Badge>
                          <Badge variant="outline" className="bg-gray-800/50 text-xs text-gray-300 border-gray-700">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400 line-clamp-2">{project.tagline}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Raised</span>
                        <span className="text-white">
                          ${project.raised.toLocaleString()} / ${project.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(project.raised / project.target) * 100}
                        className="h-1.5 bg-gray-800"
                        indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {project.investors} investors
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {project.deadline}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      asChild
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Link href={`/marketplace/${project.id}`}>
                        View Details
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-10 p-0 text-gray-400 border-gray-700">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={() => setActiveTab("all")}>View All Projects</Button>
              </div>
            )}

            {filteredProjects.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" className="text-gray-300 border-gray-700">
                  Load More Projects
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

