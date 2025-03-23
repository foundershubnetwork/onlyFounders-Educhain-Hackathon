import { commonConfig } from "@/config/common"
import type { VeridaRequest } from "@/features/verida-request/types"

/**
 * Builds a Verida request object for the Founders Personality Traits survey
 *
 * @returns A Verida request object configured for the personality traits survey
 */
export function buildFoundersPersonalityTraitsSurveyRequest(): VeridaRequest {
  return {
    type: "userProfileApiRequest",
    did: commonConfig.SURVEY_APPLICATION_VERIDA_DID,
    purpose: "We want to survey your personality traits as a founder.",
    profileJsonSchemaUrl: `${commonConfig.BASE_URL}/schemas/founder-personality-traits.json`,
    endpointUrl: commonConfig.DATA_PROCESSING_ENDPOINT_URL,
    endpointParams: {
      schemaId: commonConfig.SURVEY_DATA_SCHEMA_ID,
    },
    exposesUserData: false,
  }
}
