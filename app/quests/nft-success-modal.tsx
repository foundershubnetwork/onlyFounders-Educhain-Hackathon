"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface NFTSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  onExplore: () => void
  nftData?: any
}

export default function NFTSuccessModal({ isOpen, onClose, onExplore, nftData }: NFTSuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-[#101628]/95 border-0 shadow-[0_0_30px_rgba(0,207,255,0.2)] rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <CardHeader className="relative pb-5 pt-5 bg-gradient-to-r from-[#00CFFF]/20 to-transparent">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 bg-[#131A2E]/80 text-[#8C9BA8] hover:text-[#F5F7FA] hover:bg-[#131A2E] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] p-1 animate-pulse">
              <div className="w-full h-full rounded-full bg-[#131A2E] flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-xl text-center text-[#00D3FF] font-semibold tracking-tight">
            NFT Minted Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-[#F5F7FA] mb-4">
            Congratulations! Your NFT has been successfully minted and added to your collection.
          </p>
          <Image
            src={nftData?.image || "/placeholder.jpg"}
            alt="NFT Preview"
            width={400}
            height={500}
            className="mx-auto mb-4 rounded-lg shadow-lg"
          />
        </CardContent>
        <CardFooter className="flex justify-between gap-4 p-6 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-[#15847D]/30 text-[#8C9BA8] hover:text-[#F5F7FA] hover:border-[#00E0FF]/50 hover:bg-[#00E0FF]/5 transition-all duration-200 rounded-xl"
          >
            Close
          </Button>
          <Button
            onClick={onExplore}
            className="flex-1 bg-gradient-to-r from-[#00CFFF] to-[#00E0FF] hover:from-[#00E0FF] hover:to-[#00CFFF] text-[#0B0E17] font-medium rounded-xl shadow-[0_0_15px_rgba(0,207,255,0.2)] hover:shadow-[0_0_20px_rgba(0,224,255,0.3)] transition-all duration-300"
          >
            Explore
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

