import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Settings, Users, Building, FileText, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Optimus AI",
  description: "Admin dashboard for Optimus AI platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-[#A3A8AF]">Manage and monitor the Optimus AI platform</p>
      </div>

      <Tabs defaultValue="metrics" className="space-y-8">
        <div className="bg-[#1F2A3D] p-1 rounded-lg overflow-x-auto">
          <TabsList className="bg-transparent h-auto p-0 flex w-full">
            <TabsTrigger
              asChild
              value="overview"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin">
                <BarChart className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="metrics"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/metrics-dashboard">
                <BarChart className="mr-2 h-4 w-4" />
                Metrics Dashboard
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="users"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="projects"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/projects">
                <Building className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="content"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/content">
                <FileText className="mr-2 h-4 w-4" />
                Content
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="ai"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/ai-management">
                <Zap className="mr-2 h-4 w-4" />
                AI Management
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="security"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/security">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </Link>
            </TabsTrigger>
            <TabsTrigger
              asChild
              value="settings"
              className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white rounded-md py-2"
            >
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>

        <div>{children}</div>
      </Tabs>
    </div>
  )
}

