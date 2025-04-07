import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  const dimension = sizes[size]

  return (
    <Link href="/" className={className}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHN%20Logo%20Space%20Blue.png-qBdtLaq52TlhdNDRniiT3zDpRaNmIB.jpeg"
        alt="Optimus AI Logo"
        width={dimension}
        height={dimension}
        className="object-contain"
        priority
      />
    </Link>
  )
}

