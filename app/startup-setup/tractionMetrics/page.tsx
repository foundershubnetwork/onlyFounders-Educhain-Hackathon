"use client"

import { useState } from "react"
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

const tractionMetricsSchema = z.object({
  waitlistSignups: z.string().optional(),
  strategicPartners: z.string().optional(),
  githubStars: z.string().optional(),
  storageCapacity: z.string().optional(),
  nodeOperators: z.string().optional(),
  developerInterest: z.string().optional(),
  growthMetrics: z.string().optional(),
  additionalMetrics: z.string().optional(),
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
  const {user} = useUser();
  
  const form = useForm<TractionMetricsValues>({
    resolver: zodResolver(tractionMetricsSchema),
    defaultValues: {
      waitlistSignups: data?.waitlistSignups || "",
      strategicPartners: data?.strategicPartners || "",
      githubStars: data?.githubStars || "",
      storageCapacity: data?.storageCapacity || "",
      nodeOperators: data?.nodeOperators || "",
      developerInterest: data?.developerInterest || "",
      growthMetrics: data?.growthMetrics || "",
      additionalMetrics: data?.additionalMetrics || "",
    },
  })

  const handleSubmit = async (values: TractionMetricsValues) => {
    try {
      setIsSubmitting(true)

      const userId = user.sub?.substring(14);
            
                  if (!userId) {
                    toast({
                      title: "Authentication error",
                      description: "Please sign in again to continue.",
                      variant: "destructive",
                    })
                    router.push("/login")
                    return
                  }

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData(values)
      }

      // Prepare data for API submission
      const apiData = {
        waitlistSignups: values.waitlistSignups || "",
        strategicPartners: values.strategicPartners || "",
        githubStars: values.githubStars || "",
        storageCapacity: values.storageCapacity || "",
        nodeOperators: values.nodeOperators || "",
        developerInterest: values.developerInterest || "",
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
      router.push("/coreTeam")
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
    <div className="flex items-center justify-center mx-auto mt-4">
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
                    <Input placeholder="e.g., 500 TB" className="bg-gray-800 border-gray-700 text-white" {...field} />
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
                  <FormDescription className="text-gray-500">Number of pre-registered node operators</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="developerInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Developer Interest</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe developer engagement or contributions..."
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Additional metrics showcasing developer engagement
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

            <FormField
              control={form.control}
              name="additionalMetrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Additional Metrics</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any other metrics or traction indicators..."
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Any other relevant metrics or traction indicators
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
  )
}

