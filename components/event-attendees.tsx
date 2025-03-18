"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MessageSquare, UserPlus, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EventAttendeesProps {
  eventId: string
}

export default function EventAttendees({ eventId }: EventAttendeesProps) {
  const [filter, setFilter] = useState("all")

  // Mock attendees data
  const attendees = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Founder & CEO",
      company: "DecentraVault",
      bio: "Blockchain entrepreneur with 10+ years in fintech",
      verified: true,
      speaker: true,
      following: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "CTO",
      company: "MetaCanvas",
      bio: "Smart contract developer and security expert",
      verified: true,
      speaker: true,
      following: false,
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Product Lead",
      company: "ChainGovernance",
      bio: "Product strategist specializing in Web3 applications",
      verified: true,
      speaker: false,
      following: true,
    },
    {
      id: "4",
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Blockchain Developer",
      company: "Freelance",
      bio: "Full-stack developer with focus on blockchain integration",
      verified: false,
      speaker: false,
      following: false,
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Investor",
      company: "Crypto Ventures",
      bio: "Angel investor focusing on early-stage blockchain startups",
      verified: true,
      speaker: false,
      following: false,
    },
    {
      id: "6",
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Marketing Director",
      company: "BlockTech Media",
      bio: "Marketing specialist with expertise in crypto and blockchain",
      verified: false,
      speaker: false,
      following: true,
    },
  ]

  const filteredAttendees = attendees.filter((attendee) => {
    if (filter === "all") return true
    if (filter === "speakers") return attendee.speaker
    if (filter === "verified") return attendee.verified
    if (filter === "following") return attendee.following
    return true
  })

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">Event Attendees ({attendees.length})</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search attendees..." className="pl-9 bg-gray-800 border-gray-700 text-white" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              <SelectItem value="all">All Attendees</SelectItem>
              <SelectItem value="speakers">Speakers</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="following">Following</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttendees.map((attendee) => (
          <div key={attendee.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={attendee.avatar} />
                <AvatarFallback>
                  {attendee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-white">{attendee.name}</h3>
                      {attendee.verified && <CheckCircle className="ml-1 h-3 w-3 text-blue-400" />}
                    </div>
                    <p className="text-sm text-gray-400">
                      {attendee.role} at {attendee.company}
                    </p>
                  </div>
                  {attendee.speaker && <Badge className="bg-blue-600">Speaker</Badge>}
                </div>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">{attendee.bio}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    variant={attendee.following ? "default" : "outline"}
                    size="sm"
                    className={
                      attendee.following ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-300 border-gray-700"
                    }
                  >
                    <UserPlus className="mr-1 h-4 w-4" />
                    {attendee.following ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

