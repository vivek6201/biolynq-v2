"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { validateUsernameFormat } from "@/lib/utils"

interface UsernameStepProps {
  onNextUsername: (username: string) => void
  initialUsername?: string
}

export function UsernameStep({ onNextUsername, initialUsername = "" }: UsernameStepProps) {
  const [username, setUsername] = useState(initialUsername)
  const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulate API call for username check
  const checkAvailability = useCallback((val: string) => {
    let tCheck: NodeJS.Timeout | null = null
    let tInvalid: NodeJS.Timeout | null = null
    let delay: NodeJS.Timeout | null = null

    if (!validateUsernameFormat(val)) {
      tInvalid = setTimeout(() => {
        setStatus(val.length >= 3 ? "invalid" : "idle")
      }, 0)
      return () => {
        if (tInvalid) clearTimeout(tInvalid)
      }
    }

    tCheck = setTimeout(() => {
      setStatus("checking")
    }, 0)
    
    delay = setTimeout(() => {
      // Simple mock logic: usernames ending in "1", "2", "3" or "admin", "test" are "taken"
      const lower = val.toLowerCase()
      const isTaken = 
        lower.endsWith("1") || 
        lower.endsWith("2") || 
        lower.endsWith("3") || 
        ["admin", "test", "biolynq", "root", "support"].includes(lower)

      if (isTaken) {
        setStatus("taken")
      } else {
        setStatus("available")
      }
    }, 600)

    return () => {
      if (tCheck) clearTimeout(tCheck)
      if (delay) clearTimeout(delay)
    }
  }, [])

  // Check on input change
  useEffect(() => {
    if (!username) return
    const cleanUp = checkAvailability(username)
    return cleanUp
  }, [username, checkAvailability])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== "available") return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onNextUsername(username)
    }, 800)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Choose your <span className="bg-linear-to-r from-primary-color to-secondary-fixed-dim bg-clip-text text-transparent">username</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          This will be your permanent Biolynq link. You can change this later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-base font-extrabold text-slate-800 dark:text-slate-200 block mb-1">
            Claim Your URL <span className="text-rose-500 font-extrabold text-xl ml-0.5">*</span>
          </Label>

          <div className={cn(
            "flex items-center bg-white/60 dark:bg-slate-900/60 border rounded-xl px-4 py-3 shadow-xs transition-all focus-within:ring-2",
            status === "available"
              ? "border-emerald-500/50 dark:border-emerald-500/35 focus-within:ring-emerald-500/30 focus-within:border-emerald-500"
              : status === "taken" || status === "invalid"
              ? "border-rose-500/50 dark:border-rose-500/35 focus-within:ring-rose-500/30 focus-within:border-rose-500"
              : "border-slate-200 dark:border-slate-800 focus-within:ring-primary-color focus-within:border-primary-color"
          )}>
            <span className="text-slate-400 dark:text-slate-500 font-semibold select-none font-display pr-1 text-base">
              biolynq.in/
            </span>
            <Input
              id="username"
              type="text"
              placeholder="yourname"
              value={username}
              onChange={(e) => {
                const val = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
                setUsername(val)
                if (!val) {
                  setStatus("idle")
                }
              }}
              disabled={isSubmitting}
              maxLength={20}
              className="flex-1 min-w-0 bg-transparent border-none shadow-none outline-none focus-visible:ring-0 focus-visible:outline-none h-auto p-0 font-semibold font-display text-slate-850 dark:text-white text-base"
              required
            />
            
            {/* Status Icons */}
            <div className="flex items-center pl-2">
              {status === "checking" && (
                <Loader2 className="h-5 w-5 text-primary-color dark:text-secondary-fixed-dim animate-spin" />
              )}
              {status === "available" && (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 fill-emerald-50/50 dark:fill-emerald-950/20" />
              )}
              {(status === "taken" || status === "invalid") && (
                <XCircle className="h-5 w-5 text-rose-500 fill-rose-50/50 dark:fill-rose-950/20" />
              )}
            </div>
          </div>

          {/* Feedback message */}
          <div className="h-5 pl-1">
            {status === "available" && (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                🎉 biolynq.to/{username} is available!
              </p>
            )}
            {status === "taken" && (
              <p className="text-xs font-bold text-rose-500">
                ⚠️ This username is already claimed.
              </p>
            )}
            {status === "invalid" && username.length >= 3 && (
              <p className="text-xs font-bold text-rose-500">
                ❌ Use only lowercase letters, numbers, hyphens, and underscores.
              </p>
            )}
            {status === "idle" && username.length > 0 && username.length < 3 && (
              <p className="text-xs font-semibold text-slate-400">
                Username must be at least 3 characters.
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={status !== "available" || isSubmitting}
          className="w-full h-12 rounded-xl bg-primary-color hover:bg-primary-color/90 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  )
}
