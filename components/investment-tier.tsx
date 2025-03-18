"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, DollarSign, Sparkles, Star, Trophy, Zap } from "lucide-react"
import Image from "next/image"

interface InvestmentTierProps {
  onInvest: (amount: number) => void
  className?: string
}

export function InvestmentTier({ onInvest, className }: InvestmentTierProps) {
  const [selectedTier, setSelectedTier] = useState<string>("tier2")
  const [customAmount, setCustomAmount] = useState<string>("5000")

  const tiers = [
    {
      id: "tier1",
      name: "Starter",
      amount: 100,
      description: "Entry-level investment to get started",
      icon: <Zap className="h-5 w-5 text-blue-400" />,
      image: "/placeholder.svg?height=60&width=60",
      benefits: ["Basic investor profile", "Access to public projects"],
    },
    {
      id: "tier2",
      name: "Growth",
      amount: 1000,
      description: "Most popular investment tier",
      icon: <Star className="h-5 w-5 text-amber-400" />,
      image: "/placeholder.svg?height=60&width=60",
      benefits: ["Enhanced investor profile", "Early access to new projects", "Quarterly investor reports"],
    },
    {
      id: "tier3",
      name: "Premium",
      amount: 5000,
      description: "For serious blockchain investors",
      icon: <Trophy className="h-5 w-5 text-purple-400" />,
      image: "/placeholder.svg?height=60&width=60",
      benefits: [
        "Premium investor badge",
        "Priority access to all projects",
        "Direct communication with founders",
        "Exclusive investment opportunities",
      ],
    },
    {
      id: "custom",
      name: "Custom",
      amount: 0,
      description: "Set your own investment amount",
      icon: <Sparkles className="h-5 w-5 text-cyan-400" />,
      image: "/placeholder.svg?height=60&width=60",
      benefits: ["Flexible investment amount", "Benefits based on investment tier"],
    },
  ]

  const handleInvest = () => {
    const tier = tiers.find((t) => t.id === selectedTier)
    const amount = tier?.id === "custom" ? Number.parseFloat(customAmount) : tier?.amount || 0
    onInvest(amount)
  }

  return (
    <Card className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl text-white">Choose Investment Amount</CardTitle>
        <CardDescription className="text-gray-400">Select an investment tier or enter a custom amount</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedTier} onValueChange={setSelectedTier} className="space-y-4">
          {tiers.map((tier) => (
            <div key={tier.id} className="relative">
              <div
                className={`flex items-start space-x-4 rounded-lg border p-4 ${
                  selectedTier === tier.id ? "border-blue-600 bg-blue-950/20" : "border-gray-800 bg-gray-800/50"
                }`}
              >
                <RadioGroupItem value={tier.id} id={tier.id} className="sr-only" />
                <div className="h-12 w-12 rounded-full overflow-hidden relative">
                  <Image src={tier.image || "/placeholder.svg"} alt={tier.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Label htmlFor={tier.id} className="text-lg font-medium text-white cursor-pointer">
                    {tier.name}
                    {tier.id === "tier2" && <Badge className="ml-2 bg-amber-600 text-white">Popular</Badge>}
                  </Label>
                  <div className="text-sm text-gray-400 mt-1">{tier.description}</div>

                  {tier.id !== "custom" ? (
                    <div className="text-xl font-bold text-blue-400 mt-2">{tier.amount.toLocaleString()} USDC</div>
                  ) : (
                    <div className="mt-2 relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        type="number"
                        min="100"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="pl-9 bg-gray-800 border-gray-700 text-white"
                        disabled={selectedTier !== "custom"}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">USDC</span>
                    </div>
                  )}

                  <div className="mt-3">
                    <div className="text-sm font-medium text-white mb-1">Benefits:</div>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-400">
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedTier === tier.id && (
                  <div className="absolute top-4 right-4 h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleInvest} className="w-full bg-black hover:bg-gray-900 text-white border border-gray-800">
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  )
}

