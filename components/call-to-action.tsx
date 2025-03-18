import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CallToActionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  accentColor: string
}

export default function CallToAction({ title, description, buttonText, buttonLink, accentColor }: CallToActionProps) {
  return (
    <div className={`rounded-xl p-8 ${accentColor}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-200">{description}</p>
        </div>
        <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}

