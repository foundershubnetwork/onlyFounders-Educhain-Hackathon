"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Shield, Star, Users, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [projects, setProjects] = useState<Array<{
    startupName: string;
    startupStage: String;
    imageURL?: string;
    logoURL?: string;
    founderName: string;
    category: string;
    blockchainPlatform?: string[];
    tagline: string;
    totalRaised: number;
    goal?: number;
    deadline?: string;
  }>>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://onlyfounders.azurewebsites.net/api/startup/get-featured-projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        
        if (Array.isArray(data.startups)) {
          setProjects(data.startups);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <AppLayout showHero={true}>
       <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col items-start text-left space-y-6">
            <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-1.5 text-sm font-medium text-blue-400 border-blue-500/20">
              The Future of Web3 Fundraising
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              AI-Powered Investment Platform for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Web3 Startups
              </span>
            </h1>

            <p className="text-lg text-purple-200/70 max-w-xl">
              OnlyFounders combines AI-driven investment intelligence with decentralized crowdfunding to democratize
              early-stage startup funding.
            </p>

            <div className="flex items-center sm:flex-row gap-4 pt-4">
              <Link href="/marketplace">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                  Explore Startups <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="api/auth/login">
                <Button
                  variant="outline"
                  className="border-purple-800/20 text-white hover:bg-purple-900/30 px-8 py-6 text-lg"
                >
                  Start Fundraising
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/50 z-10 rounded-xl"></div>
            <div className="relative z-0 rounded-xl overflow-hidden border border-purple-800/20 shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Optimus+AI+Platform+Preview"
                alt="OnlyFounders Platform"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-1.5 text-sm font-medium text-blue-400 border-blue-500/20 mb-4">
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Revolutionizing Web3 Fundraising</h2>
            <p className="text-purple-200/70 max-w-2xl mx-auto">
              OnlyFounders leverages cutting-edge technology to create a seamless investment experience for both founders
              and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Investment Insights</h3>
                <p className="text-purple-200/70">
                Our AI agents evaluate startups on financials, team, market potential, and blockchain data, boosting investment success by up to 40%.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Smart contract analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Team background verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Market opportunity assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">DCA-Enabled Crowdfunding</h3>
                <p className="text-purple-200/70">
                  Investors can deploy funds gradually to minimize risk and optimize returns, reducing exposure to
                  market volatility by an estimated 35%.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Automated investment scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Risk-adjusted position sizing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Milestone-based funding releases</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Multi-Chain Infrastructure</h3>
                <p className="text-purple-200/70">
                  Permissionless investment infrastructure ensuring transparency and accessibility, tapping into a $1
                  trillion+ Web3 economy.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Cross-chain compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Gas-optimized transactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
                    <span className="text-purple-200/70">Decentralized governance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-indigo-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-1.5 text-sm font-medium text-blue-400 border-blue-500/20 mb-4">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How OnlyFounders Works</h2>
            <p className="text-purple-200/70 max-w-2xl mx-auto">
              Our platform streamlines the fundraising process for founders and provides investors with AI-powered
              insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Startup Submission</h3>
                    <p className="text-purple-200/70">
                      Founders submit their Startups with detailed information about their team, technology, and funding
                      goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Evaluation</h3>
                    <p className="text-purple-200/70">
                      Our AI system analyzes the startup, verifies claims, and generates a comprehensive risk
                      assessment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Investor Matching</h3>
                    <p className="text-purple-200/70">
                      Startups are matched with investors based on their investment preferences and risk tolerance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">DCA Investment</h3>
                    <p className="text-purple-200/70">
                      Investors deploy capital gradually based on startup milestones and performance metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden border border-purple-800/20">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=How+It+Works"
                  alt="How OnlyFounders Works"
                  width={600}
                  height={500}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-indigo-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-1.5 text-sm font-medium text-blue-400 border-blue-500/20 mb-4">
                Opportunities
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Startups</h2>
              <p className="text-purple-200/70 max-w-2xl">
                Discover innovative blockchain startups seeking funding on our platform.
              </p>
            </div>
            <Link href="/marketplace" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-purple-800/20 text-white hover:bg-purple-900/30">
                View All Startups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DecentraVault */}

            {projects.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 hover:border-blue-600 transition-colors overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageURL || "/placeholder.svg?height=200&width=400&text=Startup"}
                    alt={item.startupName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600">Featured</Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-blue-600">{item.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative bg-gray-800 border-2 border-gray-700">
                      <Image
                        src={item.logoURL || "/placeholder.svg?height=40&width=40&text=S"}
                        alt="Startup Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{item.startupName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Users size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-400">Founded by {item.founderName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {item.blockchainPlatform}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-700">
                        {item.startupStage}
                      </Badge>
                  </div>

                  <p className="text-purple-200/70 text-sm mb-4">{item.tagline}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-400">{item.totalRaised} USDC raised</span>
                      <span className="text-white">
                        {item.goal ? ((item.totalRaised / item.goal) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-purple-900/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${item.goal ? (item.totalRaised / item.goal) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div suppressHydrationWarning className="flex justify-between text-xs text-purple-200/70">
                      <span>Goal: {item.goal ? `${item.goal} USDC` : "N/A"}</span>
                      <span>
                        {item.deadline && !isNaN(Date.parse(item.deadline))
                          ? `${Math.ceil((Date.parse(item.deadline) - Date.now()) / (1000 * 60 * 60 * 24))} days left`
                          : "No deadline"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Link href={`/marketplace/project/${item.startupName.toLowerCase().replace(/\s+/g, "-")}`}>
                      View Startup Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-br from-indigo-950/80 to-purple-900/80 rounded-2xl p-8 md:p-12 border border-purple-800/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Web3 Fundraising?</h2>
                <p className="text-purple-200/70 mb-6">
                  Join OnlyFounders today and be part of the future of decentralized investment. Whether you're a founder
                  looking to raise funds or an investor seeking opportunities, our platform provides the tools you need
                  to succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/marketplace">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Explore Startups <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/founder-dashboard">
                    <Button variant="outline" className="border-purple-800/20 text-white hover:bg-purple-900/30">
                      Start Fundraising
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Join+Optimus+AI"
                  alt="Join OnlyFounders"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

