"use client"

import { useState, useReducer, useCallback } from "react"
import type { ServiceProviderProfileData, ValidationError } from "@/types/service-provider-profile"
import { validateUrl } from "@/utils/validation"

type FormState = {
  data: ServiceProviderProfileData
  errors: ValidationError[]
  isDirty: boolean
  isSubmitting: boolean
  searchQuery: string
  profileImage: string | null
  bannerImage: string | null
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_COMPANY_SOCIAL"; field: string; value: string }
  | { type: "SET_PERSONAL_SOCIAL"; field: string; value: string }
  | { type: "SET_SEARCH_QUERY"; value: string }
  | { type: "SET_PROFILE_IMAGE"; image: string | null }
  | { type: "SET_BANNER_IMAGE"; image: string | null }
  | { type: "VALIDATE_FORM" }
  | { type: "SET_ERRORS"; errors: ValidationError[] }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "RESET_FORM"; data: ServiceProviderProfileData; profileImage: string | null; bannerImage: string | null }

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      // If setting serviceCategory to empty, use the first option from serviceCategories
      if (action.field === "serviceCategory" && !action.value) {
        const { serviceCategories } = require("@/data/service-provider-data")
        return {
          ...state,
          data: { ...state.data, [action.field]: serviceCategories[0] },
          isDirty: true,
        }
      }
      // If setting pricingModel to empty, use the first option from pricingModels
      if (action.field === "pricingModel" && !action.value) {
        const { pricingModels } = require("@/data/service-provider-data")
        return {
          ...state,
          data: { ...state.data, [action.field]: pricingModels[0] },
          isDirty: true,
        }
      }
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        isDirty: true,
      }
    case "SET_COMPANY_SOCIAL":
      return {
        ...state,
        data: {
          ...state.data,
          companySocial: { ...state.data.companySocial, [action.field]: action.value },
        },
        isDirty: true,
      }
    case "SET_PERSONAL_SOCIAL":
      return {
        ...state,
        data: {
          ...state.data,
          personalSocial: { ...state.data.personalSocial, [action.field]: action.value },
        },
        isDirty: true,
      }
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.value,
      }
    case "SET_PROFILE_IMAGE":
      return {
        ...state,
        profileImage: action.image,
        isDirty: true,
      }
    case "SET_BANNER_IMAGE":
      return {
        ...state,
        bannerImage: action.image,
        isDirty: true,
      }
    case "VALIDATE_FORM":
      return {
        ...state,
        errors: validateServiceProviderData(state.data),
      }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      }
    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
      }
    case "SUBMIT_END":
      return {
        ...state,
        isSubmitting: false,
        isDirty: false,
      }
    case "RESET_FORM":
      return {
        ...state,
        data: action.data,
        profileImage: action.profileImage,
        bannerImage: action.bannerImage,
        errors: [],
        isDirty: false,
        isSubmitting: false,
        searchQuery: "",
      }
    default:
      return state
  }
}

// Validation function for service provider profile data
const validateServiceProviderData = (data: ServiceProviderProfileData): ValidationError[] => {
  const errors: ValidationError[] = []

  // Personal Information validation
  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Name is required" })
  }

  if (!data.title.trim()) {
    errors.push({ field: "title", message: "Professional title is required" })
  }

  if (!data.bio.trim()) {
    errors.push({ field: "bio", message: "Bio is required" })
  } else if (data.bio.length < 10) {
    errors.push({ field: "bio", message: "Bio must be at least 10 characters" })
  } else if (data.bio.length > 500) {
    errors.push({ field: "bio", message: "Bio must be less than 500 characters" })
  }

  if (!data.location) {
    errors.push({ field: "location", message: "Location is required" })
  }

  // Business Information validation
  if (!data.businessName.trim()) {
    errors.push({ field: "businessName", message: "Business name is required" })
  }

  if (!data.serviceProviderName.trim()) {
    errors.push({ field: "serviceProviderName", message: "Service provider name is required" })
  }

  if (!data.businessEmail.trim()) {
    errors.push({ field: "businessEmail", message: "Business email is required" })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.businessEmail)) {
    errors.push({ field: "businessEmail", message: "Please enter a valid email address" })
  }

  if (!data.serviceCategory) {
    errors.push({ field: "serviceCategory", message: "Service category is required" })
  }

  if (!data.serviceDescription.trim()) {
    errors.push({ field: "serviceDescription", message: "Service description is required" })
  } else if (data.serviceDescription.length < 10) {
    errors.push({ field: "serviceDescription", message: "Service description must be at least 10 characters" })
  }

  if (!data.pricingModel) {
    errors.push({ field: "pricingModel", message: "Pricing model is required" })
  }

  // Website validation
  if (data.website) {
    const websiteUrl = data.website.startsWith("http") ? data.website : `https://${data.website}`
    if (validateUrl("website", websiteUrl) === "invalid") {
      errors.push({ field: "website", message: "Please enter a valid website domain" })
    }
  }

  // Social media validation
  // Company social media
  if (data.companySocial.twitter) {
    const twitterHandle = data.companySocial.twitter.startsWith("@")
      ? data.companySocial.twitter
      : `@${data.companySocial.twitter}`
    if (validateUrl("twitter", twitterHandle) === "invalid") {
      errors.push({ field: "companySocial.twitter", message: "Please enter a valid Twitter username" })
    }
  }

  if (data.companySocial.linkedin) {
    const linkedinUrl = data.companySocial.linkedin.includes("linkedin.com")
      ? data.companySocial.linkedin
      : `https://www.linkedin.com/company/${data.companySocial.linkedin}`
    if (validateUrl("linkedin", linkedinUrl) === "invalid") {
      errors.push({ field: "companySocial.linkedin", message: "Please enter a valid LinkedIn URL" })
    }
  }

  // Personal social media
  if (data.personalSocial.twitter) {
    const twitterHandle = data.personalSocial.twitter.startsWith("@")
      ? data.personalSocial.twitter
      : `@${data.personalSocial.twitter}`
    if (validateUrl("twitter", twitterHandle) === "invalid") {
      errors.push({ field: "personalSocial.twitter", message: "Please enter a valid Twitter username" })
    }
  }

  if (data.personalSocial.linkedin) {
    const linkedinUrl = data.personalSocial.linkedin.includes("linkedin.com")
      ? data.personalSocial.linkedin
      : `https://www.linkedin.com/in/${data.personalSocial.linkedin}`
    if (validateUrl("linkedin", linkedinUrl) === "invalid") {
      errors.push({ field: "personalSocial.linkedin", message: "Please enter a valid LinkedIn URL" })
    }
  }

  return errors
}

export const useServiceProviderForm = (
  initialData: ServiceProviderProfileData,
  initialProfileImage: string | null = null,
  initialBannerImage: string | null = null,
) => {
  const [state, dispatch] = useReducer(formReducer, {
    data: initialData,
    errors: [],
    isDirty: false,
    isSubmitting: false,
    searchQuery: "",
    profileImage: initialProfileImage,
    bannerImage: initialBannerImage,
  })

  const [savedData, setSavedData] = useState<ServiceProviderProfileData>(initialData)
  const [savedProfileImage, setSavedProfileImage] = useState<string | null>(initialProfileImage)
  const [savedBannerImage, setSavedBannerImage] = useState<string | null>(initialBannerImage)

  const setField = useCallback((field: string, value: any) => {
    dispatch({ type: "SET_FIELD", field, value })
  }, [])

  const setCompanySocial = useCallback((field: string, value: string) => {
    dispatch({ type: "SET_COMPANY_SOCIAL", field, value })
  }, [])

  const setPersonalSocial = useCallback((field: string, value: string) => {
    dispatch({ type: "SET_PERSONAL_SOCIAL", field, value })
  }, [])

  const setSearchQuery = useCallback((value: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", value })
  }, [])

  const setProfileImage = useCallback((image: string | null) => {
    dispatch({ type: "SET_PROFILE_IMAGE", image })
  }, [])

  const setBannerImage = useCallback((image: string | null) => {
    dispatch({ type: "SET_BANNER_IMAGE", image })
  }, [])

  const validateForm = useCallback(() => {
    const errors = validateServiceProviderData(state.data)
    dispatch({ type: "SET_ERRORS", errors })
    return errors.length === 0
  }, [state.data])

  const resetForm = useCallback(() => {
    dispatch({
      type: "RESET_FORM",
      data: savedData,
      profileImage: savedProfileImage,
      bannerImage: savedBannerImage,
    })
  }, [savedData, savedProfileImage, savedBannerImage])

  const saveForm = useCallback(async () => {
    // Validate all fields
    if (!validateForm()) return false

    dispatch({ type: "SUBMIT_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSavedData(state.data)
    setSavedProfileImage(state.profileImage)
    setSavedBannerImage(state.bannerImage)
    dispatch({ type: "SUBMIT_END" })

    return true
  }, [state.data, state.profileImage, state.bannerImage, validateForm])

  const getFieldError = useCallback(
    (field: string) => {
      return state.errors.find((error) => error.field === field)?.message
    },
    [state.errors],
  )

  return {
    formData: state.data,
    savedData,
    errors: state.errors,
    isDirty: state.isDirty,
    isSubmitting: state.isSubmitting,
    searchQuery: state.searchQuery,
    profileImage: state.profileImage,
    bannerImage: state.bannerImage,
    setField,
    setCompanySocial,
    setPersonalSocial,
    setSearchQuery,
    setProfileImage,
    setBannerImage,
    validateForm,
    resetForm,
    saveForm,
    getFieldError,
  }
}

