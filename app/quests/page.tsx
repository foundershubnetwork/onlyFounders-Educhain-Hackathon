"use client"

import { useEffect ,useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AppLayout } from "@/components/layout/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Award,
  BookOpen,
  Filter,
  Search,
  Star,
  Clock,
  CheckCircle,
  Lock,
  Zap,
  TrendingUp,
  Users,
  Shield,
  FileText,
  Rocket,
} from "lucide-react"

import { commonConfig } from "@/config/common"
import { buildFoundersPersonalityTraitsSurveyRequest } from "@/features/survey-request/utils"
import { buildVeridaRequestUrl } from "@/features/verida-request/utils"
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client"
import {useToast} from '../../hooks/use-toast'



const surveryRequest = buildFoundersPersonalityTraitsSurveyRequest()
const veridaRequestUrl = buildVeridaRequestUrl(
  surveryRequest,
  commonConfig.VERIDA_VAULT_BASE_URL
)




export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState("investor")
  const {user, isLoading} = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {toast} = useToast();

useEffect(() => {
  const checkLoggedIn = async () => {
    if (!isLoading && !user) {
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
    }
  }

 checkLoggedIn();
}, [isLoading, user])

  // Mock data for investor quests
  const investorQuests = [
    {
      id: "1",
      title: "Due Diligence Master",
      description: "Learn how to evaluate blockchain projects effectively",
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Due Diligence Expert" },
      ],
      progress: 0,
      steps: 5,
      completedSteps: 0,
      estimatedTime: "2 hours",
      featured: true,
    },
    {
      id: "2",
      title: "Tokenomics Analyst",
      description: "Master the art of analyzing token economics models",
      image: "/placeholder.svg?height=200&width=400",
      category: "Analysis",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Tokenomics Analyst" },
      ],
      progress: 40,
      steps: 5,
      completedSteps: 2,
      estimatedTime: "3 hours",
      featured: false,
    },
    {
      id: "3",
      title: "Smart Contract Auditor",
      description: "Learn to identify common vulnerabilities in smart contracts",
      image: "/placeholder.svg?height=200&width=400",
      category: "Security",
      difficulty: "Advanced",
      rewards: [
        { type: "XP", value: 1000 },
        { type: "Badge", value: "Security Expert" },
      ],
      progress: 0,
      steps: 7,
      completedSteps: 0,
      estimatedTime: "5 hours",
      featured: false,
      locked: true,
    },
    {
      id: "4",
      title: "DeFi Explorer",
      description: "Understand the fundamentals of decentralized finance",
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "DeFi Explorer" },
      ],
      progress: 100,
      steps: 4,
      completedSteps: 4,
      estimatedTime: "2 hours",
      featured: false,
      completed: true,
    },
    {
      id: "5",
      title: "Portfolio Strategist",
      description: "Learn to build a diversified crypto investment portfolio",
      image: "/placeholder.svg?height=200&width=400",
      category: "Strategy",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Portfolio Strategist" },
      ],
      progress: 60,
      steps: 5,
      completedSteps: 3,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "6",
      title: "Community Evaluator",
      description: "Learn to assess the strength and engagement of project communities",
      image: "/placeholder.svg?height=200&width=400",
      category: "Analysis",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Community Analyst" },
      ],
      progress: 20,
      steps: 5,
      completedSteps: 1,
      estimatedTime: "2 hours",
      featured: false,
    },
  ]

  // Mock data for founder quests
  const founderQuests = [
    {
      id: "1",
      title: "Perfect Pitch",
      description: "Create a compelling pitch deck for your blockchain project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Marketing",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Pitch Master" },
      ],
      progress: 80,
      steps: 5,
      completedSteps: 4,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "2",
      title: "Tokenomics Designer",
      description: "Design a sustainable token economics model for your project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Economics",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Tokenomics Expert" },
      ],
      progress: 0,
      steps: 6,
      completedSteps: 0,
      estimatedTime: "4 hours",
      featured: false,
    },
    {
      id: "3",
      title: "Community Builder",
      description: "Learn strategies to build and engage your project community",
      image: "/placeholder.svg?height=200&width=400",
      category: "Community",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "Community Leader" },
      ],
      progress: 40,
      steps: 5,
      completedSteps: 2,
      estimatedTime: "3 hours",
      featured: true,
    },
    {
      id: "4",
      title: "Security First",
      description: "Implement security best practices for your blockchain project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Security",
      difficulty: "Advanced",
      rewards: [
        { type: "XP", value: 1000 },
        { type: "Badge", value: "Security Champion" },
      ],
      progress: 0,
      steps: 7,
      completedSteps: 0,
      estimatedTime: "5 hours",
      featured: false,
      locked: true,
    },
    {
      id: "5",
      title: "Regulatory Navigator",
      description: "Understand the regulatory landscape for blockchain projects",
      image: "/placeholder.svg?height=200&width=400",
      category: "Legal",
      difficulty: "Intermediate",
      rewards: [
        { type: "XP", value: 750 },
        { type: "Badge", value: "Compliance Expert" },
      ],
      progress: 0,
      steps: 6,
      completedSteps: 0,
      estimatedTime: "4 hours",
      featured: false,
    },
    {
      id: "6",
      title: "Investor Relations",
      description: "Learn how to effectively communicate with investors post-funding",
      image: "/placeholder.svg?height=200&width=400",
      category: "Communication",
      difficulty: "Beginner",
      rewards: [
        { type: "XP", value: 500 },
        { type: "Badge", value: "IR Specialist" },
      ],
      progress: 100,
      steps: 4,
      completedSteps: 4,
      estimatedTime: "2 hours",
      featured: false,
      completed: true,
    },
  ]

  const getQuestStatusBadge = (quest: any) => {
    if (quest.locked) {
      return (
        <Badge className="bg-gray-700 text-gray-300">
          <Lock className="mr-1 h-3 w-3" />
          Locked
        </Badge>
      )
    }

    if (quest.completed) {
      return (
        <Badge className="bg-green-600 text-white">
          <CheckCircle className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      )
    }

    if (quest.progress > 0 && quest.progress < 100) {
      return (
        <Badge className="bg-blue-600 text-white">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      )
    }

    return (
      <Badge className="bg-purple-600 text-white">
        <Zap className="mr-1 h-3 w-3" />
        New
      </Badge>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600"
      case "Intermediate":
        return "bg-blue-600"
      case "Advanced":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Education":
      case "Economics":
        return <BookOpen className="h-4 w-4" />
      case "Analysis":
      case "Strategy":
        return <TrendingUp className="h-4 w-4" />
      case "Security":
        return <Shield className="h-4 w-4" />
      case "Community":
      case "Communication":
        return <Users className="h-4 w-4" />
      case "Marketing":
        return <TrendingUp className="h-4 w-4" />
      case "Legal":
        return <FileText className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const activeQuests = activeTab === "investor" ? investorQuests : founderQuests
  const featuredQuests = activeQuests.filter((quest) => quest.featured)

  return (
    <AppLayout>
      <div className="container mx-0 md:mx-auto py-8 space-y-8">

    {/* heading */}
      <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl text-[#00DDFF] font-bold">Global Founder Survey</h1>
          <p className="text-gray-400 mt-2">Join the Founders Community, make an impact, and collaborate, while ensuring your data remains private and secure.</p>
      </div>

      <div className="w-full bg-gradient-radial from-[#044D55] to-black text-white rounded-lg overflow-hidden flex flex-col md:flex-row font-poppins">
      {/* Left content - adjusted with wider text container */}
      
      <div className="py-10 pl-0 md:pl-10 pr-6 md:pr-10 flex-grow flex flex-col justify-center">
        <div className="max-w-[800px] mx-auto md:mx-0">
          <div className="inline-flex items-center gap-1.5 bg-black/30 border border-[#004a45] rounded-full px-3 py-1.5 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>Featured</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Global Founders Survey</h1>

          <p className="text-lg text-gray-300 mb-8">
            Discover insights into your personality as a founder! This short survey helps us understand how your traits
            shape your business decisions.
          </p>

          <Button
            // onClick={() => {
            //   if(isLoggedIn){
            //     window.open(veridaRequestUrl.toString(), "_blank")
            //   }
            //   else{
            //           toast({
            //             title: "Message",
            //             description: "Please login to start the survey",
            //             variant: "destructive",
            //           })
            //   }
            // }}   
          
            onClick={() => {
              window.open(veridaRequestUrl.toString(), "_blank")
            }}

            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-[#00DDFF] hover:bg-[#33E5FF] text-black font-medium px-6 py-3 rounded-md transition-colors"
          >
            Start Survey Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Button>
        </div>
      </div>

      {/* Right image - positioned at extreme right */}
      <div className="flex-shrink-0">
        <div className="w-[800px] h-[500px] relative">
          <Image src="/founders-verida.png" alt="Founders x Verida Network" fill className="hidden md:flex object-contain" priority />
          <Image src="/founders-verida-mobile.png" alt="Founders x Verida Network" width={350} height={800} className="md:hidden lg:hidden object-contain" priority />
        </div>
      </div>
    </div>

        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Quests</h1>
            <p className="text-gray-400">Complete quests to learn, grow, and earn rewards</p>
          </div>
        </div> */}

        {/* <Tabs defaultValue="investor" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 p-1">
            <TabsTrigger
              value="investor"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Investor Quests
            </TabsTrigger>
            <TabsTrigger
              value="founder"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Founder Quests
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-8">
            {featuredQuests.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Featured Quests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredQuests.map((quest) => (
                    <Card
                      key={quest.id}
                      className={`bg-gray-900 border-gray-800 overflow-hidden ${quest.locked ? "opacity-70" : "hover:border-blue-600"} transition-colors`}
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={quest.image || "/placeholder.svg"}
                          alt={quest.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        <div className="absolute top-2 right-2 flex gap-2">{getQuestStatusBadge(quest)}</div>
                        <div className="absolute bottom-2 left-2 flex gap-2">
                          <Badge className={getDifficultyColor(quest.difficulty)}>{quest.difficulty}</Badge>
                          <Badge className="bg-gray-800">
                            {getCategoryIcon(quest.category)}
                            <span className="ml-1">{quest.category}</span>
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl text-white">{quest.title}</CardTitle>
                        <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-400">
                            <Clock className="mr-1 h-4 w-4" />
                            {quest.estimatedTime}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            {quest.completedSteps}/{quest.steps} steps
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-gray-400">{quest.progress}%</span>
                          </div>
                          <Progress
                            value={quest.progress}
                            className="h-2 bg-gray-800"
                            indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>

                        <div>
                          <div className="text-sm font-medium text-white mb-2">Rewards:</div>
                          <div className="flex flex-wrap gap-2">
                            {quest.rewards.map((reward, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-800/50 border-gray-700">
                                {reward.type === "XP" ? (
                                  <Zap className="mr-1 h-3 w-3 text-amber-400" />
                                ) : (
                                  <Award className="mr-1 h-3 w-3 text-blue-400" />
                                )}
                                {reward.type === "XP" ? `${reward.value} XP` : reward.value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-gray-800 pt-4">
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          disabled={quest.locked}
                        >
                          <Link href={`/quests/${quest.id}`}>
                            {quest.progress > 0 && quest.progress < 100
                              ? "Continue Quest"
                              : quest.completed
                                ? "View Completed Quest"
                                : "Start Quest"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-white">All Quests</h2>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input placeholder="Search quests..." className="pl-9 bg-gray-900 border-gray-700 text-white" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white">
                      <SelectItem value="all">All Quests</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeQuests.map((quest) => (
                  <Card
                    key={quest.id}
                    className={`bg-gray-900 border-gray-800 overflow-hidden ${quest.locked ? "opacity-70" : "hover:border-blue-600"} transition-colors`}
                  >
                    <div className="relative h-40 w-full">
                      <Image src={quest.image || "/placeholder.svg"} alt={quest.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute top-2 right-2">{getQuestStatusBadge(quest)}</div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-white">{quest.title}</CardTitle>
                          <CardDescription className="text-gray-400">{quest.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(quest.difficulty)}>{quest.difficulty}</Badge>
                        <Badge className="bg-gray-800">
                          {getCategoryIcon(quest.category)}
                          <span className="ml-1">{quest.category}</span>
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-400">{quest.progress}%</span>
                        </div>
                        <Progress
                          value={quest.progress}
                          className="h-2 bg-gray-800"
                          indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>

                      <div className="flex justify-between text-xs text-gray-400">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {quest.estimatedTime}
                        </div>
                        <div className="flex items-center">
                          <Award className="mr-1 h-3 w-3 text-blue-400" />
                          {quest.rewards.reduce(
                            (total, reward) => (reward.type === "XP" ? total + reward.value : total),
                            0,
                          )}{" "}
                          XP
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-800 pt-4">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        disabled={quest.locked}
                      >
                        <Link href={`/quests/${quest.id}`}>
                          {quest.progress > 0 && quest.progress < 100 ? "Continue" : quest.completed ? "View" : "Start"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs> */}
      </div>
    </AppLayout>
  )
}

