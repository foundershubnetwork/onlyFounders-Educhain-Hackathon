"use client"

import { useState, useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0/client"

/**
 * Custom hook to handle authentication readiness state
 * Provides a stable UI state to prevent flickering during auth loading
 */
export function useAuthReady() {
  const { user, isLoading, error } = useUser()
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    // Only set auth as ready when loading is complete
    if (!isLoading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setAuthReady(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return {
    user,
    isLoading,
    error,
    authReady,
  }
}

