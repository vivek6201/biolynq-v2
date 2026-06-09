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
      const {cookies} = await import("next/headers")
      const cookieStore = (await cookies()).getAll()
      headers = {
        ...headers,
        Cookie: cookieStore.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
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