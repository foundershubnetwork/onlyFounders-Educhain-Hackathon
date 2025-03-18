import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Optimus AI helped us raise $2M in just 3 weeks. The AI-powered investor matching was incredibly effective in connecting us with the right backers for our DeFi protocol.",
      author: {
        name: "Sarah Johnson",
        role: "Founder & CEO, DecentraVault",
        avatar: "/placeholder.svg?height=64&width=64",
      },
    },
    {
      quote:
        "As an investor, I appreciate the thorough verification process that Optimus AI employs. It gives me confidence that I'm backing legitimate projects with real potential.",
      author: {
        name: "David Kim",
        role: "Angel Investor, Crypto Ventures",
        avatar: "/placeholder.svg?height=64&width=64",
      },
    },
    {
      quote:
        "The platform's AI-driven analytics helped us refine our tokenomics model, which was crucial for our successful fundraising round. Highly recommended for any Web3 startup.",
      author: {
        name: "Michael Chen",
        role: "CTO, MetaCanvas",
        avatar: "/placeholder.svg?height=64&width=64",
      },
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-400">Hear from founders and investors who have successfully used Optimus AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.author.avatar} />
                    <AvatarFallback>
                      {testimonial.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{testimonial.author.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.author.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

