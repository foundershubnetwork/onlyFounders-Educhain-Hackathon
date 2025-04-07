import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Bookmark, ThumbsUp, ThumbsDown, Clock, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RelatedPosts from "@/components/related-posts"
import BlogComments from "@/components/blog-comments"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/blog" className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <Image src="/placeholder.svg?height=400&width=1200" alt="Blog Post Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="inline-block bg-amber-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
            Trends
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">The Rise of Community-Driven Fundraising in Web3</h1>
          <div className="flex items-center text-gray-300 space-x-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>November 20, 2023</span>
            </div>
            <div className="flex items-center">
              <Tag className="mr-1 h-4 w-4" />
              <span>DAO, Community, Fundraising</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=48&width=48" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-400">Web3 Analyst & Writer</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                Community-driven fundraising is revolutionizing how blockchain projects secure capital, shifting power
                from traditional VCs to engaged users and supporters.
              </p>

              <p className="text-gray-300 mb-4">
                In the traditional startup world, fundraising typically involves pitching to venture capital firms,
                angel investors, or other institutional players. The Web3 space initially followed a similar pattern,
                with projects seeking backing from crypto-focused VCs. However, we're now witnessing a significant shift
                toward community-driven fundraising models that leverage the unique properties of blockchain technology.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Power of Community Treasuries</h2>
              <p className="text-gray-300 mb-4">
                Decentralized Autonomous Organizations (DAOs) have emerged as powerful vehicles for community-driven
                fundraising. By pooling resources in a transparent, blockchain-based treasury, communities can
                collectively decide which projects to fund based on their potential value to the ecosystem.
              </p>
              <p className="text-gray-300 mb-4">This model has several advantages over traditional fundraising:</p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>Alignment of incentives between projects and their users</li>
                <li>Reduced dependency on small groups of wealthy investors</li>
                <li>More diverse perspectives in funding decisions</li>
                <li>Greater accountability through transparent on-chain governance</li>
              </ul>

              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-800 rounded-lg p-4 my-6">
                <p className="text-amber-300 font-medium mb-2">Case Study: MakerDAO</p>
                <p className="text-sm text-gray-300">
                  MakerDAO's ecosystem growth fund has allocated millions to projects building on top of their protocol,
                  creating a virtuous cycle of innovation and value creation that benefits all stakeholders.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Micro-Fundraising Through NFTs</h2>
              <p className="text-gray-300 mb-4">
                Non-fungible tokens (NFTs) have opened up new avenues for project fundraising. Beyond simple
                collectibles, NFTs can represent ownership stakes, access rights, or governance power in early-stage
                projects.
              </p>
              <p className="text-gray-300 mb-4">
                Projects like Nouns have pioneered the concept of "NFT-driven development," where the sale of NFTs
                directly funds public goods and ecosystem growth. This model allows for continuous micro-fundraising
                rather than large, concentrated funding rounds.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Rise of Participation-Based Funding</h2>
              <p className="text-gray-300 mb-4">
                Perhaps the most exciting development in community-driven fundraising is the emergence of
                participation-based models. In these systems, users earn the right to participate in token sales or
                funding rounds based on their contributions to the ecosystem.
              </p>
              <p className="text-gray-300 mb-4">
                Gitcoin Grants has pioneered this approach with quadratic funding, where the matching pool is
                distributed based on the number of contributors rather than the amount contributed. This amplifies the
                impact of small donors and ensures projects with broad community support receive funding.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Challenges and Limitations</h2>
              <p className="text-gray-300 mb-4">
                Despite its promise, community-driven fundraising faces several challenges:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
                <li>Coordination problems in large, diverse communities</li>
                <li>Potential for capture by wealthy token holders</li>
                <li>Regulatory uncertainty around novel fundraising mechanisms</li>
                <li>Difficulty in valuing early-stage projects without traditional metrics</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Future of Web3 Fundraising</h2>
              <p className="text-gray-300 mb-4">
                As the Web3 ecosystem matures, we're likely to see a convergence of traditional and community-driven
                fundraising models. Projects may raise initial capital from knowledgeable VCs who can provide guidance
                and connections, then transition to community-driven funding as they build a user base.
              </p>
              <p className="text-gray-300 mb-4">
                The most successful projects will be those that effectively harness the wisdom and resources of their
                communities while maintaining clear direction and purpose. By aligning incentives between founders,
                investors, and users, community-driven fundraising has the potential to create more sustainable and
                equitable Web3 ecosystems.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-300 mb-4">
                Community-driven fundraising represents a fundamental shift in how blockchain projects secure capital
                and grow their ecosystems. By leveraging the unique properties of Web3 technologies, projects can create
                more inclusive, transparent, and aligned funding mechanisms that benefit all stakeholders.
              </p>
              <p className="text-gray-300 mb-4">
                As these models continue to evolve, they will play a crucial role in shaping the future of decentralized
                finance, governance, and community ownership.
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="text-gray-400 text-sm">Was this helpful?</div>
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Yes
                </Button>
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-700">
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  No
                </Button>
              </div>

              <div className="text-gray-400 text-sm">Published: November 20, 2023</div>
            </div>
          </div>

          <BlogComments postId={params.id} />
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">About the Author</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=64&width=64" alt="Author" fill className="object-cover" />
              </div>
              <div>
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-sm text-gray-400">Web3 Analyst & Writer</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Sarah has been covering the blockchain and cryptocurrency space for over 5 years. She specializes in DeFi,
              DAOs, and community-driven projects.
            </p>
            <Link href="/network/members/sarah-johnson" className="text-amber-400 text-sm hover:underline">
              View Profile
            </Link>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">Share This Post</h3>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="icon" className="text-blue-400 border-gray-700 hover:bg-blue-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2-2.2 5.5-2.5 8-1 1.3-1.3 2.5-2.7 2.8-4z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="text-blue-600 border-gray-700 hover:bg-blue-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="text-blue-500 border-gray-700 hover:bg-blue-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="text-green-500 border-gray-700 hover:bg-green-900/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </Button>
            </div>
          </div>

          <RelatedPosts currentPostId={params.id} />
        </div>
      </div>
    </div>
  )
}

