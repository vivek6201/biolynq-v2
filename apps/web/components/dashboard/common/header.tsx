"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useSession } from "@/hooks/use-session"
import { Menu } from "lucide-react"

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname()
  const { user, profile } = useSession()

  // Derive page title from route
  const getPageTitle = () => {
    if (pathname.includes("/dashboard/insights")) return "Insights Overview"
    if (pathname.includes("/dashboard/links")) return "Manage Links"
    return "Dashboard"
  }

  return (
    <header className="h-16 border-b border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 md:px-8 w-full sticky top-0 z-40">
      <div className="flex items-center space-x-3.5">
        {/* Mobile menu toggle button */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl border border-slate-200/40 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 md:hidden text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-250 transition-colors cursor-pointer"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-sm md:text-md font-bold text-slate-800 dark:text-slate-200 font-display">
          {getPageTitle()}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
            Welcome back, <span className="text-slate-700 dark:text-slate-200">{profile?.username || user.email?.split("@")[0] || "User"}</span>
          </span>
        )}
      </div>
    </header>
  )
}
