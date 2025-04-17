'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error() {
  const router = useRouter()

  useEffect(() => {
    // redirect to home after error
    router.push('/')
  }, [])

  return null // or loading spinner
}