"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, ChevronLeft, ChevronRight, Upload } from "lucide-react"

export function ProjectSubmissionForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    category: "",
    website: "",
    twitter: "",
    github: "",
    whitepaper: "",
    fundingGoal: "",
    tokenSymbol: "",
    tokenSupply: "",
    blockchain: "",
    teamSize: "",
    stage: "",
    hasAudit: false,
    acceptTerms: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit logic would go here
    alert("Project submitted successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Badge
            className={`${step >= 1 ? "bg-blue-600" : "bg-gray-700"} h-6 w-6 rounded-full p-0 flex items-center justify-center`}
          >
            {step > 1 ? <Check className="h-3 w-3" /> : "1"}
          </Badge>
          <Separator className={`w-10 h-1 ${step > 1 ? "bg-blue-600" : "bg-gray-700"}`} />
          <Badge
            className={`${step >= 2 ? "bg-blue-600" : "bg-gray-700"} h-6 w-6 rounded-full p-0 flex items-center justify-center`}
          >
            {step > 2 ? <Check className="h-3 w-3" /> : "2"}
          </Badge>
          <Separator className={`w-10 h-1 ${step > 2 ? "bg-blue-600" : "bg-gray-700"}`} />
          <Badge
            className={`${step >= 3 ? "bg-blue-600" : "bg-gray-700"} h-6 w-6 rounded-full p-0 flex items-center justify-center`}
          >
            {step > 3 ? <Check className="h-3 w-3" /> : "3"}
          </Badge>
          <Separator className={`w-10 h-1 ${step > 3 ? "bg-blue-600" : "bg-gray-700"}`} />
          <Badge
            className={`${step >= 4 ? "bg-blue-600" : "bg-gray-700"} h-6 w-6 rounded-full p-0 flex items-center justify-center`}
          >
            4
          </Badge>
        </div>
        <div className="text-sm text-gray-400">Step {step} of 4</div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white">Basic Information</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="Enter your project name"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => handleChange("projectDescription", e.target.value)}
                placeholder="Describe your project in detail"
                className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="defi">DeFi</SelectItem>
                  <SelectItem value="nft">NFT</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={nextStep} className="bg-black hover:bg-gray-900 text-white border border-gray-800">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white">Project Links</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://yourproject.com"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
                placeholder="https://twitter.com/yourproject"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={formData.github}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/yourproject"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whitepaper">Whitepaper</Label>
              <Input
                id="whitepaper"
                value={formData.whitepaper}
                onChange={(e) => handleChange("whitepaper", e.target.value)}
                placeholder="https://yourproject.com/whitepaper.pdf"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" className="border-gray-700 text-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} className="bg-black hover:bg-gray-900 text-white border border-gray-800">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white">Funding & Tokenomics</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fundingGoal">Funding Goal (USDC)</Label>
              <Input
                id="fundingGoal"
                value={formData.fundingGoal}
                onChange={(e) => handleChange("fundingGoal", e.target.value)}
                placeholder="100000"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input
                id="tokenSymbol"
                value={formData.tokenSymbol}
                onChange={(e) => handleChange("tokenSymbol", e.target.value)}
                placeholder="TKN"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenSupply">Total Token Supply</Label>
              <Input
                id="tokenSupply"
                value={formData.tokenSupply}
                onChange={(e) => handleChange("tokenSupply", e.target.value)}
                placeholder="100000000"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blockchain">Blockchain</Label>
              <Select value={formData.blockchain} onValueChange={(value) => handleChange("blockchain", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a blockchain" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                  <SelectItem value="avalanche">Avalanche</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" className="border-gray-700 text-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button onClick={nextStep} className="bg-black hover:bg-gray-900 text-white border border-gray-800">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white">Team & Verification</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <RadioGroup
                value={formData.teamSize}
                onValueChange={(value) => handleChange("teamSize", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-5" id="teamSize-1" className="border-gray-700" />
                  <Label htmlFor="teamSize-1">1-5 members</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-10" id="teamSize-2" className="border-gray-700" />
                  <Label htmlFor="teamSize-2">6-10 members</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="11+" id="teamSize-3" className="border-gray-700" />
                  <Label htmlFor="teamSize-3">11+ members</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Project Stage</Label>
              <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select project stage" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="idea">Idea/Concept</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="live">Live Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAudit"
                  checked={formData.hasAudit as boolean}
                  onCheckedChange={(checked) => handleChange("hasAudit", checked as boolean)}
                  className="border-gray-700"
                />
                <Label htmlFor="hasAudit">Project has undergone a security audit</Label>
              </div>
            </div>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-lg">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Upload team information and documents</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms as boolean}
                  onCheckedChange={(checked) => handleChange("acceptTerms", checked as boolean)}
                  className="border-gray-700"
                />
                <Label htmlFor="acceptTerms">
                  I accept the terms and conditions and understand that my project will be reviewed before listing
                </Label>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="outline" className="border-gray-700 text-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.acceptTerms}
              className="bg-black hover:bg-gray-900 text-white border border-gray-800"
            >
              Submit Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

