import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FeaturedProjects() {
  const projects = [
    {
      id: "decentravault",
      name: "DecentraVault",
      description: "Decentralized storage solution with enhanced security and privacy features",
      raised: "850,000",
      goal: "1,000,000",
      progress: 85,
      category: "Infrastructure",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "metacanvas",
      name: "MetaCanvas",
      description: "Decentralized creative platform for collaborative digital art and NFTs",
      raised: "487,500",
      goal: "750,000",
      progress: 65,
      category: "NFT & Gaming",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "chaingovernance",
      name: "ChainGovernance",
      description: "DAO toolkit for decentralized decision-making and transparent governance",
      raised: "320,000",
      goal: "600,000",
      progress: 53,
      category: "DAO & Governance",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-black/[0.05] to-transparent dark:from-white/[0.05]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover innovative blockchain startups vetted by our AI-powered investment analysis
            </p>
          </div>
          <Link href="/marketplace" className="mt-4 md:mt-0">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/marketplace/project/${project.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                <div className="relative">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {project.category}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{project.progress}% Funded</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {project.raised} / {project.goal} USDC
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">
                        +{Math.floor(Math.random() * 20) + 10}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

