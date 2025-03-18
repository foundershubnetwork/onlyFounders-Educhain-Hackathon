"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Share2,
  Edit,
  Trash2,
  ImageIcon,
  LinkIcon,
  FileUp,
  Send,
} from "lucide-react"

export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for updates
  const updates = [
    {
      id: "1",
      title: "Mobile App Beta Launch",
      content:
        "We're excited to announce that our mobile app beta is now live! We've been working hard on this milestone and are proud to share it with our investors. The beta includes all core features and is available for both iOS and Android platforms. We're looking forward to your feedback as we continue to refine the user experience.",
      date: "Mar 28, 2025",
      type: "milestone",
      likes: 24,
      comments: 8,
      attachments: [
        { name: "beta-screenshot-1.png", type: "image" },
        { name: "beta-screenshot-2.png", type: "image" },
      ],
    },
    {
      id: "2",
      title: "Security Audit Progress",
      content:
        "We've completed the first phase of our security audit with CryptoSecure. Initial findings show no critical vulnerabilities, and we're addressing the minor issues identified. The second phase will begin next week, focusing on penetration testing and stress testing our infrastructure. We remain committed to providing the highest level of security for our platform and user data.",
      date: "Mar 20, 2025",
      type: "progress",
      likes: 18,
      comments: 5,
      attachments: [{ name: "security-audit-summary.pdf", type: "document" }],
    },
    {
      id: "3",
      title: "New Partnership Announcement",
      content:
        "We're thrilled to announce our strategic partnership with BlockChain Solutions, a leading provider of blockchain infrastructure. This partnership will allow us to enhance our platform's scalability and interoperability, opening up new opportunities for growth. We'll be integrating their cross-chain technology in our next release, enabling seamless transactions across multiple blockchains.",
      date: "Mar 15, 2025",
      type: "announcement",
      likes: 32,
      comments: 12,
      attachments: [],
    },
    {
      id: "4",
      title: "Q1 2025 Financial Update",
      content:
        "We've completed our financial review for Q1 2025. We're pleased to report that we're on track with our budget projections and have maintained a healthy runway. Our user acquisition costs have decreased by 15% while retention rates have improved by 20%. We've also secured additional strategic investments that will help accelerate our growth in the coming quarters.",
      date: "Mar 10, 2025",
      type: "financial",
      likes: 15,
      comments: 7,
      attachments: [{ name: "q1-2025-financial-summary.pdf", type: "document" }],
    },
    {
      id: "5",
      title: "Team Expansion",
      content:
        "We're growing! This month, we've welcomed three new team members: Jane Doe (Senior Backend Developer), John Smith (UX Designer), and Alice Johnson (Marketing Specialist). These talented individuals bring valuable experience from companies like Google, Meta, and Coinbase. With these additions, we're well-positioned to accelerate our development timeline and enhance our market presence.",
      date: "Mar 5, 2025",
      type: "team",
      likes: 27,
      comments: 9,
      attachments: [{ name: "team-photo.jpg", type: "image" }],
    },
  ]

  // Filter updates based on active tab
  const filteredUpdates = activeTab === "all" ? updates : updates.filter((update) => update.type === activeTab)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Updates</h1>
            <p className="text-purple-200/70">Keep your investors informed about your progress</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <FileText className="mr-2 h-4 w-4" />
                Post Update
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1F2A3D] border-[#313E54] text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post Update</DialogTitle>
                <DialogDescription className="text-purple-200/70">
                  Share important news and progress with your investors.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-white">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="Enter update title"
                    className="bg-[#29305F] border-[#313E54] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium text-white">
                    Update Type
                  </label>
                  <Select>
                    <SelectTrigger className="bg-[#29305F] border-[#313E54] text-white">
                      <SelectValue placeholder="Select update type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium text-white">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Enter update content"
                    className="bg-[#29305F] border-[#313E54] text-white min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Attachments</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                    <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                    <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Add Link
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                  Save as Draft
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Publish Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg inline-flex">
            <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
              All Updates
            </TabsTrigger>
            <TabsTrigger value="milestone" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Milestones
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Progress
            </TabsTrigger>
            <TabsTrigger value="announcement" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Financial
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Team
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            {filteredUpdates.map((update) => (
              <Card
                key={update.id}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`
                            ${
                              update.type === "milestone"
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : update.type === "progress"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                  : update.type === "announcement"
                                    ? "bg-purple-900/30 text-purple-400 border-purple-800"
                                    : update.type === "financial"
                                      ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                      : "bg-pink-900/30 text-pink-400 border-pink-800"
                            }
                          `}
                        >
                          {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                        </Badge>
                        <div className="flex items-center text-xs text-[#A3A8AF]">
                          <Calendar className="mr-1 h-3 w-3" />
                          {update.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white">{update.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF] hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF] hover:text-white">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#A3A8AF] whitespace-pre-line">{update.content}</p>

                  {update.attachments.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {update.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 rounded-md bg-[#1F2A3D] border border-[#313E54]"
                          >
                            {attachment.type === "image" ? (
                              <ImageIcon className="h-4 w-4 text-blue-400" />
                            ) : (
                              <FileText className="h-4 w-4 text-amber-400" />
                            )}
                            <span className="text-sm text-white">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-[#313E54] pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" className="text-[#A3A8AF] hover:text-white">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        {update.likes}
                      </Button>
                      <Button variant="ghost" className="text-[#A3A8AF] hover:text-white">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {update.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" className="text-[#A3A8AF] hover:text-white">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>

        <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">Investor Comments</CardTitle>
            <CardDescription className="text-purple-200/70">Recent comments from your investors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=AT" alt="Alex Thompson" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium text-white">Alex Thompson</h4>
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">Investor</Badge>
                    </div>
                    <span className="text-xs text-[#A3A8AF]">2 hours ago</span>
                  </div>
                  <p className="text-[#A3A8AF]">
                    Great progress on the mobile app! I've been testing it and the UI is very intuitive. Looking forward
                    to the full release.
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      <ThumbsUp className="mr-2 h-3 w-3" />
                      12
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=SC" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium text-white">Sarah Chen</h4>
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">Investor</Badge>
                    </div>
                    <span className="text-xs text-[#A3A8AF]">5 hours ago</span>
                  </div>
                  <p className="text-[#A3A8AF]">
                    The partnership with BlockChain Solutions is a smart move. Their cross-chain technology will
                    definitely give you an edge in the market.
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      <ThumbsUp className="mr-2 h-3 w-3" />8
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40&text=QV" alt="Quantum Ventures" />
                  <AvatarFallback>QV</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium text-white">Quantum Ventures</h4>
                      <Badge className="bg-purple-900/30 text-purple-400 border-purple-800">Institutional</Badge>
                    </div>
                    <span className="text-xs text-[#A3A8AF]">1 day ago</span>
                  </div>
                  <p className="text-[#A3A8AF]">
                    The Q1 financials look solid. We're impressed with the reduction in user acquisition costs while
                    improving retention. Keep up the good work!
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      <ThumbsUp className="mr-2 h-3 w-3" />
                      15
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[#A3A8AF] hover:text-white">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#313E54] pt-4">
            <div className="flex items-center gap-4 w-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input
                  placeholder="Write a reply..."
                  className="pr-10 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-transparent hover:bg-transparent text-blue-400">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

