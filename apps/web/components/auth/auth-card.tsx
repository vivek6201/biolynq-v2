"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { EmailStep } from "./email-step"
import { OtpStep } from "./otp-step"
import { UsernameStep } from "./username-step"
import { RedirectStep } from "./redirect-step"
import { cn } from "@workspace/ui/lib/utils"
import { AuthStep } from "@/lib/constants"
import type { OnboardingResponse, VerifyOtpResponse, GoogleAuthPayload } from "@workspace/utils/types/auth"
import { useSessionStore } from "@/store/session-store"

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
  }),
}

export function AuthCard() {
  const searchParams = useSearchParams()
  const stepParam = searchParams.get("step")
  const tempUserIdParam = searchParams.get("temp_user_id")
  const registeredParam = searchParams.get("registered")

  const [step, setStep] = useState<AuthStep>(() => {
    if (registeredParam === "true" && searchParams.get("session_id")) {
      return AuthStep.REDIRECT
    }
    if (stepParam === "USERNAME" || (registeredParam === "false" && tempUserIdParam)) {
      return AuthStep.USERNAME
    }
    return AuthStep.EMAIL
  })
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [tempUserId, setTempUserId] = useState(() => tempUserIdParam || "")

  // Handle popup relay if opened as a popup for Google Auth
  React.useEffect(() => {
    const tempUserIdVal = searchParams.get("temp_user_id")
    const registeredVal = searchParams.get("registered")
    const sessionIdVal = searchParams.get("session_id")

    if (window.opener) {
      if (registeredVal === "false" && tempUserIdVal) {
        const payload = {
          type: "GOOGLE_AUTH_CALLBACK",
          sessionId: null,
          registered: false,
          tempUserId: tempUserIdVal,
        }
        window.opener.postMessage(payload, window.location.origin)
        window.close()
      } else if (registeredVal === "true" && sessionIdVal) {
        const payload = {
          type: "GOOGLE_AUTH_CALLBACK",
          sessionId: sessionIdVal,
          registered: true,
          tempUserId: null,
        }
        window.opener.postMessage(payload, window.location.origin)
        window.close()
      }
    }
  }, [searchParams])

  const handleNextEmail = (enteredEmail: string) => {
    setEmail(enteredEmail)
    setDirection(1)
    setStep(AuthStep.OTP)
  }

  const handleNextOtp = async (res: VerifyOtpResponse) => {
    if (res.temp_user_id) {
      setTempUserId(res.temp_user_id)
    }

    setDirection(1)
    if (res.registered) {
      setStep(AuthStep.REDIRECT)
    } else {
      setStep(AuthStep.USERNAME)
    }
  }

  const handleGoogleLogin = async (payload: GoogleAuthPayload) => {
    setDirection(1)
    if (payload.registered && payload.sessionId) {
      setStep(AuthStep.REDIRECT)
    } else if (payload.tempUserId) {
      setTempUserId(payload.tempUserId)
      setStep(AuthStep.USERNAME)
    }
  }

  const handleNextUsername = async (res: OnboardingResponse, chosenUsername: string) => {
    setUsername(chosenUsername)
    setDirection(1)
    await useSessionStore.getState().fetchSession()
    setStep(AuthStep.REDIRECT)
  }

  const handleBackToEmail = () => {
    setDirection(-1)
    setStep(AuthStep.EMAIL)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Outer Card with Glassmorphism */}
      <motion.div
        layout
        className="glass-card shadow-2xl rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-200/40 dark:border-white/10 w-full"
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
      >
        <div className="relative">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              {step === AuthStep.EMAIL && (
                <EmailStep
                  onNextEmail={handleNextEmail}
                  onGoogleLogin={handleGoogleLogin}
                />
              )}
              {step === AuthStep.OTP && (
                <OtpStep
                  email={email}
                  onNextOtp={handleNextOtp}
                  onBack={handleBackToEmail}
                />
              )}
              {step === AuthStep.USERNAME && (
                <UsernameStep
                  tempUserId={tempUserId}
                  onNextUsername={handleNextUsername}
                  initialUsername={username}
                />
              )}
              {step === AuthStep.REDIRECT && (
                <RedirectStep
                  username={username}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Progress Dots/Indicator at the bottom */}
      {step !== "REDIRECT" && (
        <div className="flex justify-center items-center gap-1.5 mt-6">
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              step === "EMAIL"
                ? "w-6 bg-primary-color dark:bg-secondary-fixed-dim"
                : "w-1.5 bg-slate-200 dark:bg-slate-800"
            )}
          />
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              step === "OTP"
                ? "w-6 bg-primary-color dark:bg-secondary-fixed-dim"
                : "w-1.5 bg-slate-200 dark:bg-slate-800"
            )}
          />
          <div
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              step === "USERNAME"
                ? "w-6 bg-primary-color dark:bg-secondary-fixed-dim"
                : "w-1.5 bg-slate-200 dark:bg-slate-800"
            )}
          />
        </div>
      )}
    </div>
  )
}
