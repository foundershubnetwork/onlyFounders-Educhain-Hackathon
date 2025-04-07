import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"

interface RelatedEventsProps {
  currentEventId: string
}

export default function RelatedEvents({ currentEventId }: RelatedEventsProps) {
  // Mock data for related events
  const events = [
    {
      id: "2",
      title: "Smart Contract Security Workshop",
      description: "Learn best practices for securing your smart contracts from industry experts",
      date: "Dec 10, 2023",
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
      date: "Dec 18, 2023",
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
      description: "Deep dive into designing effective token economics for your project",
      date: "Jan 5, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      image: "/placeholder.svg?height=200&width=400",
      attendees: 200,
      type: "Webinar",
      virtual: true,
    },
  ].filter((event) => event.id !== currentEventId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Related Events</h2>
        <Link href="/network/events" className="text-blue-400 flex items-center hover:text-blue-300">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
          >
            <div className="relative h-48 w-full">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge
                  className={
                    event.type === "Conference"
                      ? "bg-blue-600"
                      : event.type === "Workshop"
                        ? "bg-purple-600"
                        : event.type === "Networking"
                          ? "bg-teal-600"
                          : "bg-amber-600"
                  }
                >
                  {event.type}
                </Badge>
              </div>
              {event.virtual && <Badge className="absolute top-2 left-2 bg-gray-800">Virtual</Badge>}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
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
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                <Link href={`/network/events/${event.id}`}>View Event</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

