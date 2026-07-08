import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { ApiErrorResponse, ApiResponse, ApiSuccessResponse } from "../types/api"

export const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Generic API request wrapper using Axios.
 * 
 * @param endpoint The API path or URL
 * @param method HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param params Query parameters (optional)
 * @param body Request body payload (optional)
 * @param headers Request headers (optional)
 * @returns Generic API success or error response object
 */
export async function apiRequest<T>(
  endpoint: string,
  method: AxiosRequestConfig["method"],
  body?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<ApiResponse<T>> {
  try {
    const isServer = typeof window === "undefined"

    if(isServer){
      const {cookies, headers: nextHeaders} = await import("next/headers")
      const cookieStore = (await cookies()).getAll()
      const clientIp = (await nextHeaders()).get("x-forwarded-for") || ""
      const userAgent = (await nextHeaders()).get("user-agent") || ""
      const referer = (await nextHeaders()).get("referer") || ""
      
      headers = {
        ...headers,
        Cookie: cookieStore.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
        "X-Forwarded-For": clientIp,
        "User-Agent": userAgent,
        "Referer": referer,
      }
    }

    const response = await axios({
      url: endpoint,
      method,
      params,
      data: body,
      headers,
      withCredentials: true,
    })
    
    return response.data as ApiSuccessResponse<T>
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      
      // If unauthorized (401) and on a protected route, force-redirect to login page
      if (axiosError.response?.status === 401) {
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/dashboard")) {
          window.location.href = `/get-started?redirect=${encodeURIComponent(window.location.pathname)}`
        }
      }

      // If the backend returned a formatted error response, return it directly
      if (axiosError.response?.data) {
        return axiosError.response.data
      }

      // Fallback for network error / no response
      return {
        success: false,
        message: axiosError.message,
        error: {
          details: "Network error or no response received from the server",
        },
      }
    }

    // Fallback for non-axios/native exceptions
    const nativeError = error as Error
    return {
      success: false,
      message: nativeError.message || "An unexpected error occurred",
      error: {
        details: nativeError.stack || "Native Error stack trace unavailable",
      },
    }
  }
}