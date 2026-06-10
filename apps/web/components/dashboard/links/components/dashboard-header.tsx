"use client"

import React, { useState } from "react"
import { Search, Bell, HelpCircle, Copy, Check } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

interface DashboardHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  username?: string
}

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  username,
}: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(`biolynq.in/${username || "username"}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-white/5">
      {/* Search input */}
      <div className="relative w-full sm:max-w-xs md:max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
        <Input
          type="text"
          placeholder="Search links..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim placeholder:text-slate-400"
        />
      </div>

      {/* Action icons & Copyable link */}
      <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
        <Button
          variant="outline"
          size="icon"
          className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-xs cursor-pointer"
        >
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-xs cursor-pointer"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />

        <Button
          variant="outline"
          onClick={handleCopyProfileUrl}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-primary-color dark:text-secondary-fixed-dim transition-all shadow-xs cursor-pointer"
        >
          <span>biolynq.in/{username || "username"}</span>
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-slate-400" />
          )}
        </Button>
      </div>
    </div>
  )
}

