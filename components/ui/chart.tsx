"use client"

import * as React from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  // Convert config to CSS variables
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, value]) => {
      vars[`--color-${key}`] = value.color
    })
    return vars
  }, [config])

  return (
    <div className={className} style={cssVars} {...props}>
      {children}
    </div>
  )
}

// Simple string-only tooltip content
export function ChartTooltipContent() {
  return null
}

// Simple wrapper for the tooltip
export function ChartTooltip() {
  return null
}

