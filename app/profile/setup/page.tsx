"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Building, User, Wallet } from "lucide-react"

export default function ProfileSetupPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedType === "founder") {
      router.push("/profile/setup/founder")
    } else if (selectedType === "investor") {
      router.push("/profile/setup/investor")
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to Optimus AI</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete your profile to get started with our Web3 fundraising platform
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Profile Setup</span>
                <span className="text-white font-medium">Step 1 of 3</span>
              </div>
              <Progress
                value={33}
                className="h-2 bg-gray-700"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Choose Your Role</CardTitle>
                <CardDescription className="text-gray-400">Select how you want to use Optimus AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "founder"
                      ? "border-blue-600 bg-blue-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("founder")}
                >
                  <div className="mr-4 p-2 rounded-full bg-blue-900/30">
                    <Building className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">I'm a Founder</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Raise funds for your Web3 project, connect with investors, and grow your startup
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "investor"
                      ? "border-purple-600 bg-purple-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("investor")}
                >
                  <div className="mr-4 p-2 rounded-full bg-purple-900/30">
                    <Wallet className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">I'm an Investor</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Discover promising Web3 projects, invest in blockchain startups, and track your portfolio
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedType === "both"
                      ? "border-amber-600 bg-amber-950/20"
                      : "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                  }`}
                  onClick={() => setSelectedType("both")}
                >
                  <div className="mr-4 p-2 rounded-full bg-amber-900/30">
                    <User className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">I'm Both</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Access both founder and investor features to raise funds and invest in projects
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleContinue}
                  disabled={!selectedType}
                  className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have a profile?{" "}
                <Link href="/login" className="text-blue-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

