"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Check,
  DollarSign,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Lock,
  Share2,
  Star,
  Twitter,
  Users,
} from "lucide-react"

export default function MetaCanvasProjectPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Project data
  const project = {
    id: "metacanvas",
    name: "MetaCanvas",
    tagline: "Web3 creative platform for digital artists and collectors",
    description:
      "MetaCanvas is revolutionizing digital art creation and ownership with a comprehensive platform that enables artists to create, showcase, and monetize their work through NFTs and collaborative projects.",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=400&width=1200",
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
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Former creative director at Adobe with 15+ years of experience in digital art platforms. Alex has founded two successful creative tech startups and is passionate about empowering digital artists.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "Emily Watson",
        role: "Creative Director",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Award-winning digital artist and UX designer with experience at Pixar and Autodesk. Emily has been creating digital art for over a decade and understands the challenges artists face.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "Jason Kim",
        role: "CTO",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Blockchain developer with expertise in NFT standards and marketplaces. Previously led engineering at OpenSea and contributed to several NFT protocols.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "Maria Garcia",
        role: "Head of Community",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Community builder with experience at Behance and DeviantArt. Maria specializes in nurturing creative communities and has built several successful artist collectives.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    ],
    advisors: [
      {
        name: "Thomas Chen",
        role: "Art Advisor",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Curator at MoMA and digital art collector. Thomas brings expertise in art curation, valuation, and market trends.",
      },
      {
        name: "Sarah Johnson",
        role: "NFT Strategy Advisor",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Founder of NFT Ventures and early investor in multiple successful NFT platforms. Sarah advises on tokenomics and market strategy.",
      },
    ],
    rating: 4.5,
    reviews: 78,
    website: "https://metacanvas.io",
    whitepaper: "/whitepaper.pdf",
    github: "https://github.com/metacanvas",
    twitter: "https://twitter.com/metacanvas",
    tokenomics: {
      symbol: "CANVAS",
      totalSupply: "200,000,000",
      distribution: [
        { category: "Public Sale", percentage: 25 },
        { category: "Team & Advisors", percentage: 20 },
        { category: "Community Rewards", percentage: 30 },
        { category: "Platform Development", percentage: 15 },
        { category: "Strategic Partners", percentage: 10 },
      ],
      vesting:
        "Team tokens are subject to a 3-year vesting schedule with a 1-year cliff. Advisor tokens vest over 2 years with a 6-month cliff.",
    },
    roadmap: [
      {
        title: "Q1 2025",
        milestones: [
          { title: "Beta platform launch", completed: true },
          { title: "Integration with 5 major wallets", completed: true },
          { title: "Artist onboarding program", completed: true },
        ],
        percentage: 100,
        fundingRelease: 500000,
      },
      {
        title: "Q2 2025",
        milestones: [
          { title: "Public platform launch", completed: false },
          { title: "Mobile app beta", completed: false },
          { title: "Collaborative creation tools", completed: false },
        ],
        percentage: 30,
        fundingRelease: 750000,
      },
      {
        title: "Q3 2025",
        milestones: [
          { title: "AI-assisted creation tools", completed: false },
          { title: "Cross-chain support", completed: false },
          { title: "Virtual galleries", completed: false },
        ],
        percentage: 0,
        fundingRelease: 1000000,
      },
      {
        title: "Q4 2025",
        milestones: [
          { title: "Metaverse integration", completed: false },
          { title: "DAO governance launch", completed: false },
          { title: "Enterprise partnerships", completed: false },
        ],
        percentage: 0,
        fundingRelease: 750000,
      },
    ],
    traction: {
      users: "50,000+ registered artists and collectors",
      partners: "10 strategic partnerships with major art institutions",
      growth: "300% quarter-over-quarter growth in platform usage",
      metrics: [
        { name: "Monthly Active Users", value: "25,000+" },
        { name: "NFTs Created", value: "75,000+" },
        { name: "Average Sale Price", value: "$2,500" },
      ],
    },
    faq: [
      {
        question: "How does MetaCanvas differ from other NFT platforms?",
        answer:
          "MetaCanvas focuses on the entire creative process, not just the final sale. We provide artists with tools to create, collaborate, and build community around their work. Our platform includes built-in creation tools, collaborative features, and a unique royalty structure that ensures artists benefit from secondary sales in perpetuity.",
      },
      {
        question: "What blockchain networks does MetaCanvas support?",
        answer:
          "Currently, MetaCanvas supports Ethereum, Polygon, and Solana. We're planning to add support for additional networks based on community demand and technical considerations.",
      },
      {
        question: "How does the CANVAS token work within the ecosystem?",
        answer:
          "The CANVAS token serves multiple functions: governance rights for platform decisions, staking for premium features, rewards for active community members, and transaction fee discounts. Token holders also gain early access to exclusive drops and special events.",
      },
      {
        question: "What are the fees for artists and collectors?",
        answer:
          "Artists pay a 5% fee on primary sales, which is below industry standard. Collectors pay a 2.5% fee on purchases. Both fees are reduced when using CANVAS tokens. We also offer a unique royalty structure where artists receive 10% of all secondary sales in perpetuity.",
      },
      {
        question: "How will funds from this investment round be used?",
        answer:
          "Funds will be allocated approximately as follows: 35% for platform development and new features, 25% for marketing and artist acquisition, 20% for infrastructure and scaling, and 20% for business development and partnerships.",
      },
    ],
    updates: [
      {
        date: "Mar 10, 2025",
        title: "Beta Platform Exceeds Growth Targets",
        content:
          "We're thrilled to announce that our beta platform has exceeded all growth targets, with over 50,000 registered users and 75,000+ NFTs created. The community feedback has been overwhelmingly positive, and we're incorporating suggestions into our public launch.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        date: "Feb 25, 2025",
        title: "Partnership with MoMA Digital",
        content:
          "We've partnered with MoMA Digital to create a special collection showcasing emerging digital artists. This collaboration will bring institutional recognition to digital creators and help bridge the gap between traditional and digital art worlds.",
      },
      {
        date: "Feb 10, 2025",
        title: "Collaborative Creation Tools Preview",
        content:
          "Today we're previewing our collaborative creation tools that allow multiple artists to work on a single piece simultaneously. This feature has been highly requested by our community and represents a new paradigm in digital art creation.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-gray-400 hover:text-white">
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
      </div>

      <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden">
        <Image src={project.banner || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-4">
          <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border-4 border-background">
            <Image src={project.logo || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{project.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-purple-600">{project.stage}</Badge>
              <Badge variant="outline" className="bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
                {project.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="sm" className="bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-900/50 backdrop-blur-sm text-white border-gray-700">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Team
              </TabsTrigger>
              <TabsTrigger
                value="roadmap"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Roadmap
              </TabsTrigger>
              <TabsTrigger
                value="tokenomics"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Tokenomics
              </TabsTrigger>
              <TabsTrigger
                value="updates"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Updates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">About the Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{project.description}</p>
                  <p className="text-gray-300">
                    MetaCanvas is building a comprehensive ecosystem for digital artists that addresses the key
                    challenges they face: creation tools, fair compensation, community building, and long-term value
                    preservation. Our platform combines intuitive creation tools with blockchain technology to ensure
                    artists maintain ownership and receive fair compensation for their work.
                  </p>
                  <p className="text-gray-300">
                    Unlike traditional NFT marketplaces that focus solely on transactions, MetaCanvas provides
                    end-to-end support for the creative process. Artists can create directly on our platform,
                    collaborate with others, build a community around their work, and seamlessly mint and sell their
                    creations—all in one place.
                  </p>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-white mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Integrated Creation Tools</span> - Professional-grade
                          digital art tools built directly into the platform
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Collaborative Canvas</span> - Real-time collaboration
                          features for multiple artists to work together
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Fair Royalty System</span> - Artists receive 10% of
                          all secondary sales in perpetuity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Community Building Tools</span> - Features for
                          artists to engage with collectors and fans
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Multi-Chain Support</span> - Compatible with multiple
                          blockchain networks for maximum accessibility
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Traction & Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Registered Users</div>
                        <div className="text-xl font-bold text-white">50,000+</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">NFTs Created</div>
                        <div className="text-xl font-bold text-white">75,000+</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Avg. Sale Price</div>
                        <div className="text-xl font-bold text-white">$2,500</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-lg font-medium text-white mb-3">Additional Metrics</h3>
                    <ul className="space-y-3">
                      {project.traction.metrics.map((metric, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span className="text-gray-400">{metric.name}</span>
                          <span className="font-medium text-white">{metric.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-white mb-3">Growth</h3>
                    <p className="text-gray-300">{project.traction.growth}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.faq.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-medium text-white">{item.question}</h3>
                      <p className="text-gray-300">{item.answer}</p>
                      {index < project.faq.length - 1 && <Separator className="my-4 bg-gray-800" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Core Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.team.map((member, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-medium text-white">{member.name}</h3>
                            <p className="text-blue-400 mb-3">{member.role}</p>
                            <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                            <div className="flex gap-2">
                              {member.linkedin && (
                                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700" asChild>
                                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                  </Link>
                                </Button>
                              )}
                              {member.twitter && (
                                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700" asChild>
                                  <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                                    Twitter
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Advisors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.advisors.map((advisor, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage src={advisor.avatar} />
                              <AvatarFallback>
                                {advisor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-medium text-white">{advisor.name}</h3>
                            <p className="text-purple-400 mb-3">{advisor.role}</p>
                            <p className="text-gray-300 text-sm">{advisor.bio}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Development Roadmap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {project.roadmap.map((phase, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              phase.percentage === 100
                                ? "bg-green-600"
                                : phase.percentage > 0
                                  ? "bg-blue-600"
                                  : "bg-gray-700"
                            }`}
                          >
                            {phase.percentage === 100 ? (
                              <Check className="h-5 w-5 text-white" />
                            ) : (
                              <span className="text-white font-medium">{index + 1}</span>
                            )}
                          </div>
                          {index < project.roadmap.length - 1 && <div className="h-full w-0.5 bg-gray-700 my-2"></div>}
                        </div>
                        <div className="flex-1">
                          <Card className="bg-gray-800 border-gray-700">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg text-white">{phase.title}</CardTitle>
                                <Badge
                                  className={
                                    phase.percentage === 100
                                      ? "bg-green-600"
                                      : phase.percentage > 0
                                        ? "bg-blue-600"
                                        : "bg-gray-700"
                                  }
                                >
                                  {phase.percentage === 100
                                    ? "Completed"
                                    : phase.percentage > 0
                                      ? `${phase.percentage}% Complete`
                                      : "Upcoming"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <ul className="space-y-2">
                                {phase.milestones.map((milestone, mIndex) => (
                                  <li key={mIndex} className="flex items-start">
                                    {milestone.completed ? (
                                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    ) : (
                                      <div className="h-5 w-5 rounded-full border border-gray-600 mr-2 mt-0.5"></div>
                                    )}
                                    <span className={`${milestone.completed ? "text-white" : "text-gray-400"}`}>
                                      {milestone.title}
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              <div className="pt-2 border-t border-gray-700">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-400">Funding Release</span>
                                  <span className="font-medium text-white">
                                    ${phase.fundingRelease.toLocaleString()} USDC
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Token Economics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Token Details</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center">
                          <span className="text-gray-400">Token Name</span>
                          <span className="font-medium text-white">MetaCanvas Token</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-400">Symbol</span>
                          <span className="font-medium text-white">{project.tokenomics.symbol}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-400">Total Supply</span>
                          <span className="font-medium text-white">{project.tokenomics.totalSupply}</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-400">Token Type</span>
                          <span className="font-medium text-white">ERC-20</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span className="text-gray-400">Initial Price</span>
                          <span className="font-medium text-white">$0.15 USD</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Token Utility</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Governance rights for platform decisions</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Staking for premium features and rewards</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Fee discounts when used for transactions</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Access to exclusive drops and events</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Community rewards for active participation</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-white mb-3">Token Distribution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        {project.tokenomics.distribution.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">{item.category}</span>
                              <span className="font-medium text-white">{item.percentage}%</span>
                            </div>
                            <Progress
                              value={item.percentage}
                              className="h-2 bg-gray-800"
                              indicatorClassName={`${
                                index === 0
                                  ? "bg-blue-600"
                                  : index === 1
                                    ? "bg-purple-600"
                                    : index === 2
                                      ? "bg-green-600"
                                      : index === 3
                                        ? "bg-amber-600"
                                        : "bg-red-600"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Vesting Schedule</h4>
                        <p className="text-gray-300 text-sm">{project.tokenomics.vesting}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.updates.map((update, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="bg-blue-900/30 text-blue-400 border-blue-800">
                            <Calendar className="mr-1 h-3 w-3" />
                            {update.date}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">{update.title}</h3>
                        <p className="text-gray-300 mb-4">{update.content}</p>
                        {update.image && (
                          <div className="relative h-48 w-full rounded-lg overflow-hidden">
                            <Image
                              src={update.image || "/placeholder.svg"}
                              alt={update.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800 sticky top-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white">Investment Details</CardTitle>
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
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{((project.raised / project.target) * 100).toFixed(1)}% Complete</span>
                  <span>{project.investors} Investors</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Minimum Investment</div>
                  <div className="text-white font-medium">$1,000 USDC</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Token Price</div>
                  <div className="text-white font-medium">$0.15 USD</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Funding Stage</div>
                  <div className="text-white font-medium">{project.stage}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Closing Date</div>
                  <div className="text-white font-medium">{project.deadline}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-gray-900">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  <span className="text-white font-medium">{project.investors}</span> investors have joined
                </span>
              </div>

              <div className="flex items-center gap-2 py-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-medium">{project.rating}</span>
                <span className="text-sm text-gray-400">({project.reviews} reviews)</span>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <DollarSign className="mr-2 h-4 w-4" />
                Invest Now
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-gray-300 border-gray-700" asChild>
                  <Link href={project.whitepaper} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Whitepaper
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 text-gray-300 border-gray-700" asChild>
                  <Link href={project.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Link>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-gray-300 border-gray-700" asChild>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-gray-300 border-gray-700" asChild>
                  <Link href={project.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Link>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <div className="w-full text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-400 mb-2">
                  <Lock className="h-3 w-3" />
                  <span>Verified by Optimus AI</span>
                </div>
                <Button variant="link" className="text-blue-400 p-0 h-auto text-sm">
                  View Due Diligence Report
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

