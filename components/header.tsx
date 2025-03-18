"use client"

import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { WalletConnect } from "@/components/wallet-connect"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { Bell, Search } from "lucide-react"
import Image from "next/image"
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
import { useUser } from "@auth0/nextjs-auth0/client"


export function Header() {
  const {user, error, isLoading} = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Optimus AI Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="hidden font-bold text-xl text-white md:inline-block">Optimus AI</span>
          </Link>

          <div className="hidden md:flex">
            <MainNav />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="border-gray-700 text-gray-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>

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
            

            {user? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-700 text-white gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.picture ?? "/default-avatar.png"} />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <span>{(user as any).given_name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Investments</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Projects</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="cursor-pointer">Sign out</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer"><a href="api/auth/login">Login</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
              <a href="api/auth/login"><Button variant="outline">Login</Button></a>
            )}
          </div>

          <WalletConnect />

          <MobileNav />
        </div>
      </div>
    </header>
  )
}

