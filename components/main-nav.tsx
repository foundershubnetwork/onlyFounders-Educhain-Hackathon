"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Store, Users, BookOpen, FileText, Award, User, Briefcase, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      icon: <Store className="mr-2 h-4 w-4" />,
      active: pathname === "/marketplace" || pathname.startsWith("/marketplace/"),
    },
    {
      href: "/network",
      label: "Network",
      icon: <Users className="mr-2 h-4 w-4" />,
      active: pathname === "/network" || pathname.startsWith("/network/"),
    },
    {
      href: "/resources",
      label: "Resources",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      active: pathname === "/resources" || pathname.startsWith("/resources/"),
    },
    {
      href: "/blog",
      label: "Blog",
      icon: <FileText className="mr-2 h-4 w-4" />,
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/quests",
      label: "Quests",
      icon: <Award className="mr-2 h-4 w-4" />,
      active: pathname === "/quests" || pathname.startsWith("/quests/"),
      badge: "New",
    },
  ]

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-white" : "text-muted-foreground",
            )}
          >
            {route.icon}
            {route.label}
            {route.badge && <Badge className="ml-2 bg-blue-600 text-white">{route.badge}</Badge>}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="hidden md:flex">
          <Bell className="mr-2 h-4 w-4" />
          <Badge className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs">3</Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <Link href="/investor-dashboard">Investor Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Briefcase className="mr-2 h-4 w-4" />
              <Link href="/founder-dashboard">Founder Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

