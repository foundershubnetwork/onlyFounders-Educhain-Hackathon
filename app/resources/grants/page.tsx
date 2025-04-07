"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, Clock, DollarSign, Filter, Search, Users } from "lucide-react"

export default function GrantsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const grants = [
    {
      id: "1",
      name: "Web3 Innovation Grant",
      organization: "EDU Chain Foundation",
      description: "Supporting innovative Web3 projects focused on education and learning",
      amount: "$50,000",
      deadline: "Apr 15, 2025",
      applicants: 156,
      category: "Education",
      image: "/placeholder.svg?height=200&width=200",
      provider: "educhain",
    },
    {
      id: "2",
      name: "EduFi Development Fund",
      organization: "EduFi DAO",
      description: "Funding for projects integrating education with decentralized finance",
      amount: "$75,000",
      deadline: "Mar 30, 2025",
      applicants: 234,
      category: "EduFi",
      image: "/placeholder.svg?height=200&width=200",
      provider: "edufi",
    },
    {
      id: "3",
      name: "DeFi Integration Grant",
      organization: "DeFi Alliance",
      description: "Supporting projects that expand the DeFi ecosystem with innovative solutions",
      amount: "$100,000",
      deadline: "May 1, 2025",
      applicants: 89,
      category: "DeFi",
      image: "/placeholder.svg?height=200&width=200",
      provider: "defi",
    },
    {
      id: "4",
      name: "Polygon Ecosystem Fund",
      organization: "Polygon Foundation",
      description: "Grants for teams building on Polygon to enhance scalability and user experience",
      amount: "$150,000",
      deadline: "Apr 20, 2025",
      applicants: 167,
      category: "Infrastructure",
      image: "/placeholder.svg?height=200&width=200",
      provider: "polygon",
    },
    {
      id: "5",
      name: "Internet Computer Grant",
      organization: "DFINITY Foundation",
      description: "Supporting developers building decentralized applications on the Internet Computer",
      amount: "$80,000",
      deadline: "Apr 10, 2025",
      applicants: 198,
      category: "Web3",
      image: "/placeholder.svg?height=200&width=200",
      provider: "icp",
    },
    {
      id: "6",
      name: "Coinweb Interoperability Grant",
      organization: "Coinweb Foundation",
      description: "Funding for projects focused on cross-chain interoperability and infrastructure",
      amount: "$120,000",
      deadline: "May 15, 2025",
      applicants: 145,
      category: "Interoperability",
      image: "/placeholder.svg?height=200&width=200",
      provider: "coinweb",
    },
    {
      id: "7",
      name: "AI + Blockchain Innovation Fund",
      organization: "Optimus AI Foundation",
      description: "Supporting projects that combine AI and blockchain technologies for innovative solutions",
      amount: "$200,000",
      deadline: "Jun 1, 2025",
      applicants: 112,
      category: "AI",
      image: "/placeholder.svg?height=200&width=200",
      provider: "optimusai",
    },
    {
      id: "8",
      name: "Sustainable Blockchain Initiative",
      organization: "Green Blockchain Alliance",
      description: "Grants for eco-friendly blockchain solutions and carbon-neutral projects",
      amount: "$90,000",
      deadline: "May 25, 2025",
      applicants: 76,
      category: "Sustainability",
      image: "/placeholder.svg?height=200&width=200",
      provider: "educhain",
    },
  ]

  const filteredGrants = activeTab === "all" ? grants : grants.filter((grant) => grant.provider === activeTab)

  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Grants</h1>
          <p className="text-gray-400">Explore available grants and funding opportunities for your project</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                All Grants
              </TabsTrigger>
              <TabsTrigger
                value="educhain"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                EDU Chain
              </TabsTrigger>
              <TabsTrigger
                value="edufi"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                EduFi
              </TabsTrigger>
              <TabsTrigger
                value="defi"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                DeFi
              </TabsTrigger>
              <TabsTrigger
                value="polygon"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Polygon
              </TabsTrigger>
              <TabsTrigger
                value="icp"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                ICP
              </TabsTrigger>
              <TabsTrigger
                value="coinweb"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Coinweb
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search grants..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white w-[250px]"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrants.map((grant) => (
                <Card
                  key={grant.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                >
                  <CardHeader className="bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                        <Image
                          src={grant.image || "/placeholder.svg"}
                          alt={grant.organization}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{grant.name}</CardTitle>
                        <CardDescription className="text-gray-400">{grant.organization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-300 mb-4">{grant.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-400" />
                        <span className="font-medium text-blue-400">{grant.amount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-400">{grant.applicants} applicants</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {grant.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>Deadline: {grant.deadline}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Link href={`/resources/grants/${grant.id}`}>
                        Apply Now <ArrowUpRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGrants.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl font-medium text-white mb-2">No grants found</p>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={() => setActiveTab("all")}>View All Grants</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Need Help With Your Grant Application?</h2>
                <p className="text-gray-300 mb-6">
                  Our team of experts can help you prepare a compelling grant application to increase your chances of
                  success. We offer guidance on project proposals, budget planning, and technical documentation.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Application Support
                </Button>
              </div>
              <div className="relative h-48 w-full md:w-1/3 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300&text=Grant+Application+Support"
                  alt="Grant Application Support"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

