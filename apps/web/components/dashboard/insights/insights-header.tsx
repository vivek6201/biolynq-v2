"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import { RefreshCw, TrendingUp } from "lucide-react"

export function InsightsHeader() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-black font-display tracking-tight text-slate-800 dark:text-white">
            Analytics Insights
          </h2>
          <p className="text-xs text-slate-500">
            Real-time analytics for your profile, links, and visitor demographics
          </p>
        </div>
      </div>

      <Button
        onClick={handleRefresh}
        disabled={isPending}
        variant="outline"
        className="rounded-2xl flex items-center space-x-2 text-xs font-semibold px-4 py-2 border-slate-200 dark:border-white/10"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
        <span>{isPending ? "Refreshing..." : "Refresh Stats"}</span>
      </Button>
    </div>
  )
}
