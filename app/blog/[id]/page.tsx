"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import RelatedPosts from "@/components/related-posts"
import BlogComments from "@/components/blog-comments"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Mock blog post data
  const post = {
    id: params.id,
    title: "The Future of Web3 Fundraising: AI-Powered Due Diligence",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
      role: "Blockchain Analyst",
      verified: true,
    },
    date: "March 15, 2023",
    category: "Technology",
    tags: ["AI", "Blockchain", "Fundraising", "Due Diligence"],
    excerpt: "How artificial intelligence is transforming the way blockchain projects are evaluated and funded",
    content: `
      <p>The Web3 fundraising landscape is evolving rapidly, with artificial intelligence emerging as a game-changing technology for both investors and project founders. Traditional due diligence processes are often time-consuming, subjective, and limited by human capacity to analyze vast amounts of data. AI is changing this paradigm by introducing more efficient, objective, and comprehensive evaluation methods.

<h2>The Challenges of Traditional Due Diligence</h2>

<p>Blockchain projects present unique challenges for investors conducting due diligence:</p>

<ul>
<li>Technical complexity requiring specialized knowledge</li>
<li>Rapidly evolving regulatory landscapes across jurisdictions</li>
<li>Difficulty in assessing team capabilities and authenticity</li>
<li>Complex tokenomics models with long-term implications</li>
<li>Security vulnerabilities in smart contracts and protocols</li>
</ul>

<p>These challenges have contributed to the high rate of failed projects and, unfortunately, scams in the blockchain space. Investors often lack the tools and expertise to thoroughly evaluate projects, leading to poor investment decisions based on hype rather than substance.</p>

<h2>How AI is Transforming Due Diligence</h2>

<p>Artificial intelligence offers powerful solutions to these challenges:</p>

<ol>
<li><strong>Code Analysis:</strong> AI can scan smart contract code to identify vulnerabilities, inefficiencies, and potential security risks that human reviewers might miss.</li>
<li><strong>Team Verification:</strong> Advanced algorithms can verify team members' identities, backgrounds, and past contributions to other projects, reducing the risk of fraudulent teams.</li>
<li><strong>Market Analysis:</strong> AI can process vast amounts of market data to assess project viability, competition, and potential market fit.</li>
<li><strong>Tokenomics Simulation:</strong> Machine learning models can simulate various scenarios to predict how token economics might evolve under different market conditions.</li>
<li><strong>Sentiment Analysis:</strong> Natural language processing can gauge community sentiment and engagement levels across social media and other platforms.</li>
</ol>
`,
    readTime: "8 min read",
    views: 1245,
    likes: 89,
    comments: 23,
    shares: 17,
  }

  // Generate table of contents from content
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /<h2>(.*?)<\/h2>/g
    const headings: { id: string; title: string }[] = []
    let match

    while ((match = headingRegex.exec(post.content)) !== null) {
      const title = match[1]
      const id = title.toLowerCase().replace(/\s+/g, "-")
      headings.push({ id, title })
    }

    setTableOfContents(headings)
  }, [post.content])

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={post.title} description={post.excerpt} />

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="md:w-3/4">
          <div className="flex items-center mb-6 space-x-4">
            <div className="relative w-12 h-12">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-white">{post.author.name}</h3>
                {post.author.verified && (
                  <Badge variant="outline" className="ml-2 bg-blue-900 text-blue-100 border-blue-700">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-400">{post.author.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <Badge key={index} className="bg-blue-900 text-blue-100">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center text-sm text-gray-400 mb-8">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
            <span className="mx-2">•</span>
            <span>{post.views} views</span>
          </div>

          <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="flex items-center justify-between border-t border-gray-800 pt-6 mb-12">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                <Heart className="h-5 w-5" />
                <span>{post.likes} Likes</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments} Comments</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                <Share2 className="h-5 w-5" />
                <span>{post.shares} Shares</span>
              </Button>
            </div>
            <div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">Subscribe to Updates</Button>
            </div>
          </div>

          <BlogComments postId={post.id} />
        </div>

        <div className="md:w-1/4">
          <div className="sticky top-24">
            <TableOfContents items={tableOfContents} />

            <div className="mt-8 p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Join Optimus AI</h3>
              <p className="text-gray-400 mb-4">
                Get access to AI-powered investment tools and exclusive fundraising opportunities.
              </p>
              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Sign Up Now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <RelatedPosts currentPostId={post.id} />
      </div>
    </div>
  )
}

