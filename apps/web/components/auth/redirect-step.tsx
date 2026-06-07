"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Check } from "lucide-react"

interface RedirectStepProps {
  username: string
}

export function RedirectStep({ username }: RedirectStepProps) {
  const [count, setCount] = useState(3)
  const router = useRouter()

  useEffect(() => {
    if (count <= 0) {
      // Small timeout to show the success state before route transition
      const timeout = setTimeout(() => {
        router.push("/dashboard/insights")
      }, 500)
      return () => clearTimeout(timeout)
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [count, router])

  // Radial progress stroke configurations
  const radius = 46
  const circumference = 2 * Math.PI * radius
  // As count goes from 3 down to 0, progress goes from 0% to 100% (or offset from circumference to 0)
  const progress = (3 - count) / 3
  const strokeDashoffset = circumference - progress * circumference

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6 w-full text-center">
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* SVG Circle Progress */}
        <svg className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-800 fill-transparent"
            strokeWidth="8"
          />
          {/* Active progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-primary-color dark:stroke-secondary-fixed-dim fill-transparent"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>

        {/* Count display inside the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {count > 0 ? (
              <motion.span
                key={count}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-4xl font-black font-display text-slate-800 dark:text-white"
              >
                {count}
              </motion.span>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white"
              >
                <Check className="h-6 w-6 stroke-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-bold font-display text-slate-800 dark:text-white">
          {count > 0 ? "Setting up your space..." : "All done!"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {count > 0 ? (
            <>
              Hold tight, we are preparing your dashboard for{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">biolynq.to/{username}</span>
            </>
          ) : (
            "Redirecting to your dashboard..."
          )}
        </p>
      </div>
    </div>
  )
}
