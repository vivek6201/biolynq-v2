"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="absolute top-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="rounded-full shadow-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-white/10 backdrop-blur-md"
      >
        {mounted && resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-500" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
        )}
      </Button>
    </div>
  )
}
