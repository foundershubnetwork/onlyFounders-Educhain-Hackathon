"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="space-y-6 max-w-md">
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto" />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-400 mt-4">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={reset} className="bg-black hover:bg-gray-900 text-white border border-gray-800">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="border-gray-700 text-white">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

