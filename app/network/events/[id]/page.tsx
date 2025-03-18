"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ExternalLink, Share2, Bookmark, ArrowLeft } from "lucide-react"
import EventAttendees from "@/components/event-attendees"
import RelatedEvents from "@/components/related-events"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock event data
  const event = {
    id: params.id,
    title: "Web3 Fundraising Summit 2023",
    description: `
      <p>Join us for the premier Web3 Fundraising Summit, bringing together founders, investors, and thought leaders in the blockchain space. This two-day event will feature keynote speeches, panel discussions, workshops, and networking opportunities focused on the future of decentralized fundraising.</p>
      
      <p>Topics covered will include:</p>
      <ul>
        <li>AI-driven investment strategies for Web3 projects</li>
        <li>Regulatory considerations for token-based fundraising</li>
        <li>Building sustainable tokenomics models</li>
        <li>Cross-chain fundraising opportunities</li>
        <li>DAO governance for investment decisions</li>
      </ul>
      
      <p>Whether you're a founder looking to raise funds, an investor seeking promising projects, or a blockchain enthusiast interested in the latest trends, this summit offers valuable insights and connections.</p>
    `,
    date: "December 15-16, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Crypto Convention Center, San Francisco, CA",
    image: "/placeholder.svg?height=400&width=800",
    organizer: {
      name: "Blockchain Ventures Association",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
    },
    attendees: 250,
    maxAttendees: 300,
    price: "Free",
    tags: ["Fundraising", "Investment", "Web3", "Conference"],
    speakers: [
      {
        name: "Sarah Johnson",
        role: "Founder & CEO, DecentraVault",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Sarah is a serial entrepreneur with over 10 years of experience in blockchain technology. She founded DecentraVault in 2021 and has successfully raised $15M in funding.",
      },
      {
        name: "Michael Chen",
        role: "Partner, Crypto Ventures Fund",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Michael has invested in over 50 blockchain startups and has a strong track record of identifying promising projects in their early stages.",
      },
      {
        name: "Elena Rodriguez",
        role: "Head of Research, Tokenomics Institute",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Elena specializes in designing sustainable token economic models and has advised numerous successful Web3 projects.",
      },
    ],
    schedule: [
      {
        day: "Day 1 - December 15",
        sessions: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Registration & Networking Breakfast",
          },
          {
            time: "10:00 AM - 11:00 AM",
            title: "Keynote: The Future of Web3 Fundraising",
            speaker: "Sarah Johnson",
          },
          {
            time: "11:15 AM - 12:15 PM",
            title: "Panel: AI-Driven Investment Strategies",
            speakers: ["Michael Chen", "Elena Rodriguez"],
          },
          {
            time: "12:30 PM - 1:30 PM",
            title: "Lunch Break & Networking",
          },
          {
            time: "1:45 PM - 3:15 PM",
            title: "Workshop: Building a Compelling Pitch Deck for Web3 Projects",
          },
          {
            time: "3:30 PM - 4:30 PM",
            title: "Panel: Regulatory Landscape for Token Offerings",
          },
          {
            time: "4:45 PM - 6:00 PM",
            title: "Networking Reception",
          },
        ],
      },
      {
        day: "Day 2 - December 16",
        sessions: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Networking Breakfast",
          },
          {
            time: "10:00 AM - 11:00 AM",
            title: "Keynote: Sustainable Tokenomics Design",
            speaker: "Elena Rodriguez",
          },
          {
            time: "11:15 AM - 12:15 PM",
            title: "Panel: Cross-Chain Fundraising Opportunities",
          },
          {
            time: "12:30 PM - 1:30 PM",
            title: "Lunch Break & Networking",
          },
          {
            time: "1:45 PM - 3:15 PM",
            title: "Workshop: Due Diligence for Web3 Investors",
          },
          {
            time: "3:30 PM - 4:30 PM",
            title: "Fireside Chat: The Future of DAOs in Investment",
          },
          {
            time: "4:45 PM - 6:00 PM",
            title: "Closing Remarks & Networking",
          },
        ],
      },
    ],
    website: "https://web3fundraisingsummit.com",
    twitter: "https://twitter.com/web3fundraising",
    telegram: "https://t.me/web3fundraising",
  }

  const handleRegister = () => {
    // In a real app, this would make an API call to register the user
    setIsRegistered(true)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Link href="/network/events">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-gray-400">Back to Events</span>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[300px] mb-8">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {event.tags.map((tag) => (
              <Badge key={tag} className="bg-blue-600">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
          <div className="flex items-center mt-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
              <Image
                src={event.organizer.logo || "/placeholder.svg"}
                alt={event.organizer.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-gray-300">Organized by {event.organizer.name}</span>
            {event.organizer.verified && (
              <Badge variant="outline" className="ml-2 bg-blue-900/20 text-blue-400 border-blue-800">
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="bg-gray-900 border border-gray-800 p-1">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Schedule
              </TabsTrigger>
              <TabsTrigger
                value="speakers"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Speakers
              </TabsTrigger>
              <TabsTrigger
                value="attendees"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Attendees
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">About the Event</h2>
                <div className="text-gray-300 space-y-4" dangerouslySetInnerHTML={{ __html: event.description }} />
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-white">Date</h3>
                      <p className="text-gray-300">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-white">Time</h3>
                      <p className="text-gray-300">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-white">Location</h3>
                      <p className="text-gray-300">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-white">Attendees</h3>
                      <p className="text-gray-300">
                        {event.attendees} / {event.maxAttendees}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              {event.schedule.map((day, index) => (
                <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">{day.day}</h2>
                  <div className="space-y-4">
                    {day.sessions.map((session, sessionIndex) => (
                      <div
                        key={sessionIndex}
                        className="border-l-2 border-blue-600 pl-4 py-2 hover:bg-gray-800/50 transition-colors"
                      >
                        <p className="text-blue-400 text-sm">{session.time}</p>
                        <h3 className="font-medium text-white">{session.title}</h3>
                        {session.speaker && <p className="text-gray-400 text-sm">Speaker: {session.speaker}</p>}
                        {session.speakers && (
                          <p className="text-gray-400 text-sm">Speakers: {session.speakers.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="speakers" className="space-y-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Event Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                          src={speaker.avatar || "/placeholder.svg"}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{speaker.name}</h3>
                        <p className="text-blue-400 text-sm">{speaker.role}</p>
                        <p className="text-gray-300 text-sm mt-2">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendees">
              <EventAttendees eventId={event.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 sticky top-20">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Registration</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-white font-bold">{event.price}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-300">Availability:</span>
                  <span className="text-white">{event.maxAttendees - event.attendees} spots left</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">
                      {event.attendees} / {event.maxAttendees}
                    </span>
                    <span className="text-gray-400">
                      {Math.round((event.attendees / event.maxAttendees) * 100)}% full
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {isRegistered ? (
                  <Button disabled className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Registered
                  </Button>
                ) : (
                  <Button onClick={handleRegister} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Register Now
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-gray-700 text-white" onClick={handleBookmark}>
                  {isBookmarked ? (
                    <>
                      <Bookmark className="mr-2 h-4 w-4 fill-blue-400 text-blue-400" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1 border-gray-700 text-white">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Event Links</h3>
                <div className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start text-gray-300 border-gray-700">
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 text-blue-400" />
                      Official Website
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start text-gray-300 border-gray-700">
                    <a href={event.twitter} target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start text-gray-300 border-gray-700">
                    <a href={event.telegram} target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.375 16.5h-.75c-1.243 0-2.25-1.007-2.25-2.25v-4.5c0-1.243 1.007-2.25 2.25-2.25h.75c1.243 0 2.25 1.007 2.25 2.25v4.5c0 1.243-1.007 2.25-2.25 2.25z" />
                      </svg>
                      Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RelatedEvents currentEventId={event.id} />
      </div>
    </div>
  )
}

