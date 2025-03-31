"use client"

import { type ReactNode, useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Footer } from "@/components/footer"
import {
  Bell,
  BookOpen,
  Building,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Store,
  Trophy,
  Users,
  Wallet,
  Info,
} from "lucide-react"

import { useUser } from "@auth0/nextjs-auth0/client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import AnimatedButton from "../animatedButton"

interface AppLayoutProps {
  children: ReactNode
  showHero?: boolean
}

export function AppLayout({ className, children, showHero = false }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [authReady, setAuthReady] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const requestSent = useRef(false)
  const { user, isLoading } = useUser()
  const { address, isConnected } = useAccount()
  const toast = useToast()
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>(false)

  // Add the profile navigation handler 
  const handleProfileNavigation = async () => {
    if (!user) return

    try {
      setIsProfileLoading(true)
      const userID = user.sub?.substring(14)

      const response = await fetch("https://onlyfounders.azurewebsites.net/api/profile/get-onboarding-status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          user_id: userID || "",
        },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Route based on profile status
        if(data.role === "Investor"){
          router.push("/profile-page/investor")
        }
        else if(data.role === "Founder"){
          router.push("/profile-page/founder")
        }
        else if(data.role === "ServiceProvider"){
          router.push("/profile-page/service-provider")
        }
    } catch (error) {
      console.error("Error checking profile status:", error)
      // Default to profile page on error
      router.push("/profile")
    } finally {
      setIsProfileLoading(false)
    }
  }

  // Set auth ready state once loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setAuthReady(true)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [isLoading])
  

  //sending wallet address to the backend after user connected wallet.
  useEffect(() => {
    const sendWalletAddress = async () => {
      if (user && isConnected && address) {
        try {
          const userID = user.sub?.substring(14)

          const response = await axios.post(
            "https://onlyfounders.azurewebsites.net/api/profile/add-walletAddress",
            { walletAddress: address },
            {
              headers: {
                "Content-Type": "application/json",
                user_id: userID,
              },
            },
          )

          console.log("Address sent successfully", response.data)
        } catch (error) {
          console.error("Error sending address:", error)
        }
      }
    }

    sendWalletAddress()
  }, [user, isConnected, address])


  //sending user data to the backend after user registered.
  useEffect(() => {
    if (!isLoading && user && !isSent && !requestSent.current) {
      requestSent.current = true

      const sendUserData = async () => {
        try {
          const trimmedUserId = user.sub?.substring(14)
          if (!trimmedUserId || !user.email) {
            console.error("Invalid user data, skipping API call.")
            return
          }

          setIsSent(true)

          const response = await fetch("https://onlyfounders.azurewebsites.net/api/auth/register-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userInput: {
                username: user.given_name || "Unknown User",
                email: user.email,
                user_id: trimmedUserId,
                walletAddress: " ",
              },
            }),
          })

          if (response.ok) {
            console.log("✅ User data sent successfully!")
          } else {
            console.error("❌ Failed to send user data. Status:", response.status)
            const errorData = await response.json().catch(() => null)
            console.error("Error details:", errorData || "No error message from server")
          }
        } catch (error) {
          console.error("❌ Error sending user data:", error)
        }
      }

      sendUserData()
    }
  }, [user, isLoading, isSent])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/network", label: "Network", icon: Users },
    { href: "/resources", label: "Resources", icon: BookOpen },
    // { href: "/", label: "Blog", icon: FileText },
    { href: "/quests", label: "Quests", icon: Trophy },
  ]

  const dashboardNavItems = [
    { href: "/", label: "Investor Dashboard", icon: Wallet },
    { href: "/", label: "Founder Dashboard", icon: Building },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Render auth-related UI elements based on loading state
  const renderAuthUI = () => {
    // If auth is still loading, show skeleton placeholders
    if (!authReady) {
      return (
        <>
          <div className="hidden md:flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
          <Skeleton className="hidden md:block h-9 w-36 rounded-md" />
        </>
      )
    }

    // Auth is ready, show the appropriate UI based on user state
    return (
      <>
        <div className="hidden md:flex items-center gap-2">
          {/* {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative border-gray-700 text-gray-400 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <div className="max-h-80 overflow-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="py-3 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">New Investment Opportunity</p>
                          <p className="text-xs text-gray-400">
                            Project "MetaCanvas" matches your investment preferences
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="justify-center text-blue-400 cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )} */}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-700 text-white gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={(user as any).picture} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span>{(user as any).given_name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault()
                    handleProfileNavigation()
                  }}
                >
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Profile
                    {isProfileLoading && <span className="ml-2 animate-spin">⟳</span>}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/">
                    <Wallet className="mr-2 h-4 w-4" />
                    Investor Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/">
                    <Building className="mr-2 h-4 w-4" />
                    Founder Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <a href="/api/auth/logout">
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="/early-access">
              <AnimatedButton title="Early Access" />
            </a>
          )}
        </div>

        {user ? <ConnectButton /> : null}
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80",
          scrolled
            ? "bg-gray-900/95"
            : pathname === "/" && !scrolled
              ? "bg-transparent border-transparent"
              : "bg-gray-900/95",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2 pr-5">
              <Image src="/onlyFounder_logo.svg" alt="Optimus AI Logo" width={160} height={60} className="rounded-md" />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {/* {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))} */}

            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent" asChild>
                    <a
                      href="/about"
                      className="py-2.5 px-3 rounded-md hover:cursor-pointer hover:bg-gray-800"
                    >
                      About
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Marketplace</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <span className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/50 to-purple-500/50 p-6 no-underline outline-none focus:shadow-md"
                            href="/marketplace"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Startup Bazaar</div>
                            <p className="text-sm leading-tight text-white/90">
                              Where dreams are sold and wallets are emptied
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </span>
                      <a href="/marketplace" title="Hot Right Now" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Startups that investors are fighting over
                      </a>
                      <a href="/marketplace" title="Fresh Meat" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Newly hatched startups seeking funding
                      </a>
                      <a href="/marketplace" title="Categories" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        From "Actually Useful" to "Pure Speculation"
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem> 
                  <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <a href="/resources" title="Survival Guides" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        How to pitch without crying
                      </a>
                      <a href="/resources" title="War Stories" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Tales from the startup trenches
                      </a>
                      <a href="/resources" title="Networking Parties" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Free food and awkward conversations
                      </a>
                      <a href="/resources" title="Dumb Questions" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        There are no dumb questions (except these)
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">Network</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <a href="/network" title="Money People" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        They have cash, you need cash
                      </a>
                      <a href="/network" title="Fellow Dreamers" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Other sleep-deprived entrepreneurs
                      </a>
                      <a href="/network" title="Been There, Done That" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        Learn from their expensive mistakes
                      </a>
                      <a href="/network" title="Useful Connections" className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900">
                        People who might actually help you
                      </a>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent" asChild>
                    <a
                      href="/quests"
                      className="py-2.5 px-3 rounded-md hover:cursor-pointer hover:bg-gray-800"
                    >
                      Quests
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                {/* <Link href="/quests" className="flex items-center gap-3 px-3 py-2 bg-slate-950 text-sm rounded-md">
                    Quests
                </Link> */}

                {authReady && user && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent" >Dashboards</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <NavigationMenuLink asChild>
                          <a
                            className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                            href="/"
                          >
                            Investor Dashboard
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a
                            className="p-2 rounded-md hover:cursor-pointer hover:bg-slate-900"
                            href="/"
                          >
                            Founder Dashboard
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
                 
              </NavigationMenuList>
            </NavigationMenu>

              {/* Show skeleton for dashboards dropdown when loading */}
              {!authReady && <Skeleton className="h-9 w-28 rounded-md" />}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {renderAuthUI()}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-gray-900 border-gray-800 w-[280px]">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800 flex items-center">
                    <Image
                      src="/favicon.svg"
                      alt="OnlyFounders Logo"
                      width={32}
                      height={32}
                      className="rounded-md mr-2"
                    />
                    <span className="font-bold text-xl text-white">OnlyFounders</span>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <div className="grid gap-1 px-2">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 text-sm rounded-md",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <Separator className="my-4 bg-gray-800" />

                    {authReady && user && (
                      <>
                        <div className="px-3 mb-2">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboards</h4>
                        </div>
                        <div className="grid gap-1 px-2">
                          {dashboardNavItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-3 text-sm rounded-md",
                                isActive(item.href)
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        <Separator className="my-4 bg-gray-800" />
                      </>
                    )}

                    <div className="grid gap-1 px-2">
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-800">
                    {!authReady ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : user ? (
                      <div className="w-full">
                        <ConnectButton.Custom>
                          {({ account, openConnectModal, mounted }) => {
                            const connected = mounted && account
                            return (
                              <Button
                                onClick={connected ? undefined : openConnectModal}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              >
                                <Wallet className="mr-2 h-4 w-4" />
                                {connected ? "Wallet Connected" : "Connect Wallet"}
                              </Button>
                            )
                          }}
                        </ConnectButton.Custom>
                      </div>
                    ) : (
                      <a href="/early-access">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Early Access
                        </Button>
                      </a>
                    )}

                    {!authReady ?(
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : user ? (
                      <a href="/api/auth/logout">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                          Logout
                        </Button>
                      </a>
                    ):(null)}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}

