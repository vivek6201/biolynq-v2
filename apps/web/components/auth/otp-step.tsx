"use client"

import React, { useState, useEffect } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@workspace/ui/components/input-otp"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { verifyOtp, sendOtp } from "@workspace/utils/api/auth"
import type { VerifyOtpResponse } from "@workspace/utils/types/auth"

interface OtpStepProps {
  email: string
  onNextOtp: (res: VerifyOtpResponse) => void
  onBack: () => void
}

export function OtpStep({ email, onNextOtp, onBack }: OtpStepProps) {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [isResending, setIsResending] = useState(false)

  // Countdown timer for code resend
  useEffect(() => {
    if (resendTimer <= 0) return
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendTimer])

  const handleOtpChange = (val: string) => {
    setOtp(val)
    if (error) setError("")

    // Auto-submit when 6 digits are reached
    if (val.length === 6) {
      handleVerify(val)
    }
  }

  const handleVerify = (code: string) => {
    setIsSubmitting(true)
    setError("")
    
    verifyOtp(email, code)
      .then((res) => {
        setIsSubmitting(false)
        if (res.success) {
          onNextOtp(res.data)
        } else {
          setError(res.message || "Invalid verification code. Please try again.")
        }
      })
      .catch(() => {
        setIsSubmitting(false)
        setError("An error occurred during verification.")
      })
  }

  const handleResend = () => {
    if (resendTimer > 0 || isResending) return
    setIsResending(true)
    setError("")
    
    sendOtp(email)
      .then((res) => {
        setIsResending(false)
        if (res.success) {
          setResendTimer(30)
          setOtp("")
        } else {
          setError(res.message || "Failed to resend code.")
        }
      })
      .catch(() => {
        setIsResending(false)
        setError("An error occurred. Please try again.")
      })
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Check your <span className="bg-linear-to-r from-primary-color to-secondary-fixed-dim bg-clip-text text-transparent">inbox</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We sent a 6-digit confirmation code to <span className="font-bold text-slate-800 dark:text-slate-200">{email}</span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="space-y-2 text-center w-full flex flex-col items-center">
          <Label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Verification Code <span className="text-rose-500 font-extrabold text-lg ml-0.5">*</span>
          </Label>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            disabled={isSubmitting || isResending}
            containerClassName="flex justify-center"
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
              <InputOTPSlot index={1} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
              <InputOTPSlot index={2} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
              <InputOTPSlot index={3} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
              <InputOTPSlot index={4} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
              <InputOTPSlot index={5} className="w-11 h-12 text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-primary-color" />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-xs font-semibold text-rose-500 mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="w-full flex items-center justify-center pt-2 text-sm">
          {resendTimer > 0 ? (
            <p className="text-slate-400">
              Resend code in <span className="font-bold text-slate-600 dark:text-slate-350">{resendTimer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center gap-1.5 font-bold text-primary-color dark:text-secondary-fixed-dim hover:underline transition-all cursor-pointer disabled:opacity-50"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend code"
              )}
            </button>
          )}
        </div>
      </div>

      <Button
        type="button"
        disabled={isSubmitting || otp.length < 6}
        onClick={() => handleVerify(otp)}
        className="w-full h-12 rounded-xl bg-primary-color hover:bg-primary-color/90 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-base"
      >
        {isSubmitting ? (
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          "Verify and Continue"
        )}
      </Button>
    </div>
  )
}
