"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  PlayCircle,
} from "lucide-react"

export default function MilestonesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)

  // Mock data for milestones
  const milestones = [
    {
      id: "1",
      title: "Project Kickoff",
      description:
        "Initial project setup, team onboarding, and roadmap finalization. This milestone includes setting up the development environment, establishing communication channels, and defining the project scope and objectives.",
      startDate: "Jan 15, 2025",
      dueDate: "Jan 30, 2025",
      completedDate: "Jan 28, 2025",
      progress: 100,
      status: "completed",
      fundingAmount: 50000,
      tasks: [
        { id: "1-1", title: "Team onboarding", completed: true },
        { id: "1-2", title: "Development environment setup", completed: true },
        { id: "1-3", title: "Project roadmap finalization", completed: true },
      ],
    },
    {
      id: "2",
      title: "MVP Development",
      description:
        "Development of the minimum viable product with core features. This milestone focuses on implementing the essential functionality that provides value to users and demonstrates the product's potential.",
      startDate: "Feb 1, 2025",
      dueDate: "Feb 28, 2025",
      completedDate: "Feb 25, 2025",
      progress: 100,
      status: "completed",
      fundingAmount: 100000,
      tasks: [
        { id: "2-1", title: "Core functionality implementation", completed: true },
        { id: "2-2", title: "Basic UI/UX design", completed: true },
        { id: "2-3", title: "Internal testing", completed: true },
      ],
    },
    {
      id: "3",
      title: "Alpha Release",
      description:
        "Limited release to early adopters for initial feedback. This milestone involves deploying the product to a select group of users who will provide valuable feedback for further refinement.",
      startDate: "Mar 1, 2025",
      dueDate: "Mar 15, 2025",
      completedDate: "Mar 12, 2025",
      progress: 100,
      status: "completed",
      fundingAmount: 75000,
      tasks: [
        { id: "3-1", title: "Deployment to test environment", completed: true },
        { id: "3-2", title: "User onboarding process", completed: true },
        { id: "3-3", title: "Feedback collection system", completed: true },
      ],
    },
    {
      id: "4",
      title: "Mobile App Beta",
      description:
        "Development and release of mobile app beta version. This milestone focuses on extending the platform to mobile devices, ensuring a seamless experience across different platforms.",
      startDate: "Mar 20, 2025",
      dueDate: "Apr 30, 2025",
      completedDate: null,
      progress: 65,
      status: "in_progress",
      fundingAmount: 125000,
      tasks: [
        { id: "4-1", title: "Mobile app architecture", completed: true },
        { id: "4-2", title: "Core features implementation", completed: true },
        { id: "4-3", title: "Cross-platform testing", completed: false },
        { id: "4-4", title: "App store submission", completed: false },
      ],
    },
    {
      id: "5",
      title: "Security Audit",
      description:
        "Comprehensive security audit by third-party experts. This milestone ensures that the platform meets industry security standards and protects user data and assets.",
      startDate: "Apr 1, 2025",
      dueDate: "May 15, 2025",
      completedDate: null,
      progress: 30,
      status: "in_progress",
      fundingAmount: 50000,
      tasks: [
        { id: "5-1", title: "Security firm selection", completed: true },
        { id: "5-2", title: "Initial vulnerability assessment", completed: true },
        { id: "5-3", title: "Penetration testing", completed: false },
        { id: "5-4", title: "Remediation of findings", completed: false },
      ],
    },
    {
      id: "6",
      title: "Public Beta",
      description:
        "Public beta release with expanded feature set. This milestone opens the platform to a wider audience, incorporating feedback from the alpha phase and adding new features.",
      startDate: "May 1, 2025",
      dueDate: "Jun 15, 2025",
      completedDate: null,
      progress: 10,
      status: "in_progress",
      fundingAmount: 150000,
      tasks: [
        { id: "6-1", title: "Feature enhancements from alpha feedback", completed: true },
        { id: "6-2", title: "Scalability improvements", completed: false },
        { id: "6-3", title: "Marketing campaign preparation", completed: false },
        { id: "6-4", title: "Public launch event planning", completed: false },
      ],
    },
    {
      id: "7",
      title: "Mainnet Launch",
      description:
        "Full production launch on mainnet with complete feature set. This milestone represents the official launch of the platform, making it available to all users with all planned features implemented.",
      startDate: "Jun 20, 2025",
      dueDate: "Jun 30, 2025",
      completedDate: null,
      progress: 0,
      status: "not_started",
      fundingAmount: 200000,
      tasks: [
        { id: "7-1", title: "Final testing and quality assurance", completed: false },
        { id: "7-2", title: "Documentation completion", completed: false },
        { id: "7-3", title: "Production environment setup", completed: false },
        { id: "7-4", title: "Launch day operations", completed: false },
      ],
    },
    {
      id: "8",
      title: "Marketing Campaign",
      description:
        "Comprehensive marketing campaign to drive user acquisition. This milestone focuses on increasing awareness and adoption of the platform through various marketing channels.",
      startDate: "Jul 1, 2025",
      dueDate: "Jul 31, 2025",
      completedDate: null,
      progress: 0,
      status: "not_started",
      fundingAmount: 100000,
      tasks: [
        { id: "8-1", title: "Content creation", completed: false },
        { id: "8-2", title: "Social media campaign", completed: false },
        { id: "8-3", title: "Influencer partnerships", completed: false },
        { id: "8-4", title: "Performance tracking", completed: false },
      ],
    },
  ]

  // Filter milestones based on active tab
  const filteredMilestones = milestones.filter((milestone) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return milestone.status === "completed"
    if (activeTab === "in_progress") return milestone.status === "in_progress"
    if (activeTab === "not_started") return milestone.status === "not_started"
    return true
  })

  // Calculate milestone stats
  const totalMilestones = milestones.length
  const completedMilestones = milestones.filter((milestone) => milestone.status === "completed").length
  const inProgressMilestones = milestones.filter((milestone) => milestone.status === "in_progress").length
  const notStartedMilestones = milestones.filter((milestone) => milestone.status === "not_started").length
  const totalFunding = milestones.reduce((sum, milestone) => sum + milestone.fundingAmount, 0)
  const releasedFunding = milestones
    .filter((milestone) => milestone.status === "completed")
    .reduce((sum, milestone) => sum + milestone.fundingAmount, 0)

  // Toggle milestone expansion
  const toggleMilestoneExpansion = (id: string) => {
    if (expandedMilestone === id) {
      setExpandedMilestone(null)
    } else {
      setExpandedMilestone(id)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Milestones</h1>
            <p className="text-purple-200/70">Track and manage your project milestones</p>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1F2A3D] border-[#313E54] text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Milestone</DialogTitle>
                  <DialogDescription className="text-purple-200/70">
                    Create a new milestone for your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-white">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter milestone title"
                      className="bg-[#29305F] border-[#313E54] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-white">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Enter milestone description"
                      className="bg-[#29305F] border-[#313E54] text-white min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="text-sm font-medium text-white">
                        Start Date
                      </label>
                      <Input id="startDate" type="date" className="bg-[#29305F] border-[#313E54] text-white" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="dueDate" className="text-sm font-medium text-white">
                        Due Date
                      </label>
                      <Input id="dueDate" type="date" className="bg-[#29305F] border-[#313E54] text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="fundingAmount" className="text-sm font-medium text-white">
                      Funding Amount (USDC)
                    </label>
                    <Input
                      id="fundingAmount"
                      type="number"
                      placeholder="0"
                      className="bg-[#29305F] border-[#313E54] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium text-white">
                      Status
                    </label>
                    <Select>
                      <SelectTrigger className="bg-[#29305F] border-[#313E54] text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                        <SelectItem value="not_started">Not Started</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Create Milestone
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Milestones</CardDescription>
              <CardTitle className="text-2xl text-white">{totalMilestones}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-400" />
                {completedMilestones} completed, {inProgressMilestones} in progress
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Completion Rate</CardDescription>
              <CardTitle className="text-2xl text-white">
                {Math.round((completedMilestones / totalMilestones) * 100)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={(completedMilestones / totalMilestones) * 100}
                className="h-2 bg-purple-900/30"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Total Funding</CardDescription>
              <CardTitle className="text-2xl text-white">{totalFunding.toLocaleString()} USDC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-400" />
                {releasedFunding.toLocaleString()} USDC released
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-200/70">Next Milestone</CardDescription>
              <CardTitle className="text-2xl text-white">
                {milestones.find((m) => m.status === "in_progress")?.title || "None"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-purple-200/70 flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Due: {milestones.find((m) => m.status === "in_progress")?.dueDate || "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full md:w-auto bg-[#1F2A3D] p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="in_progress"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="not_started"
                  className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Not Started
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A8AF]" />
              <Input
                type="text"
                placeholder="Filter milestones..."
                className="pl-10 pr-4 py-2 bg-[#1F2A3D] border border-[#313E54] rounded-md text-white w-full md:w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredMilestones.map((milestone) => (
              <Card
                key={milestone.id}
                className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`
                            ${
                              milestone.status === "completed"
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : milestone.status === "in_progress"
                                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                  : "bg-purple-900/30 text-purple-400 border-purple-800"
                            }
                          `}
                        >
                          {milestone.status === "completed"
                            ? "Completed"
                            : milestone.status === "in_progress"
                              ? "In Progress"
                              : "Not Started"}
                        </Badge>
                        <div className="flex items-center text-xs text-[#A3A8AF]">
                          <Calendar className="mr-1 h-3 w-3" />
                          Due: {milestone.dueDate}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white">{milestone.title}</CardTitle>
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200/70">Progress</span>
                      <span className="text-purple-200/70">{milestone.progress}%</span>
                    </div>
                    <Progress
                      value={milestone.progress}
                      className="h-2 bg-purple-900/30"
                      indicatorClassName={`
                        ${
                          milestone.status === "completed"
                            ? "bg-green-500"
                            : milestone.status === "in_progress"
                              ? "bg-blue-500"
                              : "bg-purple-500"
                        }
                      `}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="text-purple-200/70">
                        <span className="font-medium text-white">{milestone.fundingAmount.toLocaleString()}</span> USDC
                      </div>
                      {milestone.status === "completed" ? (
                        <div className="flex items-center text-green-400">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Released
                        </div>
                      ) : milestone.status === "in_progress" ? (
                        <div className="flex items-center text-blue-400">
                          <PlayCircle className="mr-1 h-4 w-4" />
                          Pending
                        </div>
                      ) : (
                        <div className="flex items-center text-purple-200/70">
                          <Clock className="mr-1 h-4 w-4" />
                          Locked
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center text-[#A3A8AF] hover:text-white"
                      onClick={() => toggleMilestoneExpansion(milestone.id)}
                    >
                      {expandedMilestone === milestone.id ? (
                        <>
                          <ChevronUp className="mr-1 h-4 w-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="mr-1 h-4 w-4" />
                          Show More
                        </>
                      )}
                    </Button>
                  </div>

                  {expandedMilestone === milestone.id && (
                    <div className="pt-2 space-y-4">
                      <Separator className="bg-purple-800/20" />
                      <div>
                        <h4 className="font-medium text-white mb-2">Description</h4>
                        <p className="text-[#A3A8AF] text-sm">{milestone.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Tasks</h4>
                        <div className="space-y-2">
                          {milestone.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center justify-between p-2 rounded-md bg-[#1F2A3D] border border-[#313E54]"
                            >
                              <div className="flex items-center gap-2">
                                {task.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border border-[#A3A8AF]" />
                                )}
                                <span className={task.completed ? "text-white" : "text-[#A3A8AF]"}>{task.title}</span>
                              </div>
                              {!task.completed && milestone.status !== "completed" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-blue-400 hover:text-blue-300"
                                >
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-white mb-1">Start Date</h4>
                          <p className="text-[#A3A8AF]">{milestone.startDate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Due Date</h4>
                          <p className="text-[#A3A8AF]">{milestone.dueDate}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Completed Date</h4>
                          <p className="text-[#A3A8AF]">{milestone.completedDate || "Not completed"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

