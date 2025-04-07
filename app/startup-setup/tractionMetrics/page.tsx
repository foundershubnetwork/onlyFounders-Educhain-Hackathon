"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

const tractionMetricsSchema = z.object({
  waitlistSignups: z.string().optional(),
  strategicPartners: z.string().optional(),
  githubStars: z.string().optional(),
  storageCapacity: z.string().optional(),
  nodeOperators: z.string().optional(),
  growthMetrics: z.string().optional(),
})

type TractionMetricsValues = z.infer<typeof tractionMetricsSchema>

interface TractionMetricsFormProps {
  data: any
  updateData?: (data: any) => void
  onNext: () => void
  userId: string
}

export default function TractionMetricsForm({ data, updateData, onNext, userId }: TractionMetricsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useUser()
  const [originalTractionData, setOriginalTractionData] = useState<any>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const form = useForm<TractionMetricsValues>({
    resolver: zodResolver(tractionMetricsSchema),
    defaultValues: {
      waitlistSignups: data?.waitlistSignups || "",
      strategicPartners: data?.strategicPartners || "",
      githubStars: data?.githubStars || "",
      storageCapacity: data?.storageCapacity || "",
      nodeOperators: data?.nodeOperators || "",
      growthMetrics: data?.growthMetrics || "",
    },
  })

  useEffect(() => {
        const fetchProjectId = async () => {
          try{
            if(!user) return
            const userId = user?.sub?.substring(14)
            const response = await fetch("https://onlyfounders.azurewebsites.net/api/startup/get-projectId",{
              method: "GET",
              headers: {
                user_id: userId,
              },
            })
    
            if(response.status === 200){
              const data = await response.json()
              setProjectId(data.projectId)
            }
          }
          catch(error){
            console.error("Error fetching project ID:", error)
            toast({
              title: "Error",
              description: "Failed to load project ID. Please refresh the page.",
              variant: "destructive",
            })
          }
        };
        fetchProjectId();
      }, [user])

  useEffect(() => {
    // Function to fetch startup data
    const fetchStartupData = async () => {
      try {
        if(!user || !projectId) return
      const userId = user?.sub?.substring(14)
      const requestBody = { projectId };
      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }
      const response = await axios.post(
        "https://onlyfounders.azurewebsites.net/api/startup/view-startup",
        requestBody, // ✅ Correct JSON format
        {
          headers: {
            "Content-Type": "application/json", // ✅ Correct header
            user_id: userId,
          },
        }
      );

        const data = response.data

        if (data && data.startup && data.startup.traction) {
          const traction = data.startup.traction

          // Set form values
          form.reset({
            waitlistSignups: traction.waitlistSignups?.toString() || "",
            strategicPartners: traction.strategicPartners?.toString() || "",
            githubStars: traction.githubStars?.toString() || "",
            storageCapacity: traction.storageCapacity?.toString() || "",
            nodeOperators: traction.nodeOperators?.toString() || "",
            growthMetrics: traction.growthMetrics || "",
          })

          // Store original data for comparison
          setOriginalTractionData(traction)
        }
      } catch (error) {
        console.error("Error fetching startup data:", error)
        toast({
          title: "Error",
          description: "Failed to load traction metrics data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchStartupData()
  }, [projectId])

  const handleSubmit = async (values: TractionMetricsValues) => {
    try {
      setIsSubmitting(true)

      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData(values)
      }

      // Check if there are changes by comparing with original data
      let hasChanges = false

      if (originalTractionData) {
        // Compare fields
        if (
          values.waitlistSignups !== originalTractionData.waitlistSignups?.toString() ||
          values.strategicPartners !== originalTractionData.strategicPartners?.toString() ||
          values.githubStars !== originalTractionData.githubStars?.toString() ||
          values.storageCapacity !== originalTractionData.storageCapacity?.toString() ||
          values.nodeOperators !== originalTractionData.nodeOperators?.toString() ||
          values.growthMetrics !== originalTractionData.growthMetrics
        ) {
          hasChanges = true
        }
      } else {
        // If we don't have original data, assume changes were made
        hasChanges = true
      }

      // If there are no changes and we have original data, we can skip submission
      if (!hasChanges && originalTractionData) {
        toast({
          title: "No changes detected",
          description: "Moving to the next step without submitting.",
        })
        router.push("/startup-setup/coreTeam")
        return
      }

      // Prepare data for API submission
      const apiData = {
        waitlistSignups: values.waitlistSignups || "",
        strategicPartners: values.strategicPartners || "",
        githubStars: values.githubStars || "",
        storageCapacity: values.storageCapacity || "",
        nodeOperators: values.nodeOperators || "",
        growthMetrics: values.growthMetrics || "",
      }

      // Send data to API
      const response = await fetch("https://onlyfounders.azurewebsites.net/api/startup/submit-traction-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          user_id: userId,
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      // Show success toast
      toast({
        title: "Success!",
        description: "Your traction metrics have been submitted successfully.",
      })

      // Route to next page
      router.push("/startup-setup/coreTeam")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center mx-auto mt-4 py-4">
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 2 of 5</span>
          </div>
          <Progress
            value={40}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-400">
                  Share key metrics and traction indicators to demonstrate your project's progress and potential.
                </p>

                <FormField
                  control={form.control}
                  name="waitlistSignups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Waitlist Signups</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5000" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Number of users who have signed up for early access or updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strategicPartners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Strategic Partners</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Count of strategic partnerships established
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubStars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">GitHub Stars</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 250" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Number of stars on the project's GitHub repository
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storageCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Storage Capacity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 500 TB"
                          className="bg-gray-800 border-gray-700 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Total storage capacity committed for launch
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nodeOperators"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Node Operators</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 75" className="bg-gray-800 border-gray-700 text-white" {...field} />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Number of pre-registered node operators
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="growthMetrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Growth Metrics</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe growth in key areas such as social media, Discord, Telegram, etc."
                          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Percentage growth in key areas over a specified period
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

