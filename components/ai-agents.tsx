"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BarChart, FileText, Shield, Users, Zap, BookOpen, BarChart3, Cpu, Sparkles } from "lucide-react"

export function AIAgents() {
  const investmentAgents = [
    {
      id: "investment-1",
      title: "AI-Based Investment Matching Engine",
      description: "Matches investors with projects based on preferences, risk tolerance, and historical performance.",
      icon: BarChart,
      tags: ["VCs", "DAOs", "Launchpads"],
      image: "/placeholder.svg?height=200&width=400&text=AI+Investment+Matching",
    },
    {
      id: "investment-2",
      title: "AI-Generated Investor Reports & Alerts",
      description:
        "Automated reports and real-time alerts on portfolio performance, market trends, and investment opportunities.",
      icon: FileText,
      tags: ["DAOs", "Investment Firms"],
      image: "/placeholder.svg?height=200&width=400&text=AI+Reports",
    },
    {
      id: "investment-3",
      title: "Risk Assessment & Due Diligence",
      description: "AI-powered analysis of project risks, team background checks, and code audits.",
      icon: Shield,
      tags: ["VCs", "Angel Investors"],
      image: "/placeholder.svg?height=200&width=400&text=Risk+Assessment",
    },
  ]

  const founderAgents = [
    {
      id: "founder-1",
      title: "Founder Onboarding & AI Risk Assessment",
      description: "Streamlined onboarding process with AI-powered risk assessment for new projects.",
      icon: Users,
      tags: ["Launchpads", "VC Platforms"],
      image: "/placeholder.svg?height=200&width=400&text=Founder+Onboarding",
    },
    {
      id: "founder-2",
      title: "Pitch Deck Analyzer",
      description: "AI feedback on pitch decks with suggestions for improvement and investor alignment.",
      icon: Sparkles,
      tags: ["Founders", "Startups"],
      image: "/placeholder.svg?height=200&width=400&text=Pitch+Analyzer",
    },
    {
      id: "founder-3",
      title: "Market Fit Predictor",
      description:
        "Analyzes your project against market trends to predict product-market fit and suggest improvements.",
      icon: BarChart3,
      tags: ["Founders", "Product Teams"],
      image: "/placeholder.svg?height=200&width=400&text=Market+Fit",
    },
  ]

  const educationAgents = [
    {
      id: "education-1",
      title: "Web3 Investment Tutor",
      description: "Interactive learning modules on blockchain investment strategies, tokenomics, and risk management.",
      icon: BookOpen,
      tags: ["New Investors", "Education"],
      image: "/placeholder.svg?height=200&width=400&text=Investment+Tutor",
    },
    {
      id: "education-2",
      title: "Smart Contract Analyzer",
      description: "Learn to identify vulnerabilities and best practices in smart contract development.",
      icon: Brain,
      tags: ["Developers", "Auditors"],
      image: "/placeholder.svg?height=200&width=400&text=Contract+Analyzer",
    },
    {
      id: "education-3",
      title: "Tokenomics Simulator",
      description:
        "Simulate different tokenomic models and their impact on project sustainability and investor returns.",
      icon: Cpu,
      tags: ["Founders", "Investors"],
      image: "/placeholder.svg?height=200&width=400&text=Tokenomics+Simulator",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">AI Agents Marketplace</h2>
        <p className="text-[#A3A8AF] max-w-3xl">
          Leverage the power of AI to enhance your investment strategy, streamline founder workflows, and accelerate
          your learning in the Web3 space.
        </p>
      </div>

      <Tabs defaultValue="investment" className="space-y-6">
        <TabsList className="bg-[#1F2A3D] p-1 rounded-lg">
          <TabsTrigger value="investment" className="data-[state=active]:bg-black data-[state=active]:text-white">
            <BarChart className="mr-2 h-4 w-4" />
            Investment Agents
          </TabsTrigger>
          <TabsTrigger value="founder" className="data-[state=active]:bg-black data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Founder Agents
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-black data-[state=active]:text-white">
            <BookOpen className="mr-2 h-4 w-4" />
            Education Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="investment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentAgents.map((agent) => (
              <Card key={agent.id} className="bg-[#202C41] border-[#313E54] overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={agent.image || "/placeholder.svg"} alt={agent.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202C41] to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#635BFF]">
                      <Brain className="mr-1 h-3 w-3" />
                      AI Agent
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-[#29305F]">
                        <agent.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{agent.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-[#A3A8AF] mb-4">{agent.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-[#1F2A3D] border-[#313E54] text-[#A3A8AF]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B]">
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="founder" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founderAgents.map((agent) => (
              <Card key={agent.id} className="bg-[#202C41] border-[#313E54] overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={agent.image || "/placeholder.svg"} alt={agent.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202C41] to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#635BFF]">
                      <Brain className="mr-1 h-3 w-3" />
                      AI Agent
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-[#29305F]">
                        <agent.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{agent.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-[#A3A8AF] mb-4">{agent.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-[#1F2A3D] border-[#313E54] text-[#A3A8AF]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B]">
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationAgents.map((agent) => (
              <Card key={agent.id} className="bg-[#202C41] border-[#313E54] overflow-hidden flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src={agent.image || "/placeholder.svg"} alt={agent.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202C41] to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#635BFF]">
                      <Brain className="mr-1 h-3 w-3" />
                      AI Agent
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-[#29305F]">
                        <agent.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{agent.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-[#A3A8AF] mb-4">{agent.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-[#1F2A3D] border-[#313E54] text-[#A3A8AF]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B]">
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-[#1F2A3D] border border-[#313E54] rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 rounded-full bg-[#29305F]">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">Build Your Custom AI Agent</h3>
            <p className="text-[#A3A8AF] mt-1">
              Need a specialized AI agent for your specific use case? Our team can build custom AI solutions tailored to
              your needs.
            </p>
          </div>
          <Button className="bg-black hover:bg-[#1A2537] text-white border border-[#3D4E6B] w-full md:w-auto">
            Request Custom Agent
          </Button>
        </div>
      </div>
    </div>
  )
}

