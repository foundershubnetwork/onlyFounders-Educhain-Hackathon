"use client"

import type React from "react"
import { memo, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { ValidationStatus } from "@/utils/validation"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { Tooltip, TooltipTrigger, MotionTooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface OptimizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  icon?: React.ReactNode
  validationStatus?: ValidationStatus
  validationMessage?: string
  tooltip?: string
}

const OptimizedInput = memo(
  ({
    value,
    onChange,
    className,
    icon,
    validationStatus,
    validationMessage,
    tooltip,
    ...props
  }: OptimizedInputProps) => {
    const [showValidation, setShowValidation] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    // Show validation only when field is valid and not focused
    useEffect(() => {
      if (validationStatus === "valid" && !isFocused) {
        setShowValidation(true)
        // Hide validation after 2 seconds
        const timer = setTimeout(() => {
          setShowValidation(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [validationStatus, isFocused])

    const getValidationClasses = () => {
      if (validationStatus === "invalid") {
        return "border-red-500 focus-visible:ring-red-500"
      }
      if (validationStatus === "valid" && showValidation) {
        return "border-green-500 focus-visible:ring-green-500"
      }
      return ""
    }

    return (
      <div className="relative w-full group">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">{icon}</div>}
        <motion.input
          value={value}
          onChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-[#534180] bg-[#2E2444] px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5AC8FA] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            icon && "pl-10",
            getValidationClasses(),
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
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B1A9BB] cursor-help opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Info size={16} />
                </div>
              </TooltipTrigger>
              <MotionTooltipContent side="top">{tooltip}</MotionTooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {validationStatus === "invalid" && validationMessage && (
          <motion.p
            className="mt-1 text-sm text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {validationMessage}
          </motion.p>
        )}
      </div>
    )
  },
)

OptimizedInput.displayName = "OptimizedInput"

export { OptimizedInput }

