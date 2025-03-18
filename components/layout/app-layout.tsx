"use client"

import { type ReactNode, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Search,
  Settings,
  Shield,
  Store,
  Trophy,
  Users,
  Wallet,
} from "lucide-react"

import { useUser } from "@auth0/nextjs-auth0/client";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import axios from "axios"

interface AppLayoutProps {
  children: ReactNode
  showHero?: boolean
}

export function AppLayout({ children, showHero = false }: AppLayoutProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isSent, setIsSent] = useState(false);
  const requestSent = useRef(false); // Ensures API is called only once per session
  const { user, isLoading } = useUser();
  const { address, isConnected } = useAccount();

  
  useEffect(() => {
    const sendWalletAddress = async () => {
      if (user && isConnected && address) {
        try {
          const userID = user.sub?.substring(14); // Extract User ID

          const response = await axios.post(
            "https://onlyfounders.azurewebsites.net/api/profile/add-walletAddress",
            { walletAddress: address }, 
            {
              headers: {
                "Content-Type": "application/json",
                "user_id": userID,
              },
            }
          );

          console.log("Address sent successfully", response.data);
        } catch (error) {
          console.error("Error sending address:", error);
        }
      }
    };

    sendWalletAddress();
  }, [user, isConnected, address]); 

 useEffect(() => {
  if (!isLoading && user && !isSent && !requestSent.current) {
    requestSent.current = true; // Prevents duplicate API calls

    const sendUserData = async () => {
      try {
        const trimmedUserId = user.sub?.substring(14);
        if (!trimmedUserId || !user.email) {
          console.error("Invalid user data, skipping API call.");
          return;
        }

        setIsSent(true); // ✅ Mark as sent **before** the request

        const response = await fetch("https://onlyfounders.azurewebsites.net/api/auth/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "userInput": {
              username: user.given_name || "Unknown User",
              email: user.email,
              user_id: trimmedUserId,
              walletAddress: " ",
            },
          }),
        });

        if (response.ok) {
          console.log("✅ User data sent successfully!");
        } else {
          console.error("❌ Failed to send user data. Status:", response.status);
          const errorData = await response.json().catch(() => null);
          console.error("Error details:", errorData || "No error message from server");
        }
      } catch (error) {
        console.error("❌ Error sending user data:", error);
      }
    };

    sendUserData();
  }
}, [user, isLoading, isSent]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/network", label: "Network", icon: Users },
    { href: "/resources", label: "Resources", icon: BookOpen },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/quests", label: "Quests", icon: Trophy },
  ]

  const dashboardNavItems = [
    { href: "/investor-dashboard", label: "Investor Dashboard", icon: Wallet },
    { href: "/founder-dashboard", label: "Founder Dashboard", icon: Building },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname === path || pathname.startsWith(`${path}/`)
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
              <Image
                src="/onlyFounder_logo.svg"
                alt="Optimus AI Logo"
                width={128}
                height={48}
                className="rounded-md"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {mainNavItems.map((item) => (
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
              ))}
              {user? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    Dashboards <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
                  {dashboardNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer">
                      <Link href={item.href} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              ) : ''}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {user? (
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
              ) : ''}

              {user? (
              <DropdownMenu >
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
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <Shield className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/investor-dashboard">
                      <Wallet className="mr-2 h-4 w-4" />
                      Investor Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/founder-dashboard">
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
                  <a href="api/auth/logout">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </a> 
                </DropdownMenuContent>
              </DropdownMenu>
              ) : (
                <a href="api/auth/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" variant="outline">Login</Button>
                </a>
              )}
            </div>

            {/* <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Wallet className="mr-2 h-4 w-4" />
            </Button> */}

            {user? (
              <ConnectButton/>
            ): ( '')}

            {/* <ConnectButton.Custom>
                {({ account, openConnectModal, mounted }) => {
                  const connected = mounted && account;

                  return (
                    <button
                      onClick={connected ? undefined : openConnectModal}
                      className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      {connected ? account.address : "Connect Wallet"}
                    </button>
                  );
                }}
            </ConnectButton.Custom> */}





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
                      src="/placeholder.svg?height=32&width=32"
                      alt="Optimus AI Logo"
                      width={32}
                      height={32}
                      className="rounded-md mr-2"
                    />
                    <span className="font-bold text-xl text-white">Optimus AI</span>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                    <div className="grid gap-1 px-2">
                      {mainNavItems.map((item) => (
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

                    <div className="grid gap-1 px-2">
                      <Link
                        href="/messages"
                        className="flex items-center gap-3 px-3 py-3 text-sm rounded-md text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <MessageSquare className="h-5 w-5" />
                        Messages
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-3 py-3 text-sm rounded-md text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Settings className="h-5 w-5" />
                        Settings
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-800">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
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