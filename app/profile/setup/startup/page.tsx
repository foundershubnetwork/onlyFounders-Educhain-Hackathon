"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Building, Camera, Check, FileText, Github, Globe, Twitter } from "lucide-react"

const startupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  tagline: z
    .string()
    .min(5, { message: "Tagline must be at least 5 characters" })
    .max(100, { message: "Tagline must be less than 100 characters" }),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  stage: z.string().min(1, { message: "Please select your startup stage" }),
  foundedYear: z.string().min(4, { message: "Please enter a valid year" }).max(4),
  teamSize: z.string().min(1, { message: "Please select your team size" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
  whitepaper: z.string().optional().or(z.literal("")),
  blockchain: z.array(z.string()).min(1, { message: "Please select at least one blockchain" }),
})

type StartupValues = z.infer<typeof startupSchema>

export default function StartupSetupPage() {
  const router = useRouter()
  const [logoSrc, setLogoSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [coverSrc, setCoverSrc] = useState<string>("/placeholder.svg?height=300&width=800")

  const blockchainOptions = [
    { id: "ethereum", label: "Ethereum" },
    { id: "polygon", label: "Polygon" },
    { id: "solana", label: "Solana" },
    { id: "binance", label: "BNB Chain" },
    { id: "avalanche", label: "Avalanche" },
    { id: "arbitrum", label: "Arbitrum" },
    { id: "optimism", label: "Optimism" },
    { id: "near", label: "NEAR" },
  ]

  const form = useForm<StartupValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      category: "",
      stage: "",
      foundedYear: new Date().getFullYear().toString(),
      teamSize: "",
      website: "",
      twitter: "",
      github: "",
      whitepaper: "",
      blockchain: [],
    },
  })

  function onSubmit(data: StartupValues) {
    console.log(data)
    router.push("/founder-dashboard")
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setLogoSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Startup Information</h1>
          <p className="text-gray-400">Tell us about your Web3 project or startup</p>
        </div>

        <div className="w-full">
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Profile Setup</span>
              <span className="text-white font-medium">Step 3 of 3</span>
            </div>
            <Progress
              value={100}
              className="h-2 bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
            />
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Startup Details</CardTitle>
              <CardDescription className="text-gray-400">
                This information will be displayed on your project page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Logo & Cover Image</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <Avatar className="h-24 w-24 border-2 border-gray-800">
                              <AvatarImage src={logoSrc} alt="Logo" />
                              <AvatarFallback className="bg-gray-800 text-gray-400">
                                <Building className="h-12 w-12" />
                              </AvatarFallback>
                            </Avatar>
                            <label
                              htmlFor="logo-upload"
                              className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                            >
                              <Camera className="h-4 w-4 text-gray-400" />
                              <span className="sr-only">Upload logo</span>
                            </label>
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoChange}
                            />
                          </div>
                          <p className="text-sm text-gray-400">Upload project logo</p>
                        </div>

                        <div className="md:col-span-2">
                          <div className="relative h-40 w-full rounded-lg overflow-hidden border-2 border-gray-800">
                            <Image src={coverSrc || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
                            <label
                              htmlFor="cover-upload"
                              className="absolute bottom-2 right-2 p-1.5 rounded-md bg-gray-800/80 border border-gray-700 cursor-pointer"
                            >
                              <Camera className="h-4 w-4 text-gray-400" />
                              <span className="sr-only">Upload cover</span>
                            </label>
                            <input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleCoverChange}
                            />
                          </div>
                          <p className="text-sm text-gray-400 mt-2">Upload a cover image (recommended: 1200×400px)</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Project Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="DecentraVault"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tagline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Tagline</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Decentralized vault for secure asset management"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              {field.value.length}/100 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project, its mission, and the problem it solves..."
                              className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            {field.value.length}/1000 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="defi">DeFi</SelectItem>
                                <SelectItem value="nft">NFT</SelectItem>
                                <SelectItem value="dao">DAO</SelectItem>
                                <SelectItem value="gaming">Gaming</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="metaverse">Metaverse</SelectItem>
                                <SelectItem value="privacy">Privacy</SelectItem>
                                <SelectItem value="social">Social</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Project Stage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select your project stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="concept">Concept/Idea</SelectItem>
                                <SelectItem value="prototype">Prototype/MVP</SelectItem>
                                <SelectItem value="beta">Beta</SelectItem>
                                <SelectItem value="launched">Launched</SelectItem>
                                <SelectItem value="scaling">Scaling</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="foundedYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Founded Year</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="2023"
                                className="bg-gray-800 border-gray-700 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Team Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                                <SelectItem value="solo">Solo Founder</SelectItem>
                                <SelectItem value="2-5">2-5 People</SelectItem>
                                <SelectItem value="6-10">6-10 People</SelectItem>
                                <SelectItem value="11-20">11-20 People</SelectItem>
                                <SelectItem value="20+">20+ People</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormLabel className="text-white block mb-3">Blockchain Platforms</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {blockchainOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="blockchain"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-3 bg-gray-800/50"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(field.value?.filter((value) => value !== option.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-white font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage className="mt-2">{form.formState.errors.blockchain?.message}</FormMessage>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-white">Web Presence</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Website</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="https://yourproject.com"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Twitter</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="@projectname"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">GitHub</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="github.com/projectname"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="whitepaper"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Whitepaper</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="Link to your whitepaper"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/profile/setup/founder")}
                      className="border-gray-700 text-white"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="bg-black hover:bg-gray-900 text-white border border-gray-800">
                      Complete Setup
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

