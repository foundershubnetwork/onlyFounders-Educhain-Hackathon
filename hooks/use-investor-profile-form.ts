"use client"

import { useState, useReducer, useCallback } from "react"
import type { InvestorProfileData, ValidationError } from "@/types/investor-profile"
import { validateUrl } from "@/utils/validation"

type FormState = {
  data: InvestorProfileData
  errors: ValidationError[]
  isDirty: boolean
  isSubmitting: boolean
  newInterest: string
  searchQuery: string
  profileImage: string | null
  bannerImage: string | null
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_SOCIAL"; field: string; value: string }
  | { type: "ADD_INTEREST"; interest: string }
  | { type: "REMOVE_INTEREST"; interest: string }
  | { type: "SET_NEW_INTEREST"; value: string }
  | { type: "SET_SEARCH_QUERY"; value: string }
  | { type: "SET_PROFILE_IMAGE"; image: string | null }
  | { type: "SET_BANNER_IMAGE"; image: string | null }
  | { type: "VALIDATE_FORM" }
  | { type: "SET_ERRORS"; errors: ValidationError[] }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "RESET_FORM"; data: InvestorProfileData; profileImage: string | null; bannerImage: string | null }

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      // If setting web3Experience to empty, use the first option from experienceOptions
      if (action.field === "web3Experience" && !action.value) {
        const { experienceOptions } = require("@/data/countries")
        return {
          ...state,
          data: { ...state.data, [action.field]: experienceOptions[0] },
          isDirty: true,
        }
      }
      // If setting investorType to empty, use the first option from investorTypes
      if (action.field === "investorType" && !action.value) {
        const { investorTypes } = require("@/data/investor-data")
        return {
          ...state,
          data: { ...state.data, [action.field]: investorTypes[0] },
          isDirty: true,
        }
      }
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        isDirty: true,
      }
    case "SET_SOCIAL":
      return {
        ...state,
        data: {
          ...state.data,
          social: { ...state.data.social, [action.field]: action.value },
        },
        isDirty: true,
      }
    case "ADD_INTEREST":
      if (!action.interest || state.data.interests.includes(action.interest) || state.data.interests.length >= 8) {
        return state
      }
      return {
        ...state,
        data: {
          ...state.data,
          interests: [...state.data.interests, action.interest],
        },
        isDirty: true,
      }
    case "REMOVE_INTEREST":
      return {
        ...state,
        data: {
          ...state.data,
          interests: state.data.interests.filter((interest) => interest !== action.interest),
        },
        isDirty: true,
      }
    case "SET_NEW_INTEREST":
      return {
        ...state,
        newInterest: action.value,
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
        errors: validateInvestorProfileData(state.data),
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
        newInterest: "",
        searchQuery: "",
      }
    default:
      return state
  }
}

// Validation function for investor profile data
const validateInvestorProfileData = (data: InvestorProfileData): ValidationError[] => {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Name is required" })
  }

  // Title validation
  if (!data.title.trim()) {
    errors.push({ field: "title", message: "Professional title is required" })
  }

  // Investor Type validation
  if (!data.investorType) {
    errors.push({ field: "investorType", message: "Investor type is required" })
  }

  // Bio validation
  if (!data.bio.trim()) {
    errors.push({ field: "bio", message: "Bio is required" })
  } else if (data.bio.length < 10) {
    errors.push({ field: "bio", message: "Bio must be at least 10 characters" })
  } else if (data.bio.length > 500) {
    errors.push({ field: "bio", message: "Bio must be less than 500 characters" })
  }

  // Website validation
  if (data.website) {
    const websiteUrl = data.website.startsWith("http") ? data.website : `https://${data.website}`
    if (validateUrl("website", websiteUrl) === "invalid") {
      errors.push({ field: "website", message: "Please enter a valid website domain" })
    }
  }

  // Web3 Experience validation
  if (!data.web3Experience) {
    errors.push({ field: "web3Experience", message: "Please select your experience level" })
  }

  // Investment range validation
  if (data.minInvestment <= 0) {
    errors.push({ field: "minInvestment", message: "Minimum investment must be greater than 0" })
  }

  if (data.maxInvestment <= 0) {
    errors.push({ field: "maxInvestment", message: "Maximum investment must be greater than 0" })
  }

  if (data.minInvestment > data.maxInvestment) {
    errors.push({ field: "minInvestment", message: "Minimum investment cannot be greater than maximum investment" })
  }

  // Interests validation
  if (data.interests.length === 0) {
    errors.push({ field: "interests", message: "Please select at least one investment interest" })
  }

  // Social links validation
  if (data.social.twitter) {
    const twitterHandle = data.social.twitter.startsWith("@") ? data.social.twitter : `@${data.social.twitter}`
    if (validateUrl("twitter", twitterHandle) === "invalid") {
      errors.push({ field: "social.twitter", message: "Please enter a valid Twitter username" })
    }
  }

  if (data.social.linkedin) {
    const linkedinUrl = data.social.linkedin.includes("linkedin.com")
      ? data.social.linkedin
      : `https://www.linkedin.com/in/${data.social.linkedin}`
    if (validateUrl("linkedin", linkedinUrl) === "invalid") {
      errors.push({ field: "social.linkedin", message: "Please enter a valid LinkedIn username" })
    }
  }

  if (data.social.github) {
    const githubUrl = data.social.github.includes("github.com")
      ? data.social.github
      : `https://github.com/${data.social.github}`
    if (validateUrl("github", githubUrl) === "invalid") {
      errors.push({ field: "social.github", message: "Please enter a valid GitHub username" })
    }
  }

  return errors
}

export const useInvestorProfileForm = (
  initialData: InvestorProfileData,
  initialProfileImage: string | null = null,
  initialBannerImage: string | null = null,
) => {
  const [state, dispatch] = useReducer(formReducer, {
    data: initialData,
    errors: [],
    isDirty: false,
    isSubmitting: false,
    newInterest: "",
    searchQuery: "",
    profileImage: initialProfileImage,
    bannerImage: initialBannerImage,
  })

  const [savedData, setSavedData] = useState<InvestorProfileData>(initialData)
  const [savedProfileImage, setSavedProfileImage] = useState<string | null>(initialProfileImage)
  const [savedBannerImage, setSavedBannerImage] = useState<string | null>(initialBannerImage)

  const setField = useCallback((field: string, value: any) => {
    dispatch({ type: "SET_FIELD", field, value })
  }, [])

  const setSocial = useCallback((field: string, value: string) => {
    dispatch({ type: "SET_SOCIAL", field, value })
  }, [])

  const addInterest = useCallback((interest: string) => {
    dispatch({ type: "ADD_INTEREST", interest })
  }, [])

  const removeInterest = useCallback((interest: string) => {
    dispatch({ type: "REMOVE_INTEREST", interest })
  }, [])

  const setNewInterest = useCallback((value: string) => {
    dispatch({ type: "SET_NEW_INTEREST", value })
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
    const errors = validateInvestorProfileData(state.data)
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

    // Additional validation for social media links
    const errors: ValidationError[] = [...state.errors]
    let hasErrors = false

    // Twitter validation
    if (state.data.social.twitter) {
      const twitterHandle = state.data.social.twitter.startsWith("@")
        ? state.data.social.twitter
        : `@${state.data.social.twitter}`
      if (validateUrl("twitter", twitterHandle) === "invalid") {
        errors.push({ field: "social.twitter", message: "Please enter a valid Twitter username" })
        hasErrors = true
      }
    }

    // LinkedIn validation
    if (state.data.social.linkedin) {
      const linkedinUrl = state.data.social.linkedin.includes("linkedin.com")
        ? state.data.social.linkedin
        : `https://www.linkedin.com/in/${state.data.social.linkedin}`
      if (validateUrl("linkedin", linkedinUrl) === "invalid") {
        errors.push({ field: "social.linkedin", message: "Please enter a valid LinkedIn username" })
        hasErrors = true
      }
    }

    // GitHub validation
    if (state.data.social.github) {
      const githubUrl = state.data.social.github.includes("github.com")
        ? state.data.social.github
        : `https://github.com/${state.data.social.github}`
      if (validateUrl("github", githubUrl) === "invalid") {
        errors.push({ field: "social.github", message: "Please enter a valid GitHub username" })
        hasErrors = true
      }
    }

    // Website validation
    if (state.data.website) {
      const websiteUrl = state.data.website.startsWith("http") ? state.data.website : `https://${state.data.website}`
      if (validateUrl("website", websiteUrl) === "invalid") {
        errors.push({ field: "website", message: "Please enter a valid website domain" })
        hasErrors = true
      }
    }

    if (hasErrors) {
      dispatch({ type: "SET_ERRORS", errors })
      return false
    }

    dispatch({ type: "SUBMIT_START" })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSavedData(state.data)
    setSavedProfileImage(state.profileImage)
    setSavedBannerImage(state.bannerImage)
    dispatch({ type: "SUBMIT_END" })

    return true
  }, [state.data, state.profileImage, state.bannerImage, validateForm, state.errors])

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
    newInterest: state.newInterest,
    searchQuery: state.searchQuery,
    profileImage: state.profileImage,
    bannerImage: state.bannerImage,
    setField,
    setSocial,
    addInterest,
    removeInterest,
    setNewInterest,
    setSearchQuery,
    setProfileImage,
    setBannerImage,
    validateForm,
    resetForm,
    saveForm,
    getFieldError,
  }
}

