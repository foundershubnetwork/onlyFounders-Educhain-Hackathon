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

export default function DecentraVaultProjectPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Project data
  const project = {
    id: "decentravault",
    name: "DecentraVault",
    tagline: "Decentralized storage solution with enhanced security and privacy",
    description:
      "DecentraVault is building a next-generation decentralized storage platform that combines blockchain security with advanced encryption to provide unparalleled data privacy and protection.",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=400&width=1200",
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
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Former security engineer at Cloudflare with 10+ years of experience in data protection and encryption technologies. Sarah has led multiple successful projects in the Web3 space and holds patents in distributed storage systems.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "Michael Chen",
        role: "CTO",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Blockchain developer with expertise in distributed systems and cryptography. Previously led engineering teams at Filecoin and contributed to IPFS. Michael holds a Ph.D. in Computer Science from MIT.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "Elena Rodriguez",
        role: "Head of Product",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Product leader with experience at Dropbox and Storj. Elena specializes in building user-friendly interfaces for complex technical products and has a strong background in UX research.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
      {
        name: "David Kim",
        role: "Lead Engineer",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer with expertise in distributed systems and peer-to-peer networks. David previously worked at Protocol Labs and has contributed to several open-source projects.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    ],
    advisors: [
      {
        name: "Dr. Jennifer Lee",
        role: "Security Advisor",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Cryptography expert and professor of Computer Science at Stanford University. Dr. Lee has published numerous papers on secure distributed storage systems.",
      },
      {
        name: "Robert Chang",
        role: "Business Advisor",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Venture partner at Blockchain Capital with extensive experience in scaling Web3 startups. Previously led business development at Coinbase.",
      },
    ],
    rating: 4.8,
    reviews: 45,
    website: "https://decentravault.io",
    whitepaper: "/whitepaper.pdf",
    github: "https://github.com/decentravault",
    twitter: "https://twitter.com/decentravault",
    tokenomics: {
      symbol: "DVT",
      totalSupply: "100,000,000",
      distribution: [
        { category: "Public Sale", percentage: 20 },
        { category: "Team & Advisors", percentage: 15 },
        { category: "Foundation", percentage: 25 },
        { category: "Ecosystem Growth", percentage: 30 },
        { category: "Strategic Partners", percentage: 10 },
      ],
      vesting:
        "Team tokens are subject to a 3-year vesting schedule with a 1-year cliff. Advisor tokens vest over 2 years with a 6-month cliff.",
    },
    roadmap: [
      {
        title: "Q1 2025",
        milestones: [
          { title: "Alpha testnet launch", completed: true },
          { title: "Security audit completion", completed: true },
          { title: "Initial partnership announcements", completed: true },
        ],
        percentage: 100,
        fundingRelease: 250000,
      },
      {
        title: "Q2 2025",
        milestones: [
          { title: "Beta mainnet launch", completed: false },
          { title: "Integration with 3 major blockchain networks", completed: false },
          { title: "Developer documentation and SDK release", completed: false },
        ],
        percentage: 0,
        fundingRelease: 350000,
      },
      {
        title: "Q3 2025",
        milestones: [
          { title: "Public mainnet launch", completed: false },
          { title: "Mobile app release", completed: false },
          { title: "Enterprise client onboarding", completed: false },
        ],
        percentage: 0,
        fundingRelease: 450000,
      },
      {
        title: "Q4 2025",
        milestones: [
          { title: "Governance token launch", completed: false },
          { title: "DAO establishment", completed: false },
          { title: "Expansion to additional blockchain ecosystems", completed: false },
        ],
        percentage: 0,
        fundingRelease: 450000,
      },
    ],
    traction: {
      users: "15,000+ waitlist signups",
      partners: "5 strategic partnerships with leading blockchain projects",
      growth: "250% month-over-month growth in developer interest",
      metrics: [
        { name: "Storage Capacity", value: "2.5 PB committed for launch" },
        { name: "Node Operators", value: "500+ pre-registered" },
        { name: "Developer Interest", value: "2,000+ GitHub stars" },
      ],
    },
    faq: [
      {
        question: "How does DecentraVault differ from existing decentralized storage solutions?",
        answer:
          "DecentraVault introduces a novel encryption layer that ensures data privacy even from node operators, combined with a unique incentive structure that rewards long-term storage commitments and reliability. Our platform also features enterprise-grade access controls while maintaining true decentralization.",
      },
      {
        question: "What blockchain networks will DecentraVault support at launch?",
        answer:
          "At launch, DecentraVault will support Ethereum, Polygon, and Solana, with plans to expand to additional networks based on community demand and strategic partnerships.",
      },
      {
        question: "How does the token economics work?",
        answer:
          "The DVT token serves multiple purposes in our ecosystem: payment for storage services, staking for node operators, governance for protocol decisions, and incentives for early adopters and developers building on our platform.",
      },
      {
        question: "What are the security measures in place to protect stored data?",
        answer:
          "DecentraVault employs multiple layers of security: client-side encryption, sharding across distributed nodes, regular automated security audits, and a bug bounty program. We've also developed a proprietary recovery mechanism that ensures data availability even if some nodes go offline.",
      },
      {
        question: "How will funds from this investment round be used?",
        answer:
          "Funds will be allocated approximately as follows: 40% for technical development and infrastructure, 25% for business development and partnerships, 20% for marketing and community growth, and 15% for legal and operational expenses.",
      },
    ],
    updates: [
      {
        date: "Mar 15, 2025",
        title: "Alpha Testnet Successfully Launched",
        content:
          "We're excited to announce the successful launch of our alpha testnet! Over 500 early testers are now actively using the platform, and we've received valuable feedback that will help us improve the product for our beta release.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        date: "Mar 5, 2025",
        title: "Strategic Partnership with BlockSecure",
        content:
          "We've partnered with BlockSecure, a leading blockchain security firm, to conduct a comprehensive audit of our protocol. This partnership ensures that our platform meets the highest security standards before our public launch.",
      },
      {
        date: "Feb 20, 2025",
        title: "DecentraVault Whitepaper Released",
        content:
          "Today we're proud to release our comprehensive whitepaper detailing DecentraVault's architecture, tokenomics, and roadmap. The document outlines our vision for a more secure and private decentralized storage ecosystem.",
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
                    DecentraVault addresses the critical challenges of data privacy, security, and ownership in the
                    digital age. By leveraging blockchain technology and advanced cryptography, we're creating a
                    platform where users have complete control over their data while benefiting from the reliability and
                    redundancy of decentralized storage.
                  </p>
                  <p className="text-gray-300">
                    Our solution is designed for both individual users seeking private and secure storage options and
                    enterprises requiring compliant, distributed data management systems. The platform's architecture
                    ensures that data remains accessible only to authorized users while being distributed across a
                    global network of nodes.
                  </p>

                  <div className="pt-4">
                    <h3 className="text-lg font-medium text-white mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">End-to-End Encryption</span> - Client-side encryption
                          ensures data privacy even from node operators
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Distributed Storage Network</span> - Data is sharded
                          and distributed across multiple nodes for redundancy and reliability
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Tokenized Incentives</span> - Node operators are
                          rewarded with DVT tokens for providing reliable storage
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Enterprise-Grade Access Controls</span> - Granular
                          permissions and audit logs for organizational use
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-300">
                          <span className="font-medium text-white">Multi-Chain Compatibility</span> - Support for
                          multiple blockchain networks for maximum flexibility
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
                        <div className="text-sm text-gray-400">Waitlist Signups</div>
                        <div className="text-xl font-bold text-white">15,000+</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Strategic Partners</div>
                        <div className="text-xl font-bold text-white">5</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4 text-center">
                        <Github className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-400">GitHub Stars</div>
                        <div className="text-xl font-bold text-white">2,000+</div>
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
                          <span className="font-medium text-white">DecentraVault Token</span>
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
                          <span className="font-medium text-white">$0.10 USD</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Token Utility</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Payment for storage services</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Staking for node operators</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Governance voting rights</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Incentives for early adopters</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span className="text-gray-300">Rewards for network contributors</span>
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
                  <div className="text-white font-medium">$500 USDC</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-400">Token Price</div>
                  <div className="text-white font-medium">$0.10 USD</div>
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

