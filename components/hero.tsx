import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-950 z-0"></div>

      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">AI-Powered</span>{" "}
            Web3 Fundraising Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Optimus AI connects innovative blockchain projects with global investors through our AI-powered platform.
            Simplifying fundraising for the decentralized future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/marketplace">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-700 text-white">
              <Link href="/marketplace/create">Submit Your Project</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">500+</span>
              <span className="text-gray-400">Projects Funded</span>
            </div>
            <div className="h-12 border-l border-gray-800 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">$250M+</span>
              <span className="text-gray-400">Total Raised</span>
            </div>
            <div className="h-12 border-l border-gray-800 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">50,000+</span>
              <span className="text-gray-400">Global Investors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

