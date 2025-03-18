import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-gray-400 mt-4">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="bg-black hover:bg-gray-900 text-white border border-gray-800">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-700 text-white">
            <Link href="/marketplace">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Explore Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

