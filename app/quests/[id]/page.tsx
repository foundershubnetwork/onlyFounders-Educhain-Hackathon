"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Lock,
  Play,
  Star,
  Video,
  Zap,
} from "lucide-react"
import { Circle } from "lucide-react" // Import Circle icon

export default function QuestDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock quest data
  const quest = {
    id: params.id,
    title: "Due Diligence Master",
    description:
      "Learn how to evaluate blockchain projects effectively and make informed investment decisions. This quest will teach you the essential skills needed to perform thorough due diligence on Web3 projects.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Education",
    difficulty: "Beginner",
    rewards: [
      { type: "XP", value: 500 },
      { type: "Badge", value: "Due Diligence Expert" },
      { type: "Certificate", value: "Due Diligence Certification" },
    ],
    progress: 40,
    steps: 5,
    completedSteps: 2,
    estimatedTime: "2 hours",
    creator: {
      name: "Optimus AI Education Team",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    overview:
      "This quest is designed to help investors develop a systematic approach to evaluating blockchain projects. You'll learn how to assess team credentials, tokenomics, technical architecture, and market potential. By the end of this quest, you'll have a comprehensive framework for conducting due diligence on any Web3 project.",
    learningOutcomes: [
      "Develop a structured framework for project evaluation",
      "Learn to assess team credentials and experience",
      "Understand how to analyze tokenomics models",
      "Identify red flags and potential risks in projects",
      "Create a due diligence checklist for future investments",
    ],
    modules: [
      {
        id: "1",
        title: "Introduction to Due Diligence",
        description: "Learn the fundamentals of due diligence and why it's crucial for Web3 investors",
        duration: "20 min",
        type: "Video",
        completed: true,
        locked: false,
      },
      {
        id: "2",
        title: "Team Assessment",
        description: "How to evaluate project teams, their experience, and track record",
        duration: "25 min",
        type: "Interactive",
        completed: true,
        locked: false,
      },
      {
        id: "3",
        title: "Tokenomics Analysis",
        description: "Understanding token distribution, utility, and economic models",
        duration: "30 min",
        type: "Interactive",
        completed: false,
        locked: false,
        current: true,
      },
      {
        id: "4",
        title: "Technical Evaluation",
        description: "Assessing the technical architecture and code quality",
        duration: "25 min",
        type: "Reading",
        completed: false,
        locked: true,
      },
      {
        id: "5",
        title: "Market Analysis & Final Assessment",
        description: "Evaluating market fit, competition, and creating your final assessment",
        duration: "20 min",
        type: "Quiz",
        completed: false,
        locked: true,
      },
    ],
    resources: [
      {
        title: "Due Diligence Checklist Template",
        description: "A comprehensive template for evaluating blockchain projects",
        type: "PDF",
        link: "#",
      },
      {
        title: "Red Flags in Crypto Projects",
        description: "Common warning signs to watch for when evaluating projects",
        type: "Article",
        link: "#",
      },
      {
        title: "Tokenomics Evaluation Framework",
        description: "A framework for analyzing token economics models",
        type: "Spreadsheet",
        link: "#",
      },
    ],
  }

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-5 w-5 text-blue-400" />
      case "Interactive":
        return <Play className="h-5 w-5 text-green-400" />
      case "Reading":
        return <BookOpen className="h-5 w-5 text-amber-400" />
      case "Quiz":
        return <FileText className="h-5 w-5 text-purple-400" />
      default:
        return <Star className="h-5 w-5 text-gray-400" />
    }
  }

  const getModuleStatusIcon = (module: any) => {
    if (module.completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }

    if (module.locked) {
      return <Lock className="h-5 w-5 text-gray-500" />
    }

    if (module.current) {
      return <Play className="h-5 w-5 text-blue-500" />
    }

    return <Circle className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Link href="/quests">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-gray-400">Back to Quests</span>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[200px] md:h-[300px]">
        <Image src={quest.image || "/placeholder.svg"} alt={quest.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className="bg-blue-600">{quest.category}</Badge>
            <Badge className="bg-green-600">{quest.difficulty}</Badge>
            <Badge className="bg-amber-600">
              <Clock className="mr-1 h-3 w-3" />
              {quest.estimatedTime}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-white">{quest.title}</h1>
          <p className="text-gray-300 mt-1">{quest.description}</p>
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
                value="modules"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Modules
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
              >
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Quest Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">{quest.overview}</p>

                  <h3 className="text-lg font-medium text-white mb-3">Learning Outcomes</h3>
                  <ul className="space-y-2">
                    {quest.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Created By</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative">
                      <Image
                        src={quest.creator.avatar || "/placeholder.svg"}
                        alt={quest.creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{quest.creator.name}</h3>
                      <p className="text-gray-400">
                        Educational content creators specializing in blockchain technology
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Quest Modules</CardTitle>
                  <CardDescription className="text-gray-400">Complete all modules to earn your rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quest.modules.map((module, index) => (
                      <div key={module.id} className="relative">
                        {index < quest.modules.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-800 z-0"></div>
                        )}

                        <div
                          className={`relative z-10 flex items-start gap-4 p-4 rounded-lg border ${
                            module.current
                              ? "border-blue-600 bg-blue-900/10"
                              : module.completed
                                ? "border-green-600 bg-green-900/10"
                                : module.locked
                                  ? "border-gray-800 bg-gray-800/50 opacity-60"
                                  : "border-gray-800 bg-gray-800/50"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                              module.current
                                ? "bg-blue-900/50 text-blue-400"
                                : module.completed
                                  ? "bg-green-900/50 text-green-400"
                                  : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {getModuleStatusIcon(module)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-white">{module.title}</h3>
                              <Badge
                                className={`${
                                  module.type === "Video"
                                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                    : module.type === "Interactive"
                                      ? "bg-green-900/30 text-green-400 border-green-800"
                                      : module.type === "Reading"
                                        ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                        : "bg-purple-900/30 text-purple-400 border-purple-800"
                                }`}
                              >
                                {getModuleIcon(module.type)}
                                <span className="ml-1">{module.type}</span>
                              </Badge>
                            </div>
                            <p className="text-gray-300 mt-1">{module.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                {module.duration}
                              </div>

                              <Button
                                className={`${
                                  module.current
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : module.completed
                                      ? "bg-gray-800 hover:bg-gray-700"
                                      : "bg-gray-800 hover:bg-gray-700"
                                } text-white`}
                                disabled={module.locked}
                              >
                                {module.completed ? "Review" : module.current ? "Continue" : "Start"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Additional Resources</CardTitle>
                  <CardDescription className="text-gray-400">
                    Supplementary materials to enhance your learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quest.resources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-800/50"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                          {resource.type === "PDF" ? (
                            <FileText className="h-5 w-5 text-red-400" />
                          ) : resource.type === "Article" ? (
                            <BookOpen className="h-5 w-5 text-blue-400" />
                          ) : (
                            <FileText className="h-5 w-5 text-green-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white">{resource.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{resource.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                              {resource.type}
                            </Badge>

                            <Button asChild variant="outline" size="sm" className="text-gray-300 border-gray-700">
                              <Link href={resource.link}>
                                {resource.type === "PDF" ? (
                                  <>
                                    <Download className="mr-1 h-4 w-4" />
                                    Download
                                  </>
                                ) : (
                                  <>
                                    <ExternalLink className="mr-1 h-4 w-4" />
                                    View
                                  </>
                                )}
                              </Link>
                            </Button>
                          </div>
                        </div>
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
              <CardTitle className="text-xl text-white">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-white font-medium">
                      {quest.completedSteps}/{quest.steps} modules
                    </span>
                  </div>
                  <Progress
                    value={quest.progress}
                    className="h-2 bg-gray-700"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{quest.progress}% complete</span>
                    <span className="text-amber-400">{quest.estimatedTime} total</span>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Rewards</h3>

                <div className="space-y-3">
                  {quest.rewards.map((reward, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-800">
                      {reward.type === "XP" ? (
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center mr-3">
                            <Zap className="h-5 w-5 text-amber-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{reward.value} XP</div>
                            <div className="text-xs text-gray-400">Experience Points</div>
                          </div>
                        </div>
                      ) : reward.type === "Badge" ? (
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                            <Award className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{reward.value}</div>
                            <div className="text-xs text-gray-400">Profile Badge</div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{reward.value}</div>
                            <div className="text-xs text-gray-400">Shareable Certificate</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {quest.progress > 0 ? "Continue Quest" : "Start Quest"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

