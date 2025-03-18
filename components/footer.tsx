import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Optimus AI Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-bold text-xl text-white">Optimus AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered Web3 fundraising platform connecting innovative blockchain projects with global investors.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/fhubnetwork"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter/X</span>
              </Link>
              <Link
                href="https://github.com/foundershubnetwork"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/foundershubnetwork"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/investor-dashboard" className="text-gray-400 hover:text-white">
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/founder-dashboard" className="text-gray-400 hover:text-white">
                  Founder Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resources/grants" className="text-gray-400 hover:text-white">
                  Grants
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="/resources?tab=guides" className="text-gray-400 hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/quests" className="text-gray-400 hover:text-white">
                  Quests
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-gray-400 hover:text-white">
                  Network
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Optimus AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

