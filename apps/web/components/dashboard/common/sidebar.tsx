"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Link2, Settings, LogOut, User, Sun, Moon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { useSession } from "@/hooks/use-session"
import { buttonVariants } from "@workspace/ui/components/button"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const pathname = usePathname()
  const { user, profile, clearSession } = useSession()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    {
      label: "Insights",
      href: "/dashboard/insights",
      icon: BarChart3,
    },
    {
      label: "Links",
      href: "/dashboard/links",
      icon: Link2,
    },
  ]

  return (
    <aside className="w-64 border-r border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col p-6 space-y-6">
        {/* Brand / Logo */}
        <Link
          href="/dashboard"
          className="font-display text-xl font-black tracking-tight text-primary-color dark:text-inverse-primary select-none flex items-center"
        >
          Biolynq
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                  "flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 w-full justify-start shadow-none",
                  isActive
                    ? "bg-primary-color/10 dark:bg-secondary-fixed-dim/10 text-primary-color dark:text-secondary-fixed-dim"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "stroke-2" : "opacity-80")} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Footer Actions */}
      <div className="p-6 flex flex-col space-y-4">
        <Separator className="bg-slate-200/60 dark:bg-white/10 mb-2" />
        {user && (
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-primary-color/10 dark:bg-secondary-fixed-dim/10 text-primary-color dark:text-secondary-fixed-dim flex items-center justify-center font-bold text-sm">
              {profile?.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {profile?.username || user.email?.split("@")[0] || "User"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-xs font-semibold justify-start text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-white/5 shadow-none transition-all duration-200"
        >
          {mounted && resolvedTheme === "dark" ? (
            <>
              <Sun className="h-3.5 w-3.5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-3.5 w-3.5" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
        <Button
          variant="destructive"
          onClick={clearSession}
          className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Log Out</span>
        </Button>
      </div>
    </aside>
  )
}
