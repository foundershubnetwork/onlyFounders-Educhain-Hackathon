"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Brain, Home, Menu, Search, Users, Wallet, BarChart3, Award } from "lucide-react"
import { ConnectWallet } from "./connect-wallet"
import { Logo } from "./ui/logo"

export function Navigation() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <div className="mr-4 md:mr-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 bg-[#202C41] border-[#313E54] w-[280px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-[#313E54] flex items-center">
              <Logo className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl text-white">Optimus AI</span>
            </div>
            <MobileNav pathname={pathname} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/projects") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Projects
        </Link>
        <Link
          href="/investor-dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/investor-dashboard") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Investor Dashboard
        </Link>
        <Link
          href="/founder-dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/founder-dashboard") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Founder Dashboard
        </Link>
        <Link
          href="/resources/grants"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/resources/grants") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Grants
        </Link>
        <Link
          href="/quests"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/quests") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Quests
        </Link>
        <Link
          href="/resources"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/resources") && !pathname?.startsWith("/resources/grants")
              ? "text-white font-medium"
              : "text-[#A3A8AF]",
          )}
        >
          Resources
        </Link>
        <Link
          href="/admin"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/admin") ? "text-white font-medium" : "text-[#A3A8AF]",
          )}
        >
          Admin
        </Link>
      </nav>
    </div>
  )
}

function MobileNav({ pathname, setOpen }: { pathname: string; setOpen: (open: boolean) => void }) {
  return (
    <ScrollArea className="flex-1 py-4">
      <div className="flex flex-col gap-1 px-2">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname === "/" ? "bg-[#29305F] text-white" : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        <Link
          href="/projects"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/projects") ? "bg-[#29305F] text-white" : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Search className="h-5 w-5" />
          Projects
        </Link>
        <Link
          href="/investor-dashboard"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/investor-dashboard")
              ? "bg-[#29305F] text-white"
              : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Wallet className="h-5 w-5" />
          Investor Dashboard
        </Link>
        <Link
          href="/founder-dashboard"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/founder-dashboard")
              ? "bg-[#29305F] text-white"
              : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Users className="h-5 w-5" />
          Founder Dashboard
        </Link>
        <Link
          href="/resources/grants"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/resources/grants") ? "bg-[#29305F] text-white" : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Award className="h-5 w-5" />
          Grants
        </Link>
        <Link
          href="/quests"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/quests") ? "bg-[#29305F] text-white" : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <BookOpen className="h-5 w-5" />
          Quests
        </Link>
        <Link
          href="/resources"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/resources") && !pathname?.startsWith("/resources/grants")
              ? "bg-[#29305F] text-white"
              : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <Brain className="h-5 w-5" />
          Resources
        </Link>
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 px-3 py-3 rounded-md",
            pathname?.startsWith("/admin") ? "bg-[#29305F] text-white" : "text-[#A3A8AF] hover:bg-[#1F2A3D]",
          )}
          onClick={() => setOpen(false)}
        >
          <BarChart3 className="h-5 w-5" />
          Admin
        </Link>

        <div className="mt-4 px-3 py-3">
          <ConnectWallet />
        </div>
      </div>
    </ScrollArea>
  )
}

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className="hidden font-bold sm:inline-block text-xl text-white">Optimus AI</span>
      </Link>
      <Navigation />
    </div>
  )
}

