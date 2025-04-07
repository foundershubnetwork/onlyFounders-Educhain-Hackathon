"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { TableOfContents } from "@/components/table-of-contents"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Download, ThumbsUp, Share2, Bookmark } from "lucide-react"
import RelatedGuides from "@/components/related-guides"

export default function GuideDetailPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [likes, setLikes] = useState(42)

  // Mock guide data
  const guide = {
    id: params.id,
    title: "How to Structure Your Startup for Web3 Fundraising",
    excerpt:
      "Learn the essential steps to prepare your startup for a successful fundraising round in the Web3 ecosystem.",
    coverImage: "/placeholder.svg?height=400&width=800",
    readTime: 12,
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Investment Advisor",
      verified: true,
    },
    category: "Fundraising",
    difficulty: "Beginner",
    publishedDate: "November 10, 2023",
    updatedDate: "November 15, 2023",
    content: `
      <p>Fundraising in the Web3 space presents unique challenges and opportunities compared to traditional startup funding. This comprehensive guide will walk you through the essential steps to structure your startup for a successful Web3 fundraising round.</p>

      <h2>Understanding Web3 Fundraising Models</h2>
      
      <p>Before diving into the structuring process, it's important to understand the various fundraising models available in the Web3 ecosystem:</p>
      
      <ul>
        <li><strong>Token Sales:</strong> Offering utility or governance tokens to investors</li>
        <li><strong>Equity Fundraising:</strong> Traditional equity investment with blockchain-based cap tables</li>
        <li><strong>Hybrid Models:</strong> Combining token and equity components</li>
        <li><strong>DAO-based Funding:</strong> Raising from decentralized autonomous organizations</li>
        <li><strong>NFT-based Fundraising:</strong> Using NFTs to represent investment shares or benefits</li>
      </ul>
      
      <p>Each model has its own regulatory considerations, investor expectations, and structural requirements. Your choice should align with your project's goals, timeline, and target investor base.</p>

      <h2>Legal Structure and Jurisdiction</h2>
      
      <p>Selecting the right legal structure and jurisdiction is crucial for Web3 startups. Consider the following factors:</p>
      
      <h3>Entity Types</h3>
      
      <ul>
        <li><strong>Foundation:</strong> Common for protocol-focused projects seeking decentralization</li>
        <li><strong>Corporation:</strong> Traditional structure with clear equity distribution</li>
        <li><strong>LLC:</strong> Flexible structure with pass-through taxation</li>
        <li><strong>DAO LLC:</strong> Legal wrapper for DAOs (available in Wyoming and other jurisdictions)</li>
      </ul>
      
      <h3>Jurisdiction Considerations</h3>
      
      <p>When selecting a jurisdiction, evaluate:</p>
      
      <ul>
        <li>Regulatory clarity regarding digital assets</li>
        <li>Tax implications for the entity and token holders</li>
        <li>Banking access and financial services availability</li>
        <li>Investor perception and comfort</li>
        <li>Long-term operational requirements</li>
      </ul>
      
      <p>Popular jurisdictions for Web3 projects include Switzerland, Singapore, the Cayman Islands, and increasingly, Dubai and Portugal. Each offers different advantages and considerations.</p>

      <h2>Tokenomics Design</h2>
      
      <p>If your fundraising strategy involves tokens, designing a sustainable tokenomics model is essential. Key components include:</p>
      
      <h3>Token Utility and Value Accrual</h3>
      
      <p>Clearly define how your token creates and captures value:</p>
      
      <ul>
        <li>Access to platform features or services</li>
        <li>Governance rights over protocol decisions</li>
        <li>Staking rewards and yield generation</li>
        <li>Fee sharing or buyback-and-burn mechanisms</li>
        <li>Work or participation incentives</li>
      </ul>
    `,
    downloads: [
      {
        title: "Web3 Fundraising Checklist",
        description: "A comprehensive checklist to prepare for your fundraising round",
        fileType: "PDF",
        fileSize: "1.2 MB",
        url: "#",
      },
      {
        title: "Tokenomics Template",
        description: "Excel template for modeling token distribution and vesting",
        fileType: "XLSX",
        fileSize: "850 KB",
        url: "#",
      },
    ],
    relatedGuides: [
      {
        id: "2",
        title: "Tokenomics Design for Early-Stage Startups",
        excerpt:
          "A comprehensive guide to designing effective tokenomics that attract investors and build a sustainable ecosystem.",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: 18,
        author: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        category: "Tokenomics",
        difficulty: "Intermediate",
      },
      {
        id: "3",
        title: "Legal Considerations for Web3 Fundraising",
        excerpt: "Navigate the complex regulatory landscape of token sales and blockchain-based fundraising.",
        coverImage: "/placeholder.svg?height=200&width=400",
        readTime: 15,
        author: {
          name: "Michael Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        category: "Legal",
        difficulty: "Intermediate",
      },
    ],
  }

  // Generate table of contents from content
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string }[]>([])

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /<h2>(.*?)<\/h2>/g
    const headings: { id: string; title: string }[] = []
    let match

    while ((match = headingRegex.exec(guide.content)) !== null) {
      const title = match[1]
      const id = title.toLowerCase().replace(/\s+/g, "-")
      headings.push({ id, title })
    }

    setTableOfContents(headings)
  }, [guide.content])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1)
      setHasLiked(true)
    } else {
      setLikes(likes - 1)
      setHasLiked(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600"
      case "Intermediate":
        return "bg-yellow-600"
      case "Advanced":
        return "bg-red-600"
      default:
        return "bg-blue-600"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Link href="/resources/guides">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-gray-400">Back to Guides</span>
      </div>

      <PageHeader title={guide.title} description={guide.excerpt} />

      <div className="relative rounded-xl overflow-hidden h-[300px] my-8">
        <Image src={guide.coverImage || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className="bg-blue-600">{guide.category}</Badge>
            <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{guide.readTime} min read</span>
            <span className="mx-2">•</span>
            <span>Published: {guide.publishedDate}</span>
            {guide.updatedDate && (
              <>
                <span className="mx-2">•</span>
                <span>Updated: {guide.updatedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="flex items-center mb-6 space-x-4">
            <div className="relative h-12 w-12">
              <Image
                src={guide.author.avatar || "/placeholder.svg"}
                alt={guide.author.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-white">{guide.author.name}</h3>
                {guide.author.verified && (
                  <Badge variant="outline" className="ml-2 bg-blue-900/20 text-blue-400 border-blue-800">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-400">{guide.author.role}</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: guide.content }} />

          {guide.downloads && guide.downloads.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Resources & Downloads</h3>
              <div className="space-y-4">
                {guide.downloads.map((download, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600 p-2 rounded">
                        <Download className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{download.title}</h4>
                        <p className="text-gray-400 text-sm">{download.description}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{download.fileType}</span>
                          <span className="mx-2">•</span>
                          <span>{download.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <a href={download.url} download>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-800 pt-6 mb-12">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${hasLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-5 w-5" fill={hasLiked ? "currentColor" : "none"} />
                <span>{likes} Likes</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${isBookmarked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"}`}
                onClick={handleBookmark}
              >
                <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="sticky top-24">
            <TableOfContents items={tableOfContents} />

            <div className="mt-8 p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Join Optimus AI</h3>
              <p className="text-gray-400 mb-4">
                Get access to premium guides, tools, and resources for Web3 fundraising.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Access Premium Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <RelatedGuides guides={guide.relatedGuides} currentGuideId={guide.id} />
      </div>
    </div>
  )
}

