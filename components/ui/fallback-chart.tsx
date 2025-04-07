import { LineChart } from "lucide-react"

interface FallbackChartProps {
  message?: string
}

export function FallbackChart({ message = "Chart data unavailable" }: FallbackChartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-purple-900/30 rounded-lg border border-purple-800/20 p-6">
      <LineChart className="h-12 w-12 text-purple-200/70 mb-4" />
      <p className="text-purple-200/70 text-center">{message}</p>
    </div>
  )
}

