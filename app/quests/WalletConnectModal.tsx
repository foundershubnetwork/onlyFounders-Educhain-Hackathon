'use client'

import React from 'react'

import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface WalletConnectModalProps {
    isWalletModalOpen: boolean
    onWalletModalClose: () => void

}

const WalletConnectModal = ({ isWalletModalOpen, onWalletModalClose }: WalletConnectModalProps) => {
    if(!isWalletModalOpen) return null

  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-[#101628]/95 border-0 shadow-[0_0_30px_rgba(0,207,255,0.2)] rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <CardHeader className="relative pb-5 pt-5 bg-gradient-to-r from-[#00CFFF]/20 to-transparent">
          <button
            onClick={onWalletModalClose}
            className="absolute right-4 top-4 rounded-full p-1.5 bg-[#131A2E]/80 text-[#8C9BA8] hover:text-[#F5F7FA] hover:bg-[#131A2E] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          <CardTitle className="text-xl text-center text-[#00D3FF] font-semibold tracking-tight">
            Connect Your Wallet to Mint NFT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <ConnectButton/>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default WalletConnectModal