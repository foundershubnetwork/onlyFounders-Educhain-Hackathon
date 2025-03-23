import { z } from "zod"

export const CommonConfigSchema = z.object({
  BASE_URL: z.string().url(),
  DEV_MODE: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  SURVEY_APPLICATION_VERIDA_DID: z.string(),
  VERIDA_VAULT_BASE_URL: z.string().url(),
  DATA_PROCESSING_ENDPOINT_URL: z.string().url(),
  SURVEY_DATA_SCHEMA_ID: z.string(),
  isClient: z.boolean(),
  appVersion: z.string(),
})

export const ServerConfigSchema = z.object({
  // ... any server-specific properties
})
