"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Calendar, ArrowRight, TrendingUp, BookOpen } from "lucide-react"

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for blog posts
  const posts = [
    {
      id: "1",
      title: "The Future of Web3 Fundraising: AI-Powered Due Diligence",
      excerpt: "How artificial intelligence is transforming the way blockchain projects are evaluated and funded",
      image: "/placeholder.svg?height=300&width=600",
      category: "Insights",
      date: "Mar 15, 2025",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Founder & CEO",
      },
      readTime: "8 min read",
      featured: true,
      trending: true,
    },
    {
      id: "2",
      title: "Tokenomics 101: Designing Sustainable Token Economics",
      excerpt: "A comprehensive guide to creating effective tokenomics models for your blockchain project",
      image: "/placeholder.svg?height=300&width=600",
      category: "Guide",
      date: "Mar 10, 2025",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "CTO",
      },
      readTime: "12 min read",
      featured: false,
      trending: true,
    },
    {
      id: "3",
      title: "Smart Contract Security: Best Practices for Founders",
      excerpt: "Essential security considerations for developing robust smart contracts",
      image: "/placeholder.svg?height=300&width=600",
      category: "Security",
      date: "Mar 5, 2025",
      author: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Security Expert",
      },
      readTime: "10 min read",
      featured: true,
      trending: false,
    },
    {
      id: "4",
      title: "Building a Community Around Your Web3 Project",
      excerpt: "Strategies for growing and engaging your blockchain project community",
      image: "/placeholder.svg?height=300&width=600",
      category: "Community",
      date: "Feb 28, 2025",
      author: {
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Manager",
      },
      readTime: "7 min read",
      featured: false,
      trending: false,
    },
    {
      id: "5",
      title: "Navigating Regulatory Compliance in Crypto",
      excerpt: "Understanding the evolving legal landscape for blockchain projects",
      image: "/placeholder.svg?height=300&width=600",
      category: "Legal",
      date: "Feb 20, 2025",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Legal Advisor",
      },
      readTime: "9 min read",
      featured: false,
      trending: true,
    },
    {
      id: "6",
      title: "The Rise of DAOs: Governance in the Web3 Era",
      excerpt: "How decentralized autonomous organizations are reshaping organizational structures",
      image: "/placeholder.svg?height=300&width=600",
      category: "Insights",
      date: "Feb 15, 2025",
      author: {
        name: "Sophia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Research Analyst",
      },
      readTime: "11 min read",
      featured: false,
      trending: false,
    },
  ]

  // Filter posts based on active tab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all") return true
    if (activeTab === "trending") return post.trending
    if (activeTab === "featured") return post.featured
    return post.category.toLowerCase() === activeTab.toLowerCase()
  })

  // Get unique categories for filter
  const categories = [...new Set(posts.map((post) => post.category))]

  // Featured posts for the hero section
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2)

  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog</h1>
            <p className="text-gray-400">Insights, guides, and news from the Optimus AI team</p>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
            >
              <div className="relative h-60 w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-600">Featured</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`
                    ${
                      post.category === "Insights"
                        ? "bg-purple-900/30 text-purple-400 border-purple-800"
                        : post.category === "Guide"
                          ? "bg-blue-900/30 text-blue-400 border-blue-800"
                          : post.category === "Security"
                            ? "bg-red-900/30 text-red-400 border-red-800"
                            : post.category === "Community"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : post.category === "Legal"
                                ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="mr-1 h-3 w-3" />
                    {post.date}
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{post.title}</CardTitle>
                <CardDescription className="text-gray-400">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-white">{post.author.name}</div>
                    <div className="text-xs text-gray-400">{post.author.role}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{post.readTime}</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search articles..." className="pl-9 bg-gray-900 border-gray-700 text-white" />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              All Posts
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Featured
            </TabsTrigger>
            {categories.slice(0, 3).map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hidden md:flex"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                >
                  <div className="relative h-48 w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    {post.trending && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-600">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          post.category === "Insights"
                            ? "bg-purple-900/30 text-purple-400 border-purple-800"
                            : post.category === "Guide"
                              ? "bg-blue-900/30 text-blue-400 border-blue-800"
                              : post.category === "Security"
                                ? "bg-red-900/30 text-red-400 border-red-800"
                                : post.category === "Community"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : post.category === "Legal"
                                    ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                    : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white">{post.title}</CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs text-gray-400">{post.author.name}</div>
                    </div>
                    <Button asChild variant="link" className="p-0 h-auto text-blue-400 text-sm">
                      <Link href={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No posts found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={() => setActiveTab("all")}>View All Posts</Button>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" className="text-gray-300 border-gray-700">
                  Load More Posts
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

