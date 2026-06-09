export type VerifyOtpResponse = {
    expires_at?: string
    registered: boolean
    session_id?: string
    temp_user_id?: string
}

export type OnboardingResponse = {
    expires_at: string
    session_id: string
}

export type GoogleAuthPayload = {
    type: "GOOGLE_AUTH_CALLBACK"
    sessionId: string | null
    registered: boolean
    tempUserId: string | null
}