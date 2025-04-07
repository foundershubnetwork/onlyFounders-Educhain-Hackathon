"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"

interface UseOptimizedInputOptions {
  initialValue: string
  debounceTime?: number
  onChange?: (value: string) => void
}

export function useOptimizedInput({ initialValue, debounceTime = 300, onChange }: UseOptimizedInputOptions) {
  // Local state for immediate UI updates
  const [localValue, setLocalValue] = useState(initialValue)

  // Ref to track the timeout
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Ref to track the latest value for the callback
  const valueRef = useRef(initialValue)

  // Update local value when initialValue changes (e.g., form reset)
  useEffect(() => {
    setLocalValue(initialValue)
  }, [initialValue])

  // Handle input change with debouncing
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value

      // Update local value immediately for responsive UI
      setLocalValue(newValue)

      // Store the latest value in ref
      valueRef.current = newValue

      // Clear any existing timeout
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Set a new timeout for the debounced update
      debounceTimerRef.current = setTimeout(() => {
        if (onChange) {
          onChange(valueRef.current)
        }
      }, debounceTime)
    },
    [onChange, debounceTime],
  )

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return {
    value: localValue,
    handleChange,
    setValue: setLocalValue,
  }
}

