import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/onlyFounder_logo.svg"
                alt="OnlyFounder Logo"
                width={128}
                height={48}
                className="rounded-md"
              />
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered Web3 fundraising platform connecting <br /> innovative
              blockchain projects with global investors.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/onlyfoundersxyz"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/x.svg"
                  alt="twitter"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">Twitter/X</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/foundershubnetwork"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkedin.svg"
                  alt="linkedin"
                  width={30}
                  height={30}
                  priority
                />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/marketplace"
                    className="text-gray-400 hover:text-white"
                  >
                    Network
                  </Link>
                </li>
                <li>
                  <Link
                    href="/network"
                    className="text-gray-400 hover:text-white"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Campaign
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Learn</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-400 hover:text-white"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Quests
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* <div>
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
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} OnlyFounders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
