"use client"

import React from "react"
import Sidebar from "./common/sidebar"
import Header from "./common/header"
import { useSession } from "@/hooks/use-session"
import { Loader2 } from "lucide-react"

export function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated } = useSession()

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
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Right Content Panel */}
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        {/* Top Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
