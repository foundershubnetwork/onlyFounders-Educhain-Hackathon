"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleConnect = (wallet: string) => {
    setIsConnecting(true)
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsOpen(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#635BFF] hover:bg-[#635BFF]/90 text-white">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#202C41] border-[#313E54] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription className="text-[#A3A8AF]">
            Connect your wallet to access Optimus AI platform
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="popular" className="mt-4">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg">
            <TabsTrigger value="popular" className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white">
              Popular
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-[#29305F] data-[state=active]:text-white">
              All Wallets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="popular" className="mt-4 space-y-3">
            {[
              { name: "MetaMask", icon: "/placeholder.svg?height=40&width=40&text=MM" },
              { name: "Coinbase Wallet", icon: "/placeholder.svg?height=40&width=40&text=CB" },
              { name: "WalletConnect", icon: "/placeholder.svg?height=40&width=40&text=WC" },
            ].map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="w-full justify-start text-white border-[#313E54] bg-[#1F2A3D] hover:bg-[#29305F]"
                onClick={() => handleConnect(wallet.name)}
                disabled={isConnecting}
              >
                <div className="h-8 w-8 rounded-md overflow-hidden mr-3">
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={32} height={32} />
                </div>
                {isConnecting ? "Connecting..." : wallet.name}
              </Button>
            ))}
          </TabsContent>
          <TabsContent value="all" className="mt-4 space-y-3">
            {[
              { name: "MetaMask", icon: "/placeholder.svg?height=40&width=40&text=MM" },
              { name: "Coinbase Wallet", icon: "/placeholder.svg?height=40&width=40&text=CB" },
              { name: "WalletConnect", icon: "/placeholder.svg?height=40&width=40&text=WC" },
              { name: "Trust Wallet", icon: "/placeholder.svg?height=40&width=40&text=TW" },
              { name: "Phantom", icon: "/placeholder.svg?height=40&width=40&text=PH" },
              { name: "Brave Wallet", icon: "/placeholder.svg?height=40&width=40&text=BR" },
            ].map((wallet) => (
              <Button
                key={wallet.name}
                variant="outline"
                className="w-full justify-start text-white border-[#313E54] bg-[#1F2A3D] hover:bg-[#29305F]"
                onClick={() => handleConnect(wallet.name)}
                disabled={isConnecting}
              >
                <div className="h-8 w-8 rounded-md overflow-hidden mr-3">
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={32} height={32} />
                </div>
                {isConnecting ? "Connecting..." : wallet.name}
              </Button>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

