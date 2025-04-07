"use client"

import { useState, useCallback } from "react"

type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: T[K], formData: T) => boolean
    message?: string
  }
}

type ValidationErrors<T> = {
  [K in keyof T]?: string
}

export function useFormValidation<T extends Record<string, any>>(initialData: T, validationRules: ValidationRules<T>) {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<ValidationErrors<T>>({})
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const validateField = useCallback(
    (name: keyof T, value: any): string | undefined => {
      const rules = validationRules[name]
      if (!rules) return undefined

      if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return rules.message || `${String(name)} is required`
      }

      if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
        return rules.message || `${String(name)} must be at least ${rules.minLength} characters`
      }

      if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
        return rules.message || `${String(name)} must be less than ${rules.maxLength} characters`
      }

      if (rules.pattern && typeof value === "string" && !rules.pattern.test(value)) {
        return rules.message || `${String(name)} has an invalid format`
      }

      if (rules.custom && !rules.custom(value, data)) {
        return rules.message || `${String(name)} is invalid`
      }

      return undefined
    },
    [data, validationRules],
  )

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setData((prev) => ({ ...prev, [name]: value }))
      setIsDirty(true)

      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    },
    [validateField],
  )

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors<T> = {}
    let isValid = true

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T
      const error = validateField(fieldName, data[fieldName])

      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [data, validateField, validationRules])

  const resetForm = useCallback(() => {
    setData(initialData)
    setErrors({})
    setIsDirty(false)
  }, [initialData])

  return {
    data,
    errors,
    isDirty,
    handleChange,
    validateForm,
    resetForm,
    setData,
  }
}

