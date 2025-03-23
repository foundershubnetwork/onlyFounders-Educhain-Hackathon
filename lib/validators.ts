import type { ProfileData, ValidationError } from "@/types/profile"
import { validateUrl } from "@/utils/validation"

export const validateProfileData = (data: ProfileData): ValidationError[] => {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Name is required" })
  }

  // Title validation
  if (!data.title.trim()) {
    errors.push({ field: "title", message: "Professional title is required" })
  }

  // Bio validation
  if (!data.bio.trim()) {
    errors.push({ field: "bio", message: "Bio is required" })
  } else if (data.bio.length < 10) {
    errors.push({ field: "bio", message: "Bio must be at least 10 characters" })
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

  // Skills validation
  if (data.skills.length === 0) {
    errors.push({ field: "skills", message: "Please add at least one skill" })
  } else if (data.skills.length > 3) {
    errors.push({ field: "skills", message: "Maximum 3 skills allowed" })
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

