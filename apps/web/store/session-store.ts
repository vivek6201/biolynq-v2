"use client"

import { create } from "zustand"
import type { UserResponse, UserProfileResponse } from "@workspace/utils/types/users"
import { getUser, getProfile } from "@workspace/utils/api/users"
import { logoutUser } from "@workspace/utils/api/auth"

interface SessionState {
  user: UserResponse | null
  profile: UserProfileResponse | null
  isLoading: boolean
  isFetched: boolean // true once the first successful fetch completes
  error: string | null

  setUser: (user: UserResponse) => void
  setProfile: (profile: UserProfileResponse) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearSession: () => Promise<void>
  fetchSession: () => Promise<UserResponse | null>
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  profile: null,
  isLoading: false,
  isFetched: false,
  error: null,

  setUser: (user) => set({ user, isFetched: true, error: null }),
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearSession: async () => {
    set({ user: null, profile: null, isFetched: false, error: null })
    try {
      await logoutUser()
    } catch {
      // Ignore logout API failures; we still clear local state
    }
  },
  fetchSession: async () => {
    set({ isLoading: true })
    try {
      const [userRes, profileRes] = await Promise.all([
        getUser(),
        getProfile(),
      ])

      if (userRes.success && userRes.data) {
        const userData = userRes.data as UserResponse
        const profileData =
          profileRes.success && profileRes.data
            ? (profileRes.data as UserProfileResponse)
            : null
        set({
          user: userData,
          profile: profileData,
          isFetched: true,
          error: null,
          isLoading: false,
        })
        return userData
      } else {
        set({
          user: null,
          profile: null,
          isFetched: true,
          error: userRes.message ?? "Not authenticated",
          isLoading: false,
        })
        return null
      }
    } catch {
      set({
        user: null,
        profile: null,
        isFetched: true,
        error: "Failed to load session",
        isLoading: false,
      })
      return null
    }
  },
}))
