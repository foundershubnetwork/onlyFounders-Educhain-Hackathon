"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface UseImageUploadOptions {
  initialImage?: string
  onImageChange?: (image: string) => void
}

export function useImageUpload({ initialImage, onImageChange }: UseImageUploadOptions = {}) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [isHovering, setIsHovering] = useState(false)

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Check file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file")
        return
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImage(imageUrl)
        if (onImageChange) {
          onImageChange(imageUrl)
        }
      }
      reader.readAsDataURL(file)
    },
    [onImageChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsHovering(false)

      const file = e.dataTransfer.files?.[0]
      if (!file) return

      // Check file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file")
        return
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImage(imageUrl)
        if (onImageChange) {
          onImageChange(imageUrl)
        }
      }
      reader.readAsDataURL(file)
    },
    [onImageChange],
  )

  return {
    image,
    setImage,
    isHovering,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}

