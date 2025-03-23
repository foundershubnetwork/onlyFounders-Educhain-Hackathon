"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message?: string
  className?: string
  animate?: boolean
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className, animate = true }) => {
  if (!message) return null

  if (animate) {
    return (
      <motion.div
        className={cn("mt-1.5 text-sm text-red-500 flex items-center gap-1", className)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle size={14} />
        <span>{message}</span>
      </motion.div>
    )
  }

  return (
    <div className={cn("mt-1.5 text-sm text-red-500 flex items-center gap-1", className)}>
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  )
}

