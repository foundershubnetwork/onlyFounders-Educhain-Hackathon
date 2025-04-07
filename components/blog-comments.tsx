"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, Reply } from "lucide-react"

interface BlogCommentsProps {
  postId: string
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock comments data
  const comments = [
    {
      id: "1",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Investor",
        verified: true,
      },
      content:
        "This is a great article! I've been looking for a comprehensive guide on AI-powered due diligence. The section on tokenomics simulation is particularly insightful.",
      date: "2 days ago",
      likes: 12,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Author",
            verified: true,
          },
          content:
            "Thanks for your feedback, David! I'm glad you found the tokenomics section helpful. I'll be expanding on that topic in a future article.",
          date: "1 day ago",
          likes: 3,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Founder",
        verified: false,
      },
      content:
        "I'm curious about how AI can help with team verification. Are there any specific tools or platforms you recommend for this purpose?",
      date: "3 days ago",
      likes: 8,
      replies: [],
    },
  ]

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsSubmitting(true)
    // In a real app, this would make an API call to submit the comment
    setTimeout(() => {
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>
                    {comment.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium text-white">{comment.user.name}</h4>
                    {comment.user.verified && (
                      <Badge variant="outline" className="ml-2 bg-blue-900/20 text-blue-400 border-blue-800">
                        Verified
                      </Badge>
                    )}
                    <span className="ml-auto text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm text-gray-400">{comment.user.role}</p>
                  <p className="mt-2 text-gray-300">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                      <Reply className="mr-1 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {comment.replies.map((reply) => (
              <div key={reply.id} className="bg-gray-800 rounded-lg p-4 ml-12">
                <div className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.user.avatar} />
                    <AvatarFallback>
                      {reply.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-white">{reply.user.name}</h4>
                      {reply.user.verified && (
                        <Badge variant="outline" className="ml-2 bg-blue-900/20 text-blue-400 border-blue-800">
                          Verified
                        </Badge>
                      )}
                      <span className="ml-auto text-xs text-gray-400">{reply.date}</span>
                    </div>
                    <p className="text-sm text-gray-400">{reply.user.role}</p>
                    <p className="mt-2 text-gray-300">{reply.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

