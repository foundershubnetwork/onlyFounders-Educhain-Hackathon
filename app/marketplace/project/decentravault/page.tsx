import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, CheckCircle, Clock, DollarSign, FileText, Github, Globe, Users } from "lucide-react"

export default function DecentraVaultPage() {
  const project = {
    id: "decentravault",
    title: "DecentraVault",
    category: "DeFi",
    description:
      "Secure multi-chain asset management platform with AI-driven risk assessment and automated portfolio rebalancing. Leading the future of decentralized finance with institutional-grade security.",
    longDescription:
      "DecentraVault is revolutionizing how users manage their digital assets across multiple blockchains. Our platform provides institutional-grade security while leveraging AI to optimize portfolio performance and minimize risk. With automated rebalancing, cross-chain transfers, and real-time risk assessment, DecentraVault makes sophisticated asset management accessible to everyone in the Web3 ecosystem.",
    image: "/placeholder.svg?height=400&width=800&text=DecentraVault",
    logo: "/placeholder.svg?height=100&width=100&text=DV",
    raised: 425000,
    goal: 500000,
    progress: 85,
    daysLeft: 7,
    categoryColor: "bg-blue-600",
    founders: [
      {
        name: "Elena Rodriguez",
        role: "CEO & Co-Founder",
        image: "/placeholder.svg?height=100&width=100&text=ER",
        bio: "Former VP at Goldman Sachs with 10+ years in fintech and blockchain",
      },
      {
        name: "Michael Chen",
        role: "CTO & Co-Founder",
        image: "/placeholder.svg?height=100&width=100&text=MC",
        bio: "Ex-Google engineer specializing in AI and distributed systems",
      },
    ],
    investors: 47,
    location: "Singapore",
    founded: "January 2025",
    tags: ["Multi-chain", "Asset Management", "AI-Powered", "DeFi", "Security"],
    milestones: [
      {
        title: "Smart Contract Audit",
        completed: true,
        date: "March 2025",
        description: "Complete security audit by CertiK with zero critical vulnerabilities",
      },
      {
        title: "Beta Launch",
        completed: true,
        date: "April 2025",
        description: "Launch beta version with 1,000 early users and $10M in managed assets",
      },
      {
        title: "Mainnet Release",
        completed: false,
        date: "June 2025",
        description: "Full platform launch with cross-chain support for 5+ blockchains",
      },
      {
        title: "Institutional Partnerships",
        completed: false,
        date: "August 2025",
        description: "Onboard 3+ institutional partners with combined $50M in assets",
      },
    ],
    features: [
      "Cross-chain asset transfers with minimal gas fees",
      "AI-driven portfolio optimization",
      "Automated risk assessment and rebalancing",
      "Institutional-grade security protocols",
      "Real-time market analytics dashboard",
      "Customizable DCA investment strategies",
    ],
    links: {
      website: "https://decentravault.io",
      whitepaper: "https://decentravault.io/whitepaper",
      github: "https://github.com/decentravault",
    },
    tokenomics: {
      symbol: "DVT",
      totalSupply: "100,000,000",
      distribution: [
        { category: "Public Sale", percentage: 30 },
        { category: "Team & Advisors", percentage: 20 },
        { category: "Treasury", percentage: 25 },
        { category: "Ecosystem Growth", percentage: 15 },
        { category: "Liquidity", percentage: 10 },
      ],
    },
  }

  return (
    <div className="container py-10">
      <PageHeader
        title={project.title}
        description="Secure multi-chain asset management platform"
        accentColor="bg-blue-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-xl overflow-hidden border border-gray-800 mb-8">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={400}
              className="w-full"
            />
            <div className="absolute top-4 right-4">
              <Badge className={project.categoryColor}>{project.category}</Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">{project.longDescription}</p>

                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex items-center gap-2">
                      <Link href={project.links.website} target="_blank">
                        <Globe className="h-4 w-4" /> Visit Website
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <Link href={project.links.whitepaper} target="_blank">
                        <FileText className="h-4 w-4" /> Whitepaper
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex items-center gap-2">
                      <Link href={project.links.github} target="_blank">
                        <Github className="h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="relative pl-8 pb-8 border-l border-gray-800 last:border-0 last:pb-0">
                        <div
                          className={`absolute left-0 top-0 w-4 h-4 -translate-x-2 rounded-full ${milestone.completed ? "bg-green-500" : "bg-gray-700"}`}
                        ></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-400">{milestone.date}</span>
                            <Badge
                              className={
                                milestone.completed
                                  ? "bg-green-600/20 text-green-400 border-green-800/30"
                                  : "bg-gray-800 text-gray-400"
                              }
                            >
                              {milestone.completed ? "Completed" : "Upcoming"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.founders.map((founder, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-16 w-16 rounded-full overflow-hidden relative">
                            <Image
                              src={founder.image || "/placeholder.svg"}
                              alt={founder.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{founder.name}</h3>
                          <p className="text-blue-400 text-sm mb-1">{founder.role}</p>
                          <p className="text-gray-400 text-sm">{founder.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tokenomics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Token Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Symbol:</span>
                            <span className="text-white font-medium">{project.tokenomics.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Supply:</span>
                            <span className="text-white font-medium">{project.tokenomics.totalSupply}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-3">Token Distribution</h3>
                      <div className="space-y-3">
                        {project.tokenomics.distribution.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-400">{item.category}</span>
                              <span className="text-white font-medium">{item.percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="relative h-64 w-64">
                        <Image
                          src="/placeholder.svg?height=300&width=300&text=Token+Distribution+Chart"
                          alt="Token Distribution Chart"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 mb-6">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Raised:</span>
                  <span className="text-cyan-400 font-medium">{project.raised.toLocaleString()} USDC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Goal:</span>
                  <span className="text-white font-medium">{project.goal.toLocaleString()} USDC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress:</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 bg-gray-800" />
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{project.investors} investors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white">
                Invest Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-800 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Founded</div>
                  <div className="text-white">{project.founded}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white">{project.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-400">Token Symbol</div>
                  <div className="text-white">{project.tokenomics.symbol}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Similar Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=40&width=40&text=CF"
                      alt="CryptoFund"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white group-hover:text-blue-400 transition-colors">CryptoFund</div>
                    <div className="text-xs text-gray-400">DeFi Asset Management</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=40&width=40&text=DS"
                      alt="DeFi Shield"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white group-hover:text-blue-400 transition-colors">DeFi Shield</div>
                    <div className="text-xs text-gray-400">Security & Asset Protection</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=40&width=40&text=MP"
                      alt="MultiPort"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white group-hover:text-blue-400 transition-colors">MultiPort</div>
                    <div className="text-xs text-gray-400">Cross-Chain Portfolio Manager</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

