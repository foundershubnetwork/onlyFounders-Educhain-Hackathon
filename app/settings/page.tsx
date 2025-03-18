"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.push("/profile")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Profile
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your account preferences, notifications, and security</p>
        </div>

        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="w-full h-10 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                    >
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (Central European Time)</option>
                      <option>UTC+8 (China Standard Time)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
                    defaultValue="Web3 enthusiast and early-stage investor. Passionate about decentralized technologies and supporting innovative founders."
                  />
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-400">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Investment Opportunities</h4>
                      <p className="text-sm text-gray-400">Get notified about new projects matching your criteria</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Milestone Updates</h4>
                      <p className="text-sm text-gray-400">Receive updates when projects reach milestones</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Funding Events</h4>
                      <p className="text-sm text-gray-400">Get notified about funding rounds and events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Platform Updates</h4>
                      <p className="text-sm text-gray-400">Receive news about Optimus AI features and updates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account security and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallets">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Connected Wallets</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your blockchain wallets and connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-800 rounded-lg bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">MetaMask</h4>
                          <p className="text-sm text-gray-400">0x7F5E...8A3D</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800">
                    Connect Another Wallet
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-medium">Transaction History</h4>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-800 rounded-lg bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">DecentraVault Investment</p>
                          <p className="text-sm text-gray-400">March 15, 2025</p>
                        </div>
                        <p className="text-green-400">+500 USDC</p>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-800 rounded-lg bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">MetaCanvas Investment</p>
                          <p className="text-sm text-gray-400">March 10, 2025</p>
                        </div>
                        <p className="text-green-400">+750 USDC</p>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-800 rounded-lg bg-gray-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">Platform Deposit</p>
                          <p className="text-sm text-gray-400">March 5, 2025</p>
                        </div>
                        <p className="text-red-400">-2000 USDC</p>
                      </div>
                    </div>
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

