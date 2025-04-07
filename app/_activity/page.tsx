"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Users, FileText, Settings, Wallet, Star, CheckCircle } from "lucide-react"

export default function ActivityPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.push("/profile")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Activity History</h1>
          <p className="text-gray-400">Track your recent actions and interactions on Optimus AI</p>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-gray-400 text-sm font-medium">March 2025</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Joined DecentraVault investor pool</p>
                          <p className="text-sm text-gray-400 mt-1">March 15, 2025 at 2:30 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You joined the investor pool for DecentraVault with a commitment of 500 USDC through the DCA
                            investment model.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Updated MetaCanvas milestone</p>
                          <p className="text-sm text-gray-400 mt-1">March 10, 2025 at 11:15 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You updated the "Beta Launch" milestone for MetaCanvas project, marking it as 75% complete.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Wallet className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Invested in MetaCanvas</p>
                          <p className="text-sm text-gray-400 mt-1">March 10, 2025 at 10:45 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You invested 750 USDC in MetaCanvas through the DCA investment model.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                          <Star className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Added DecentraVault to watchlist</p>
                          <p className="text-sm text-gray-400 mt-1">March 8, 2025 at 3:20 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You added DecentraVault to your watchlist to track its progress and updates.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Completed Quest: "Web3 Fundamentals"</p>
                          <p className="text-sm text-gray-400 mt-1">March 7, 2025 at 5:45 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You completed the "Web3 Fundamentals" quest and earned 50 XP.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Settings className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Completed profile setup</p>
                          <p className="text-sm text-gray-400 mt-1">March 5, 2025 at 9:10 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You completed your profile setup and connected your MetaMask wallet.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Investment Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-gray-400 text-sm font-medium">March 2025</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Joined DecentraVault investor pool</p>
                          <p className="text-sm text-gray-400 mt-1">March 15, 2025 at 2:30 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You joined the investor pool for DecentraVault with a commitment of 500 USDC through the DCA
                            investment model.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Wallet className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Invested in MetaCanvas</p>
                          <p className="text-sm text-gray-400 mt-1">March 10, 2025 at 10:45 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You invested 750 USDC in MetaCanvas through the DCA investment model.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-gray-400 text-sm font-medium">March 2025</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Updated MetaCanvas milestone</p>
                          <p className="text-sm text-gray-400 mt-1">March 10, 2025 at 11:15 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You updated the "Beta Launch" milestone for MetaCanvas project, marking it as 75% complete.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                          <Star className="h-5 w-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Added DecentraVault to watchlist</p>
                          <p className="text-sm text-gray-400 mt-1">March 8, 2025 at 3:20 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You added DecentraVault to your watchlist to track its progress and updates.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platform">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-gray-400 text-sm font-medium">March 2025</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 pb-4 border-b border-gray-800">
                        <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Completed Quest: "Web3 Fundamentals"</p>
                          <p className="text-sm text-gray-400 mt-1">March 7, 2025 at 5:45 PM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You completed the "Web3 Fundamentals" quest and earned 50 XP.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center flex-shrink-0">
                          <Settings className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Completed profile setup</p>
                          <p className="text-sm text-gray-400 mt-1">March 5, 2025 at 9:10 AM</p>
                          <p className="text-sm text-gray-300 mt-2">
                            You completed your profile setup and connected your MetaMask wallet.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

