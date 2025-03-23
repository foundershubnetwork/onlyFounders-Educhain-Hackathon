// URL validation patterns
export const urlPatterns = {
  twitter: /^@?([a-zA-Z0-9_]{1,15})$/,
  linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_-]{1,100}\/?$/,
  github: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}\/?$/,
  website: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/.*)?$/,
}

export type ValidationStatus = "valid" | "invalid" | "pending"

// Extract username from full URL
export const extractUsername = (type: "twitter" | "linkedin" | "github", value: string): string => {
  if (!value.trim()) return ""

  switch (type) {
    case "twitter":
      // Remove @ if present
      return value.startsWith("@") ? value.substring(1) : value
    case "linkedin":
      // Extract username from LinkedIn URL (personal or company)
      if (value.includes("/company/")) {
        const companyMatch = value.match(/linkedin\.com\/company\/([a-zA-Z0-9_-]{1,100})/)
        return companyMatch ? companyMatch[1] : value
      } else {
        const linkedinMatch = value.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]{1,100})/)
        return linkedinMatch ? linkedinMatch[1] : value
      }
    case "github":
      // Extract username from GitHub URL
      const githubMatch = value.match(/github\.com\/([a-zA-Z0-9][a-zA-Z0-9-]{0,38})/)
      return githubMatch ? githubMatch[1] : value
    default:
      return value
  }
}

// Format URL for display and storage
export const formatUrl = (type: "twitter" | "linkedin" | "github" | "website", value: string): string => {
  if (!value.trim()) return ""

  switch (type) {
    case "twitter":
      // Store Twitter handle without @
      return value.startsWith("@") ? value.substring(1) : value
    case "linkedin":
      // Store LinkedIn username only (handle both personal and company URLs)
      if (value.includes("/company/")) {
        const companyMatch = value.match(/linkedin\.com\/company\/([a-zA-Z0-9_-]{1,100})/)
        return companyMatch ? companyMatch[1] : value
      } else {
        const linkedinMatch = value.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]{1,100})/)
        return linkedinMatch ? linkedinMatch[1] : value
      }
    case "github":
      // Store GitHub username only
      const githubMatch = value.match(/github\.com\/([a-zA-Z0-9][a-zA-Z0-9-]{0,38})/)
      return githubMatch ? githubMatch[1] : value
    case "website":
      // Ensure website has https:// prefix
      if (value.match(/^https?:\/\//)) {
        return value
      } else if (value.startsWith("www.")) {
        return `https://${value}`
      } else {
        return `https://${value}`
      }
    default:
      return value
  }
}

export const validateUrl = (type: keyof typeof urlPatterns, value: string): ValidationStatus => {
  if (!value.trim()) return "pending"
  return urlPatterns[type].test(value) ? "valid" : "invalid"
}

export const getValidationMessage = (type: keyof typeof urlPatterns, status: ValidationStatus): string => {
  if (status === "pending") return ""
  if (status === "valid") return ""

  switch (type) {
    case "twitter":
      return "Please enter a valid Twitter handle (e.g., @username)"
    case "linkedin":
      return "Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
    case "github":
      return "Please enter a valid GitHub URL (e.g., https://github.com/username)"
    case "website":
      return "Please enter a valid website URL (e.g., https://example.com)"
    default:
      return "Invalid input"
  }
}

export const getValidationColor = (status: ValidationStatus): string => {
  switch (status) {
    case "invalid":
      return "border-red-500 focus:border-red-500"
    default:
      return ""
  }
}

