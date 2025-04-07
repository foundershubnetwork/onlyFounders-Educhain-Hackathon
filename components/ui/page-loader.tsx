"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface PageLoaderProps {
  text?: string
}

export function PageLoader({ text = "Loading..." }: PageLoaderProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[300px] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <Loader2 className="h-12 w-12 text-[#5AC8FA]" />
      </motion.div>
      <motion.p
        className="mt-4 text-[#B1A9BB]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}

