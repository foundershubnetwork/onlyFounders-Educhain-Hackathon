import { cn } from "@/lib/utils"
import type React from "react"
interface ResponsiveSectionProps {
  children: React.ReactNode
  className?: string
}

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveSection({ children, className }: ResponsiveSectionProps) {
  return <section className={cn("w-full py-6", className)}>{children}</section>
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return <div className={cn("container mx-auto px-4", className)}>{children}</div>
}

