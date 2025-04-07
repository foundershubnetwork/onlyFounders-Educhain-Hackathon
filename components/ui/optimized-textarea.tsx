"use client"

import type React from "react"
import { memo, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Tooltip, TooltipTrigger, MotionTooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface OptimizedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  error?: string
  tooltip?: string
}

const OptimizedTextarea = memo(({ value, onChange, className, error, tooltip, ...props }: OptimizedTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [showValidation, setShowValidation] = useState(false)

  // Check if textarea has valid content
  useEffect(() => {
    if (value && value.trim().length >= 10) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [value])

  // Show validation only when field is valid and not focused
  useEffect(() => {
    if (isValid && !isFocused) {
      setShowValidation(true)
      // Hide validation after 2 seconds
      const timer = setTimeout(() => {
        setShowValidation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isValid, isFocused])

  return (
    <div className="relative w-full group">
      <motion.textarea
        value={value}
        onChange={onChange}
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-[#534180] bg-[#2E2444] px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5AC8FA] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error && "border-red-500 focus-visible:ring-red-500",
          isValid && showValidation && "border-green-500 focus-visible:ring-green-500",
          className,
        )}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-3 top-3 text-[#B1A9BB] cursor-help opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Info size={16} />
              </div>
            </TooltipTrigger>
            <MotionTooltipContent side="top">{tooltip}</MotionTooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {error && (
        <motion.p
          className="mt-1 text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
})

OptimizedTextarea.displayName = "OptimizedTextarea"

export { OptimizedTextarea }

