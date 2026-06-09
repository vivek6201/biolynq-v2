"use client"

import { useEffect } from "react"
import { useSessionStore } from "@/store/session-store"

export function useSession() {
  const { user, profile, isLoading, isFetched, error, fetchSession, clearSession } =
    useSessionStore()

  useEffect(() => {
    if (!isFetched && !isLoading) {
      fetchSession()
    }
  }, [isFetched, isLoading, fetchSession])

  return {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    isFetched,
    error,
    clearSession,
    fetchSession,
  }
}
