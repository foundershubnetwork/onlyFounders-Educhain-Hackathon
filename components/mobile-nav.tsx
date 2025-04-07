"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Home,
  Search,
  Wallet,
  Users,
  Brain,
  BarChart3,
  Building,
  Rocket,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: Search },
    { href: "/investor-dashboard", label: "Investor Dashboard", icon: Wallet },
    { href: "/founder-dashboard", label: "Founder Dashboard", icon: Building },
    { href: "/quests", label: "Quests", icon: Rocket },
    { href: "/network", label: "Network", icon: Users },
    { href: "/resources", label: "Resources", icon: Brain },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/admin", label: "Admin", icon: BarChart3 },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-[#1F2A3D]">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-[#202C41] border-[#313E54]">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center gap-3 border-b border-[#313E54]">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#29305F]">JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-white">John Doe</div>
              <div className="text-xs text-[#A3A8AF]">john.doe@example.com</div>
            </div>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 text-sm rounded-md",
                    pathname === item.href || pathname?.startsWith(item.href + "/")
                      ? "bg-[#29305F] text-white"
                      : "text-[#A3A8AF] hover:bg-[#1F2A3D] hover:text-white",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <Separator className="my-4 bg-[#313E54]" />

            <div className="grid gap-1 px-2">
              <Link
                href="/messages"
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md text-[#A3A8AF] hover:bg-[#1F2A3D] hover:text-white"
                onClick={() => setOpen(false)}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-3 text-sm rounded-md text-[#A3A8AF] hover:bg-[#1F2A3D] hover:text-white"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </div>
          </div>

          <div className="p-4 border-t border-[#313E54]">
            <Button
              variant="outline"
              className="w-full justify-start text-[#A3A8AF] border-[#313E54] hover:bg-[#1F2A3D] hover:text-white"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

