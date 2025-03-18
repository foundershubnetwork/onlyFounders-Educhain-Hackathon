import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      <h2 className="text-xl font-medium text-white mt-4">Loading...</h2>
      <p className="text-gray-400 mt-2">Please wait while we fetch the data</p>
    </div>
  )
}

