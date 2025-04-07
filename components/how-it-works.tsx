import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Rocket, Shield } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Lightbulb className="h-10 w-10 text-blue-400" />,
      title: "Submit Your Project",
      description:
        "Create a detailed profile for your blockchain project, including team information, tokenomics, and roadmap.",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-400" />,
      title: "AI Verification",
      description:
        "Our AI system verifies your project based on team credentials, project viability, and security considerations.",
    },
    {
      icon: <Users className="h-10 w-10 text-cyan-400" />,
      title: "Connect with Investors",
      description: "Get matched with investors interested in your project category and funding stage.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-amber-400" />,
      title: "Secure Funding",
      description: "Receive USDC funding directly to your project wallet and start building your vision.",
    },
  ]

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400">
            Optimus AI simplifies the fundraising process for blockchain projects with our AI-powered platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                <div className="mt-4 text-2xl font-bold text-blue-400">{index + 1}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

