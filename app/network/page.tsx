"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Calendar,
  Clock,
  Filter,
  Globe,
  MapPin,
  MessageSquare,
  Search,
  Star,
  Users,
  Bell,
  Rocket,
} from "lucide-react";

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState("members");

  // Mock data for members
  const members = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Founder & CEO",
      company: "DecentraVault",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Blockchain entrepreneur with 10+ years in fintech",
      skills: ["DeFi", "Smart Contracts", "Tokenomics"],
      location: "San Francisco, CA",
      connections: 245,
      projects: 3,
      verified: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "CTO",
      company: "MetaCanvas",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Smart contract developer and security expert",
      skills: ["Solidity", "Security Audits", "NFTs"],
      location: "New York, NY",
      connections: 187,
      projects: 2,
      verified: true,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "Product Lead",
      company: "ChainGovernance",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Product strategist specializing in Web3 applications",
      skills: ["Product Strategy", "UX Design", "DAOs"],
      location: "Austin, TX",
      connections: 156,
      projects: 1,
      verified: true,
    },
    {
      id: "4",
      name: "Emily Watson",
      role: "Blockchain Developer",
      company: "Freelance",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Full-stack developer with focus on blockchain integration",
      skills: ["React", "Node.js", "Ethereum"],
      location: "London, UK",
      connections: 132,
      projects: 4,
      verified: false,
    },
    {
      id: "5",
      name: "David Kim",
      role: "Investor",
      company: "Crypto Ventures",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Angel investor focusing on early-stage blockchain startups",
      skills: ["Investment", "Tokenomics", "Business Development"],
      location: "Singapore",
      connections: 310,
      projects: 0,
      verified: true,
    },
    {
      id: "6",
      name: "Sophia Martinez",
      role: "Marketing Director",
      company: "BlockTech Media",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Marketing specialist with expertise in crypto and blockchain",
      skills: ["Growth Marketing", "Community Building", "Content Strategy"],
      location: "Miami, FL",
      connections: 178,
      projects: 2,
      verified: false,
    },
  ];

  // Mock data for events
  const events = [
    {
      id: "1",
      title: "Optimus AI DeFi Summit",
      description:
        "Join us for a day of discussions on the future of decentralized finance",
      date: "Apr 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 350,
      type: "Conference",
      virtual: false,
    },
    {
      id: "2",
      title: "Smart Contract Security Workshop",
      description:
        "Learn best practices for securing your smart contracts from industry experts",
      date: "Apr 10, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Virtual",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 120,
      type: "Workshop",
      virtual: true,
    },
    {
      id: "3",
      title: "Web3 Founders Meetup",
      description: "Networking event for founders building in the Web3 space",
      date: "Apr 18, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "New York, NY",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 75,
      type: "Networking",
      virtual: false,
    },
    {
      id: "4",
      title: "Tokenomics Masterclass",
      description:
        "Deep dive into designing effective token economics for your project",
      date: "May 5, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 200,
      type: "Webinar",
      virtual: true,
    },
  ];

  // Mock data for jobs
  const jobs = [
    {
      id: "1",
      title: "Senior Blockchain Developer",
      company: "DecentraVault",
      logo: "/placeholder.svg?height=48&width=48",
      location: "San Francisco, CA (Remote OK)",
      type: "Full-time",
      salary: "$120K - $160K",
      posted: "2 days ago",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "React"],
    },
    {
      id: "2",
      title: "Product Manager - DeFi",
      company: "MetaCanvas",
      logo: "/placeholder.svg?height=48&width=48",
      location: "Remote",
      type: "Full-time",
      salary: "$100K - $130K",
      posted: "1 week ago",
      skills: ["Product Management", "DeFi", "Agile", "Web3"],
    },
    {
      id: "3",
      title: "Smart Contract Auditor",
      company: "ChainGovernance",
      logo: "/placeholder.svg?height=48&width=48",
      location: "New York, NY",
      type: "Contract",
      salary: "$10K - $15K per audit",
      posted: "3 days ago",
      skills: ["Security", "Solidity", "Auditing", "DeFi"],
    },
    {
      id: "4",
      title: "Community Manager",
      company: "Optimus AI",
      logo: "/placeholder.svg?height=48&width=48",
      location: "Remote",
      type: "Full-time",
      salary: "$70K - $90K",
      posted: "Just now",
      skills: [
        "Community Building",
        "Social Media",
        "Discord",
        "Content Creation",
      ],
    },
  ];

  // Mock data for partners
  const partners = [
    {
      id: "1",
      name: "BlockSecure",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Leading blockchain security firm providing smart contract audits and security services",
      category: "Security",
      website: "https://blocksecure.io",
    },
    {
      id: "2",
      name: "CryptoLegal",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Specialized legal services for blockchain projects and crypto startups",
      category: "Legal",
      website: "https://cryptolegal.com",
    },
    {
      id: "3",
      name: "TokenLaunch",
      logo: "/placeholder.svg?height=80&width=80",
      description: "Token launch platform with marketing and advisory services",
      category: "Marketing",
      website: "https://tokenlaunch.io",
    },
    {
      id: "4",
      name: "ChainVentures",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Venture capital firm focused on early-stage blockchain startups",
      category: "Investment",
      website: "https://chainventures.capital",
    },
    {
      id: "5",
      name: "MetaExchange",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Decentralized exchange with deep liquidity and multi-chain support",
      category: "Exchange",
      website: "https://metaexchange.io",
    },
    {
      id: "6",
      name: "NodeProviders",
      logo: "/placeholder.svg?height=80&width=80",
      description:
        "Infrastructure provider offering node services and API endpoints",
      category: "Infrastructure",
      website: "https://nodeproviders.net",
    },
  ];

  return (
    <AppLayout className="z-50">
      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-md overflow-x-auto">
        <Card className="w-full max-w-md mx-4 border-purple-800/30 shadow-xl rounded-2xl relative overflow-hidden">
          {/* Background Image with 75% Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/coming-soon-card.gif')" }}
          />

          <CardHeader className="pb-2 text-center relative z-10">
            <div className="mx-auto flex items-center justify-center mb-4">
              <Image
                src="/favicon.svg"
                alt="OnlyFounders"
                width={75}
                height={75}
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-white">
              Coming Soon!
            </CardTitle>
            <CardDescription className="text-white text-lg">
              We're building something amazing
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center relative z-10">
            <p className="text-gray-300">
            A Web3 space for founders, investors, and professionals to connect, collaborate, and grow stronger together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="border-purple-800/30 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-screen overflow-x-hidden container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Network</h1>
            <p className="text-gray-400">
              Connect with founders, investors, and professionals in the
              blockchain space
            </p>
          </div>
        </div>

        <Tabs
          defaultValue="members"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="partners"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Globe className="mr-2 h-4 w-4" />
              Partners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search members by name, skills, or location..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="founders">Founders</SelectItem>
                  <SelectItem value="investors">Investors</SelectItem>
                  <SelectItem value="developers">Developers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-800">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <CardTitle className="text-lg text-white">
                              {member.name}
                            </CardTitle>
                            {member.verified && (
                              <Badge className="ml-2 bg-blue-900/30 text-blue-400 border-blue-800">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-gray-400">
                            {member.role} at {member.company}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-300">{member.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-800/50 text-gray-300 border-gray-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      {member.location}
                    </div>

                    <div className="flex justify-between text-sm text-gray-400 pt-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {member.connections} connections
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {member.projects} projects
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Connect
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-gray-300 border-gray-700"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search events..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="conference">Conferences</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="virtual">Virtual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-2 right-2 ${
                        event.type === "Conference"
                          ? "bg-blue-600"
                          : event.type === "Workshop"
                          ? "bg-purple-600"
                          : event.type === "Networking"
                          ? "bg-teal-600"
                          : "bg-amber-600"
                      }`}
                    >
                      {event.type}
                    </Badge>
                    {event.virtual && (
                      <Badge className="absolute top-2 left-2 bg-gray-800">
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="h-4 w-4 mr-2 text-blue-400" />
                        {event.attendees} attendees
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Register
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-gray-300 border-gray-700"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                          <Image
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {job.title}
                          </h3>
                          <p className="text-gray-400">{job.company}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                            <div className="flex items-center text-gray-300">
                              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                              {job.location}
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-gray-800/50 text-gray-300 border-gray-700"
                            >
                              {job.type}
                            </Badge>
                            <div className="text-green-400">{job.salary}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-gray-500">
                          Posted {job.posted}
                        </div>
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-900/20 text-blue-400 border-blue-800"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search partners..."
                  className="pl-9 bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  <SelectItem value="all">All Partners</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {partner.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-gray-800/50 text-gray-300 border-gray-700"
                        >
                          {partner.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {partner.description}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 text-gray-300 border-gray-700"
                      >
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </Link>
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
