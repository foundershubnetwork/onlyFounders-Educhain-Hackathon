"use client"

import { Separator } from "@/components/ui/separator"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Marketplace",
    href: "/marketplace",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "About",
    href: "/about",
  },
]

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Horizontal Navigation for Main Page */}
      <header className="sticky top-0 z-40 w-full border-b border-purple-800/20 bg-gradient-to-r from-indigo-950/90 to-purple-900/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <span className="font-bold text-white text-xl">Optimus AI</span>
          </Link>

          {/* Desktop Navigation - Horizontal */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === item.href ? "text-white" : "text-purple-200/70",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/investor-dashboard">
              <Button
                variant="ghost"
                className="hidden md:flex text-purple-200/70 hover:text-white hover:bg-purple-900/30"
              >
                Investor Dashboard
              </Button>
            </Link>
            <Link href="/founder-dashboard">
              <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Founder Dashboard
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden h-10 w-10 p-0 hover:bg-purple-900/30"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6 text-purple-400" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 bg-gradient-to-b from-indigo-950/95 to-purple-900/95 p-0 border-purple-800/20"
              >
                <div className="flex h-14 items-center justify-between px-4 border-b border-purple-800/20">
                  <span className="font-semibold text-white">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                    <X className="h-5 w-5 text-purple-400" />
                  </Button>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-white p-2",
                        pathname === item.href ? "text-white bg-purple-900/30" : "text-purple-200/70",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Separator className="my-2 bg-purple-800/20" />
                  <Link href="/investor-dashboard" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-purple-200/70 hover:text-white hover:bg-purple-900/30"
                    >
                      Investor Dashboard
                    </Button>
                  </Link>
                  <Link href="/founder-dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Founder Dashboard
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-indigo-950 to-purple-900">{children}</main>
    </div>
  )
}

