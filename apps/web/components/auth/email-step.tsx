"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Mail, ArrowRight } from "lucide-react"
import { GoogleIcon } from "@workspace/ui/components/icons"

import { sendOtp } from "@workspace/utils/api/auth"
import { API_URL } from "@workspace/utils/api/index"
import type { GoogleAuthPayload } from "@workspace/utils/types/auth"

interface EmailStepProps {
  onNextEmail: (email: string) => void
  onGoogleLogin: (payload: GoogleAuthPayload) => void
}

export function EmailStep({ onNextEmail, onGoogleLogin }: EmailStepProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const popupRef = useRef<Window | null>(null)
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Cleanup popup poll timer
  const clearPollTimer = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current)
      pollTimerRef.current = null
    }
  }, [])

  // Listen for postMessage from the popup
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // Security: only accept messages from our own origin
      if (event.origin !== window.location.origin) return
      if (event.data?.type !== "GOOGLE_AUTH_CALLBACK") return

      clearPollTimer()
      setIsGoogleLoading(false)
      popupRef.current = null
      onGoogleLogin(event.data as GoogleAuthPayload)
    },
    [onGoogleLogin, clearPollTimer]
  )

  useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
      clearPollTimer()
    }
  }, [handleMessage, clearPollTimer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email is required")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitting(true)
    
    sendOtp(email)
      .then((res) => {
        setIsSubmitting(false)
        if (res.success) {
          onNextEmail(email)
        } else {
          setError(res.message || "Failed to send code. Please try again.")
        }
      })
      .catch(() => {
        setIsSubmitting(false)
        setError("An error occurred. Please try again.")
      })
  }

  const handleGoogleClick = () => {
    // If a popup is already open, focus it
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus()
      return
    }

    setIsGoogleLoading(true)
    setError("")

    // Center the popup on screen
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(
      `${API_URL}/auth/google/login`,
      "google-auth-popup",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    )

    if (!popup) {
      setError("Popup was blocked. Please allow popups for this site.")
      setIsGoogleLoading(false)
      return
    }

    popupRef.current = popup

    // Poll to detect if user manually closed the popup
    pollTimerRef.current = setInterval(() => {
      if (popup.closed) {
        clearPollTimer()
        setIsGoogleLoading(false)
        popupRef.current = null
      }
    }, 500)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Get started with <span className="bg-linear-to-r from-primary-color to-secondary-fixed-dim bg-clip-text text-transparent">Biolynq</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Claim your link, customize your page, and track your insights in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <Label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Email Address <span className="text-rose-500 font-extrabold text-lg ml-0.5">*</span>
            </Label>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
              disabled={isSubmitting || isGoogleLoading}
              className="pl-10 h-12 bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-primary-color dark:focus:ring-secondary-fixed-dim transition-all text-base"
              required
            />
          </div>
          {error && (
            <p className="text-xs font-semibold text-rose-500 mt-1 pl-1">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="w-full h-12 rounded-xl bg-primary-color hover:bg-primary-color/90 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <>
              Continue with Email
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <span className="relative px-3 bg-[#faf8ff] dark:bg-[#131b2e] text-xs font-bold uppercase tracking-wider text-slate-400">
          Or
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleClick}
        disabled={isSubmitting || isGoogleLoading}
        className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer bg-white/40 dark:bg-slate-950/40 text-base"
      >
        {isGoogleLoading ? (
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <>
            <GoogleIcon/>
            Continue with Google
          </>
        )}
      </Button>
    </div>
  )
}

