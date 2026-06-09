"use client"

import React, { useState, useEffect } from "react"
import { useSession } from "@/hooks/use-session"
import { usePathname } from "next/navigation"
import { Loader2, X } from "lucide-react"
import Header from "./header"
import Sidebar from "./sidebar"

export function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the mobile drawer on path changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface dark:bg-slate-950">
        <Loader2 className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-color dark:border-secondary-fixed-dim" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-surface text-on-surface transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay (shown only on mobile/tablet when toggled) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/45 backdrop-blur-xs transition-all duration-300">
          {/* Menu Drawer Container */}
          <div className="w-64 bg-slate-50 dark:bg-slate-900 h-full shadow-2xl flex flex-col relative animate-in slide-in-from-left duration-200">
            {/* Manual Close X Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-200/50 dark:bg-white/5 text-slate-500 hover:text-slate-850 dark:hover:text-slate-200 transition-colors z-50"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
          {/* Tap-outside area to close menu */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* Main Right Content Panel */}
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        {/* Top Header with Menu Toggle Hook */}
        <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

        {/* Content Area (adaptive padding) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
