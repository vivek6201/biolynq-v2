"use client"

import React, { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail("")
    }, 1200)
  }

  return (
    <div className="w-full rounded-3xl bg-indigo-600 dark:bg-indigo-700/90 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col space-y-6">
      {/* Visual card circles */}
      <div className="absolute top-[-10%] right-[-10%] w-32 h-32 rounded-full bg-white/5 blur-lg pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-5%] w-24 h-24 rounded-full bg-white/5 blur-md pointer-events-none" />

      <div className="space-y-2 relative z-10 text-left">
        <h3 className="text-lg font-bold font-display">
          Join the inner circle
        </h3>
        <p className="text-xs text-indigo-100 font-medium leading-relaxed">
          Get creator insights and data-driven tips delivered weekly.
        </p>
      </div>

      <form onSubmit={handleSubscribe} className="flex gap-2 relative z-10 w-full">
        <Input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || isSubscribed}
          className="bg-indigo-500/30 border-indigo-400/30 focus:border-white/50 text-white placeholder-indigo-200/70 text-xs rounded-xl h-10 w-full"
        />
        <Button
          type="submit"
          disabled={isSubmitting || isSubscribed}
          className="bg-white text-indigo-600 hover:bg-slate-100 dark:bg-white dark:text-indigo-700 font-bold text-xs px-5 h-10 rounded-xl shrink-0 shadow-sm"
        >
          {isSubmitting ? "..." : isSubscribed ? <Check className="h-4 w-4 text-emerald-600" /> : "Subscribe"}
        </Button>
      </form>

      {isSubscribed && (
        <p className="text-[10px] text-indigo-100 font-bold text-left">
          Thanks for subscribing! Check your inbox soon.
        </p>
      )}
    </div>
  )
}
