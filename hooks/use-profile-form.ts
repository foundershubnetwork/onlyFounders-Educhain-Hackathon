"use client"

import { useState, useReducer, useCallback } from "react"
import type { ProfileData, ValidationError } from "@/types/profile"
import { validateProfileData } from "@/lib/validators"
import { validateUrl } from "@/utils/validation"

type FormState = {
  data: ProfileData
  errors: ValidationError[]
  isDirty: boolean
  isSubmitting: boolean
  newSkill: string
  searchQuery: string
  profileImage: string | null
  bannerImage: string | null
}

type FormAction =
  | { type: "SET_FIELD"; field: string; value: any }
  | { type: "SET_SOCIAL"; field: string; value: string }
  | { type: "ADD_SKILL" }
  | { type: "REMOVE_SKILL"; skill: string }
  | { type: "SET_NEW_SKILL"; value: string }
  | { type: "SET_SEARCH_QUERY"; value: string }
  | { type: "SET_PROFILE_IMAGE"; image: string | null }
  | { type: "SET_BANNER_IMAGE"; image: string | null }
  | { type: "VALIDATE_FORM" }
  | { type: "SET_ERRORS"; errors: ValidationError[] }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "RESET_FORM"; data: ProfileData; profileImage: string | null; bannerImage: string | null }

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
    case "ADD_SKILL":
      if (
        !state.newSkill.trim() ||
        state.data.skills.includes(state.newSkill.trim()) ||
        state.data.skills.length >= 3
      ) {
        return state
      }
      return {
        ...state,
        data: {
          ...state.data,
          skills: [...state.data.skills, state.newSkill.trim()],
        },
        newSkill: "",
        isDirty: true,
      }
    case "REMOVE_SKILL":
      return {
        ...state,
        data: {
          ...state.data,
          skills: state.data.skills.filter((skill) => skill !== action.skill),
        },
        isDirty: true,
      }
    case "SET_NEW_SKILL":
      return {
        ...state,
        newSkill: action.value,
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
        errors: validateProfileData(state.data),
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
        newSkill: "",
        searchQuery: "",
      }
    default:
      return state
  }
}

export const useProfileForm = (
  initialData: ProfileData,
  initialProfileImage: string | null = null,
  initialBannerImage: string | null = null,
) => {
  const [state, dispatch] = useReducer(formReducer, {
    data: initialData,
    errors: [],
    isDirty: false,
    isSubmitting: false,
    newSkill: "",
    searchQuery: "",
    profileImage: initialProfileImage,
    bannerImage: initialBannerImage,
  })

  const [savedData, setSavedData] = useState<ProfileData>(initialData)
  const [savedProfileImage, setSavedProfileImage] = useState<string | null>(initialProfileImage)
  const [savedBannerImage, setSavedBannerImage] = useState<string | null>(initialBannerImage)

  const setField = useCallback((field: string, value: any) => {
    dispatch({ type: "SET_FIELD", field, value })
  }, [])

  const setSocial = useCallback((field: string, value: string) => {
    dispatch({ type: "SET_SOCIAL", field, value })
  }, [])

  const addSkill = useCallback(() => {
    dispatch({ type: "ADD_SKILL" })
  }, [])

  const removeSkill = useCallback((skill: string) => {
    dispatch({ type: "REMOVE_SKILL", skill })
  }, [])

  const setNewSkill = useCallback((value: string) => {
    dispatch({ type: "SET_NEW_SKILL", value })
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
    const errors = validateProfileData(state.data)
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
    newSkill: state.newSkill,
    searchQuery: state.searchQuery,
    profileImage: state.profileImage,
    bannerImage: state.bannerImage,
    setField,
    setSocial,
    addSkill,
    removeSkill,
    setNewSkill,
    setSearchQuery,
    setProfileImage,
    setBannerImage,
    validateForm,
    resetForm,
    saveForm,
    getFieldError,
  }
}

