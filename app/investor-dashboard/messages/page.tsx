"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Send,
  PlusCircle,
  Paperclip,
  CheckCircle,
  Clock,
  MessageSquare,
  Users,
  Bell,
  Filter,
} from "lucide-react"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [activeChat, setActiveChat] = useState("1")
  const [messageText, setMessageText] = useState("")

  // Mock data for messages
  const conversations = [
    {
      id: "1",
      name: "DecentraVault Team",
      avatar: "/placeholder.svg?height=40&width=40&text=DV",
      lastMessage: "We've just completed the security audit milestone!",
      time: "10:30 AM",
      unread: 2,
      isTeam: true,
      type: "project",
    },
    {
      id: "2",
      name: "MetaCanvas Team",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      lastMessage: "The mobile app beta is ready for testing",
      time: "Yesterday",
      unread: 0,
      isTeam: true,
      type: "project",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      lastMessage: "I'd like to discuss co-investing in GameFi World",
      time: "Mar 15",
      unread: 1,
      isTeam: false,
      type: "investor",
    },
    {
      id: "4",
      name: "Optimus AI Support",
      avatar: "/placeholder.svg?height=40&width=40&text=OA",
      lastMessage: "Your verification is complete. You can now invest in all projects.",
      time: "Mar 10",
      unread: 0,
      isTeam: false,
      type: "support",
    },
  ]

  // Filter conversations based on active tab
  const filteredConversations =
    activeTab === "all"
      ? conversations
      : activeTab === "projects"
        ? conversations.filter((conv) => conv.type === "project")
        : activeTab === "investors"
          ? conversations.filter((conv) => conv.type === "investor")
          : conversations.filter((conv) => conv.type === "support")

  // Get active conversation
  const activeConversation = conversations.find((conv) => conv.id === activeChat)

  // Mock messages for the active conversation
  const messages = [
    {
      id: "1",
      senderId: activeChat,
      text: "Hello! Thanks for investing in our project. We're excited to have you on board.",
      time: "10:15 AM",
      date: "Today",
    },
    {
      id: "2",
      senderId: "user",
      text: "Happy to be part of it! How's progress on the security audit milestone?",
      time: "10:20 AM",
      date: "Today",
    },
    {
      id: "3",
      senderId: activeChat,
      text: "We've just completed the security audit milestone! All tests passed with flying colors.",
      time: "10:30 AM",
      date: "Today",
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", messageText)
      setMessageText("")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Messages</h1>
            <p className="text-purple-200/70">Communicate with project teams and other investors</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Conversations</CardTitle>
                <Button variant="ghost" size="icon" className="text-[#A3A8AF]">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full bg-[#1F2A3D] p-1 rounded-none">
                  <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-black data-[state=active]:text-white">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value="investors"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    Investors
                  </TabsTrigger>
                  <TabsTrigger value="support" className="data-[state=active]:bg-black data-[state=active]:text-white">
                    Support
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="divide-y divide-[#313E54]">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 cursor-pointer hover:bg-[#1F2A3D] transition-colors ${
                          activeChat === conversation.id ? "bg-[#1F2A3D]" : ""
                        }`}
                        onClick={() => setActiveChat(conversation.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <h3 className="font-medium text-white truncate">{conversation.name}</h3>
                                {conversation.isTeam && <CheckCircle className="h-3 w-3 text-blue-400" />}
                              </div>
                              <span className="text-xs text-[#A3A8AF]">{conversation.time}</span>
                            </div>
                            <p className="text-sm text-[#A3A8AF] truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-600 text-white">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20 flex flex-col">
            {activeConversation ? (
              <>
                <CardHeader className="pb-2 border-b border-[#313E54]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                        <AvatarFallback>{activeConversation.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-medium text-white">{activeConversation.name}</h3>
                          {activeConversation.isTeam && <CheckCircle className="h-3 w-3 text-blue-400" />}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#A3A8AF]">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Last active: 5m ago
                          </span>
                          {activeConversation.type === "project" && (
                            <Badge variant="outline" className="bg-[#1F2A3D] text-[#A3A8AF] border-[#313E54] text-xs">
                              Project Team
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-[#A3A8AF]">
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-[#A3A8AF]">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 overflow-y-auto min-h-[400px] flex flex-col">
                  <div className="flex-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.senderId !== "user" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={activeConversation.avatar} alt={activeConversation.name} />
                            <AvatarFallback>{activeConversation.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === "user" ? "bg-blue-600 text-white" : "bg-[#1F2A3D] text-white"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div
                            className={`text-xs mt-1 ${
                              message.senderId === "user" ? "text-blue-200" : "text-[#A3A8AF]"
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="p-4 border-t border-[#313E54]">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-[#A3A8AF]">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <MessageSquare className="h-16 w-16 text-[#A3A8AF] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No conversation selected</h3>
                <p className="text-[#A3A8AF] text-center max-w-md">
                  Select a conversation from the list or start a new one to begin messaging.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

