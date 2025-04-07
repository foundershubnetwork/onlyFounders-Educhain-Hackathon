import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock } from "lucide-react"

interface Guide {
  id: string
  title: string
  excerpt: string
  coverImage: string
  readTime: number
  author: {
    name: string
    avatar: string
  }
  category: string
  difficulty: string
}

interface RelatedGuidesProps {
  guides: Guide[]
  currentGuideId: string
}

export default function RelatedGuides({ guides, currentGuideId }: RelatedGuidesProps) {
  const filteredGuides = guides.filter((guide) => guide.id !== currentGuideId)

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Related Guides</h2>
        <Link href="/resources/guides" className="text-blue-400 flex items-center hover:text-blue-300">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card
            key={guide.id}
            className="bg-gray-900 border-gray-800 overflow-hidden hover:border-blue-600 transition-colors"
          >
            <div className="relative h-48 w-full">
              <Image src={guide.coverImage || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute top-2 left-2">
                <Badge className="bg-blue-600">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Guide
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getDifficultyColor(guide.difficulty)}>{guide.difficulty}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">{guide.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-sm line-clamp-2">{guide.excerpt}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700">
                  {guide.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="mr-1 h-3 w-3" />
                  {guide.readTime} min read
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                <Link href={`/resources/guides/${guide.id}`}>Read Guide</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

