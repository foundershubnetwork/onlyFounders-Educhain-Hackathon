import type { VeridaRequest } from "@/features/verida-request/types"

/**
 * Builds a URL for making a Verida request by encoding the request payload
 *
 * @param request - The Verida request object containing request details like DID, purpose, etc
 * @param veridaVaultBaseUrl - Base URL of the Verida Vault application
 * @returns A URL object with the encoded request payload as a query parameter
 */
export function buildVeridaRequestUrl(
  request: VeridaRequest,
  veridaVaultBaseUrl: string
): URL {
  const url = new URL("/request", veridaVaultBaseUrl)

  // encode base 64 the request
  const encodedRequest = Buffer.from(JSON.stringify(request)).toString("base64")

  url.searchParams.set("payload", encodedRequest)

  return url
}
