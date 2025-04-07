"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InvestmentTier } from "@/components/investment-tier"
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Check,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Info,
  MessageSquare,
  Share2,
  Shield,
  Star,
  Twitter,
  Users,
  Linkedin,
} from "lucide-react"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showInvestDialog, setShowInvestDialog] = useState(false)

  // Mock project data
  const project = {
    id: params.id,
    title: "DecentraVault",
    tagline: "Decentralized vault for secure asset management with multi-chain support",
    description:
      "DecentraVault is a next-generation decentralized vault protocol that enables secure management of digital assets across multiple blockchains. Our innovative cross-chain technology allows users to store, transfer, and manage their crypto assets with enhanced security and flexibility.",
    image: "/placeholder.svg?height=400&width=800",
    logo: "/placeholder.svg?height=100&width=100",
    category: "DeFi",
    tags: ["Cross-chain", "Security", "Asset Management"],
    raised: 325000,
    goal: 500000,
    progress: 65,
    investors: 128,
    daysLeft: 14,
    minInvestment: 100,
    website: "https://decentravault.io",
    github: "https://github.com/decentravault",
    twitter: "https://twitter.com/decentravault",
    whitepaper: "https://decentravault.io/whitepaper.pdf",
    team: [
      {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        bio: "Former security engineer at Coinbase with 8+ years of experience in blockchain security",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Michael Chen",
        role: "CTO",
        bio: "Blockchain architect with experience at Ethereum Foundation and Chainlink",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "David Kim",
        role: "Lead Developer",
        bio: "Full-stack developer with expertise in Solidity and cross-chain protocols",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Emily Watson",
        role: "Head of Operations",
        bio: "Operations specialist with background in fintech and DeFi projects",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    roadmap: [
      {
        title: "Q1 2025",
        description: "Protocol design and whitepaper release",
        completed: true,
      },
      {
        title: "Q2 2025",
        description: "MVP development and security audits",
        completed: true,
      },
      {
        title: "Q3 2025",
        description: "Testnet launch and community building",
        completed: false,
        current: true,
      },
      {
        title: "Q4 2025",
        description: "Mainnet launch and initial partnerships",
        completed: false,
      },
      {
        title: "Q1 2026",
        description: "Cross-chain expansion and advanced features",
        completed: false,
      },
      {
        title: "Q2 2026",
        description: "Mobile app release and enterprise solutions",
        completed: false,
      },
    ],
    tokenomics: {
      symbol: "DVT",
      totalSupply: "100,000,000",
      distribution: [
        { category: "Public Sale", percentage: 20 },
        { category: "Team & Advisors", percentage: 15 },
        { category: "Treasury", percentage: 25 },
        { category: "Ecosystem Growth", percentage: 30 },
        { category: "Liquidity", percentage: 10 },
      ],
    },
    updates: [
      {
        title: "Security Audit Completed",
        date: "Oct 15, 2023",
        content:
          "We're pleased to announce that our smart contracts have successfully passed a comprehensive security audit by CertiK. The audit found no critical vulnerabilities, and all minor issues have been addressed.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Partnership with ChainBridge",
        date: "Oct 5, 2023",
        content:
          "DecentraVault has partnered with ChainBridge to enhance our cross-chain capabilities. This collaboration will enable seamless asset transfers between Ethereum, Binance Smart Chain, and Polygon networks.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Testnet Launch Successful",
        date: "Sep 20, 2023",
        content:
          "We're excited to announce the successful launch of our testnet. Over 500 users participated in the testing phase, providing valuable feedback that has helped us improve the protocol.",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    faqs: [
      {
        question: "How does DecentraVault ensure asset security?",
        answer:
          "DecentraVault employs a multi-layered security approach, including multi-signature wallets, time-locked transactions, and regular security audits. Our smart contracts have been audited by leading security firms to ensure the highest level of protection for user assets.",
      },
      {
        question: "Which blockchains are supported?",
        answer:
          "At launch, DecentraVault will support Ethereum, Binance Smart Chain, Polygon, and Avalanche. We plan to add support for additional blockchains in the future based on community demand and technical feasibility.",
      },
      {
        question: "How does the token (DVT) function within the ecosystem?",
        answer:
          "The DVT token serves multiple purposes within the DecentraVault ecosystem: governance rights for protocol decisions, fee discounts for transactions, staking rewards, and access to premium features. Token holders can also participate in the protocol's revenue sharing program.",
      },
      {
        question: "What are the fees for using DecentraVault?",
        answer:
          "DecentraVault charges a 0.1% fee on asset transfers and a 0.5% annual management fee. These fees are significantly lower than traditional financial services and are used to sustain the protocol's development and security measures.",
      },
    ],
    reviews: [
      {
        user: {
          name: "Alex Rodriguez",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "Angel Investor",
        },
        rating: 5,
        date: "Oct 10, 2023",
        content:
          "DecentraVault addresses a critical need in the DeFi space with its cross-chain asset management solution. The team is highly experienced and has a clear roadmap for execution. I'm particularly impressed with their security-first approach.",
      },
      {
        user: {
          name: "Sophia Martinez",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "Crypto Analyst",
        },
        rating: 4,
        date: "Oct 8, 2023",
        content:
          "Solid project with strong technical foundations. The cross-chain functionality sets it apart from competitors. My only concern is the ambitious timeline, but the team has demonstrated good progress so far.",
      },
      {
        user: {
          name: "James Wilson",
          avatar: "/placeholder.svg?height=50&width=50",
          role: "DeFi Investor",
        },
        rating: 5,
        date: "Oct 5, 2023",
        content:
          "I've been following DecentraVault since their whitepaper release, and I'm impressed with their execution. The recent security audit results are reassuring, and the partnership with ChainBridge adds significant value to the project.",
      },
    ],
    milestones: [
      {
        id: "m1",
        title: "Smart Contract Development",
        description: "Complete core smart contract development and internal testing",
        dueDate: "March 30, 2025",
        completionDate: "March 28, 2025",
        fundingAmount: 75000,
        percentCompleted: 100,
        status: "completed",
        fundingReleased: true,
        verificationProof: "https://github.com/decentravault/contracts",
      },
      {
        id: "m2",
        title: "Security Audit",
        description: "Complete comprehensive security audit by CertiK",
        dueDate: "April 15, 2025",
        completionDate: "April 10, 2025",
        fundingAmount: 50000,
        percentCompleted: 100,
        status: "completed",
        fundingReleased: true,
        verificationProof: "https://certik.com/projects/decentravault",
      },
      {
        id: "m3",
        title: "Testnet Launch",
        description: "Deploy protocol on testnet and complete initial user testing",
        dueDate: "May 20, 2025",
        completionDate: null,
        fundingAmount: 100000,
        percentCompleted: 65,
        status: "in_progress",
        fundingReleased: false,
        verificationProof: null,
      },
      {
        id: "m4",
        title: "Cross-Chain Integration",
        description: "Complete integration with Ethereum, BSC, and Polygon networks",
        dueDate: "June 30, 2025",
        completionDate: null,
        fundingAmount: 125000,
        percentCompleted: 30,
        status: "in_progress",
        fundingReleased: false,
        verificationProof: null,
      },
      {
        id: "m5",
        title: "Mainnet Launch",
        description: "Full production deployment on mainnet with all core features",
        dueDate: "August 15, 2025",
        completionDate: null,
        fundingAmount: 150000,
        percentCompleted: 0,
        status: "not_started",
        fundingReleased: false,
        verificationProof: null,
      },
    ],
  }

  const handleInvest = (amount: number) => {
    console.log(`Investing ${amount} USDC in ${project.title}`)
    setShowInvestDialog(false)
    // Here you would typically handle the investment process
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Link href="/marketplace">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-gray-400">Back to Marketplace</span>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[200px] md:h-[300px]">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
          <div className="h-20 w-20 rounded-xl overflow-hidden relative bg-gray-800 border-4 border-gray-800">
            <Image src={project.logo || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-blue-600">{project.category}</Badge>
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <p className="text-gray-300 mt-1">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
                value="milestones"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Milestones
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
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{project.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Key Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Multi-chain asset management across major blockchains</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Enhanced security with multi-signature and time-locked transactions</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Automated portfolio rebalancing and yield optimization</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Decentralized governance through the DVT token</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>Low fees compared to traditional financial services</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Project Links</h3>
                      <div className="space-y-3">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start text-gray-300 border-gray-700"
                        >
                          <a href={project.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="mr-2 h-4 w-4 text-blue-400" />
                            Website
                            <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start text-gray-300 border-gray-700"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4 text-purple-400" />
                            GitHub Repository
                            <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start text-gray-300 border-gray-700"
                        >
                          <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                            Twitter
                            <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                          </a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full justify-start text-gray-300 border-gray-700"
                        >
                          <a href={project.whitepaper} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-4 w-4 text-amber-400" />
                            Whitepaper
                            <ExternalLink className="ml-auto h-4 w-4 text-gray-500" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                        <p className="text-gray-300">{faq.answer}</p>
                        {index < project.faqs.length - 1 && <Separator className="bg-gray-800 my-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Team Members</CardTitle>
                  <CardDescription className="text-gray-400">Meet the team behind {project.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.team.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-800/50"
                      >
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-medium text-white">{member.name}</h3>
                          <div className="text-sm text-blue-400 mb-2">{member.role}</div>
                          <p className="text-gray-300 text-sm">{member.bio}</p>
                          <div className="flex mt-3 space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Github className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Roadmap</CardTitle>
                  <CardDescription className="text-gray-400">Development timeline and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.roadmap.map((milestone, index) => (
                      <div key={milestone.title} className="relative">
                        {index < project.roadmap.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-800 z-0"></div>
                        )}

                        <div
                          className={`relative z-10 flex items-start gap-4 p-4 rounded-lg border ${
                            milestone.current
                              ? "border-blue-600 bg-blue-900/10"
                              : milestone.completed
                                ? "border-green-600 bg-green-900/10"
                                : "border-gray-800 bg-gray-800/50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.current
                                ? "bg-blue-900/50 text-blue-400"
                                : milestone.completed
                                  ? "bg-green-900/50 text-green-400"
                                  : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {milestone.completed ? <Check className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">{milestone.title}</h3>
                            <p className="text-gray-300 mt-1">{milestone.description}</p>

                            {milestone.current && <Badge className="mt-3 bg-blue-600 text-white">Current Phase</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Milestones & Funding</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track the project's progress and funding releases based on milestone completion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative">
                        {index < project.milestones.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-800 z-0"></div>
                        )}

                        <div
                          className={`relative z-10 flex items-start gap-4 p-4 rounded-lg border ${
                            milestone.status === "completed"
                              ? "border-green-600 bg-green-900/10"
                              : milestone.status === "in_progress"
                                ? "border-blue-600 bg-blue-900/10"
                                : "border-gray-800 bg-gray-800/50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.status === "completed"
                                ? "bg-green-900/50 text-green-400"
                                : milestone.status === "in_progress"
                                  ? "bg-blue-900/50 text-blue-400"
                                  : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {milestone.status === "completed" ? (
                              <Check className="h-5 w-5" />
                            ) : milestone.status === "in_progress" ? (
                              <Progress value={milestone.percentCompleted} className="h-5 w-5 rounded-full" />
                            ) : (
                              <Calendar className="h-5 w-5" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white">{milestone.title}</h3>
                            <p className="text-gray-300 mt-1">{milestone.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-gray-400">Due: {milestone.dueDate}</div>
                              {milestone.completionDate && (
                                <div className="text-sm text-green-500">Completed: {milestone.completionDate}</div>
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-sm text-gray-400">Funding: {milestone.fundingAmount} USDC</div>
                              <div className="text-sm text-gray-400">
                                Released: {milestone.fundingReleased ? "Yes" : "No"}
                              </div>
                            </div>
                            {milestone.verificationProof && (
                              <a
                                href={milestone.verificationProof}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline text-sm"
                              >
                                Verification Proof
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Tokenomics</CardTitle>
                  <CardDescription className="text-gray-400">Token distribution and utility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Token Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Token Name:</span>
                            <span className="text-white font-medium">DecentraVault Token</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Symbol:</span>
                            <span className="text-white font-medium">{project.tokenomics.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Supply:</span>
                            <span className="text-white font-medium">{project.tokenomics.totalSupply}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Token Type:</span>
                            <span className="text-white font-medium">ERC-20</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Token Utility</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-300">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Governance rights for protocol decisions</span>
                          </li>
                          <li className="flex items-start text-gray-300">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Fee discounts for transactions</span>
                          </li>
                          <li className="flex items-start text-gray-300">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Staking rewards and yield farming</span>
                          </li>
                          <li className="flex items-start text-gray-300">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Access to premium features</span>
                          </li>
                          <li className="flex items-start text-gray-300">
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>Revenue sharing for token holders</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Token Distribution</h3>
                      <div className="space-y-4">
                        {project.tokenomics.distribution.map((item) => (
                          <div key={item.category} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-300">{item.category}</span>
                              <span className="text-white font-medium">{item.percentage}%</span>
                            </div>
                            <Progress
                              value={item.percentage}
                              className="h-2 bg-gray-800"
                              indicatorClassName={`
                                ${
                                  item.category === "Public Sale"
                                    ? "bg-blue-600"
                                    : item.category === "Team & Advisors"
                                      ? "bg-purple-600"
                                      : item.category === "Treasury"
                                        ? "bg-amber-600"
                                        : item.category === "Treasury"
                                          ? "bg-amber-600"
                                          : item.category === "Ecosystem Growth"
                                            ? "bg-green-600"
                                            : "bg-cyan-600"
                                }
                              `}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-800">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-white font-medium">Vesting Schedule</h4>
                            <p className="text-gray-300 text-sm mt-1">
                              Team tokens are subject to a 2-year vesting period with a 6-month cliff. Advisor tokens
                              vest over 18 months. Ecosystem and treasury tokens are released according to protocol
                              needs and governance decisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-64 w-full rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=800"
                      alt="Token distribution chart"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Project Updates</CardTitle>
                  <CardDescription className="text-gray-400">Latest news and announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.updates.map((update, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-white">{update.title}</h3>
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                            <Calendar className="mr-1 h-3 w-3" />
                            {update.date}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <p className="text-gray-300">{update.content}</p>
                          </div>
                          <div className="relative h-40 rounded-lg overflow-hidden">
                            <Image
                              src={update.image || "/placeholder.svg"}
                              alt={update.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>

                        {index < project.updates.length - 1 && <Separator className="bg-gray-800" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Investor Reviews</CardTitle>
                  <CardDescription className="text-gray-400">Feedback from the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.reviews.map((review, index) => (
                      <div key={index} className="p-4 rounded-lg border border-gray-800 bg-gray-800/50">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.user.avatar} />
                              <AvatarFallback>
                                {review.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{review.user.name}</div>
                              <div className="text-xs text-gray-400">{review.user.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                                />
                              ))}
                            </div>
                            <div className="text-xs text-gray-400">{review.date}</div>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800 sticky top-20">
            <CardHeader>
              <CardTitle className="text-xl text-white">Funding Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Raised</span>
                    <span className="text-white font-medium">
                      {project.raised.toLocaleString()} / {project.goal.toLocaleString()} USDC
                    </span>
                  </div>
                  <Progress
                    value={project.progress}
                    className="h-2 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{project.progress}% funded</span>
                    <span className="text-amber-400">{project.daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{project.investors}</div>
                    <div className="text-xs text-gray-400">Investors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{project.minInvestment}</div>
                    <div className="text-xs text-gray-400">Min. Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{project.daysLeft}</div>
                    <div className="text-xs text-gray-400">Days Left</div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="flex flex-col gap-3">
                <Dialog open={showInvestDialog} onOpenChange={setShowInvestDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800">
                      Invest Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Invest in {project.title}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Choose your investment amount and complete the transaction
                      </DialogDescription>
                    </DialogHeader>

                    <InvestmentTier onInvest={handleInvest} />

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowInvestDialog(false)}
                        className="border-gray-700 text-white"
                      >
                        Cancel
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="w-full border-gray-800 text-white"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? (
                    <>
                      <Bookmark className="mr-2 h-4 w-4 fill-blue-400 text-blue-400" />
                      Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Bookmark
                    </>
                  )}
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 border-gray-800 text-white">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-800 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Project Verification</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">KYC Verified</span>
                    </div>
                    <Badge className="bg-green-600">Passed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">Smart Contract Audit</span>
                    </div>
                    <Badge className="bg-green-600">Passed</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-300">Team Verification</span>
                    </div>
                    <Badge className="bg-green-600">Verified</Badge>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-400 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">AI Risk Assessment</h4>
                      <p className="text-gray-300 text-sm mt-1">
                        Optimus AI has analyzed this project and assigned it a low risk score based on team credentials,
                        code quality, and tokenomics model.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

