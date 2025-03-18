import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ArrowRight } from "lucide-react"

interface RelatedPostsProps {
  currentPostId: string
}

export default function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  // Mock data for related posts
  const relatedPosts = [
    {
      id: "2",
      title: "Tokenomics 101: Designing Sustainable Token Economics",
      excerpt: "A comprehensive guide to creating effective tokenomics models for your blockchain project",
      image: "/placeholder.svg?height=200&width=400",
      category: "Guide",
      date: "Nov 10, 2023",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "CTO",
      },
      readTime: "12 min read",
    },
    {
      id: "3",
      title: "Smart Contract Security: Best Practices for Founders",
      excerpt: "Essential security considerations for developing robust smart contracts",
      image: "/placeholder.svg?height=200&width=400",
      category: "Security",
      date: "Nov 5, 2023",
      author: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Security Expert",
      },
      readTime: "10 min read",
    },
    {
      id: "4",
      title: "Building a Community Around Your Web3 Project",
      excerpt: "Strategies for growing and engaging your blockchain project community",
      image: "/placeholder.svg?height=200&width=400",
      category: "Community",
      date: "Oct 28, 2023",
      author: {
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Community Manager",
      },
      readTime: "7 min read",
    },
  ].filter((post) => post.id !== currentPostId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Related Articles</h2>
        <Link href="/blog" className="text-blue-400 flex items-center hover:text-blue-300">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      post.category === "Insights"
                        ? "bg-purple-900/30 text-purple-400 border-purple-800"
                        : post.category === "Guide"
                          ? "bg-blue-900/30 text-blue-400 border-blue-800"
                          : post.category === "Security"
                            ? "bg-red-900/30 text-red-400 border-red-800"
                            : post.category === "Community"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-gray-800 text-gray-400"
                    }`}
                >
                  {post.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
              </div>
              <CardTitle className="text-lg text-white">{post.title}</CardTitle>
              <CardDescription className="text-gray-400 line-clamp-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center border-t border-gray-800 pt-4">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs text-gray-400">{post.author.name}</div>
              </div>
              <div className="text-xs text-gray-400">{post.readTime}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

