export interface VeridaUserProfileApiRequest {
  type: "userProfileApiRequest"
  did: string
  purpose: string
  profileJsonSchemaUrl: string
  profileParams?: Record<string, unknown>
  endpointUrl: string
  endpointParams?: Record<string, unknown>
  exposesUserData: boolean
}

export type VeridaRequest = VeridaUserProfileApiRequest
