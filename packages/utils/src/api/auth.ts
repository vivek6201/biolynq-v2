import { API_URL, apiRequest } from ".";
import { OnboardingResponse, VerifyOtpResponse } from "../types/auth";

const endpoint = {
    sendOtp: `${API_URL}/auth/otp/send`,
    verifyOtp: `${API_URL}/auth/otp/verify`,
    onboarding: `${API_URL}/auth/register/complete`,
    googleAuth: `${API_URL}/auth/google/login`,
    checkUsername: `${API_URL}/auth/check-username`,
    logout: `${API_URL}/auth/logout`,
}

export const sendOtp = (email: string) => apiRequest<void>(endpoint.sendOtp, "POST", { email })

export const verifyOtp = (email: string, otp: string) => apiRequest<VerifyOtpResponse>(endpoint.verifyOtp, "POST", { email, otp })

export const onboarding = (username: string, temp_user_id: string) => apiRequest<OnboardingResponse>(endpoint.onboarding, "POST", { username, temp_user_id })

export const googleOAuth = () => apiRequest<void>(endpoint.googleAuth, "GET")

export const checkUsername = (username: string) => apiRequest<void>(endpoint.checkUsername, "POST", { username })

export const logoutUser = () => apiRequest<void>(endpoint.logout, "DELETE")