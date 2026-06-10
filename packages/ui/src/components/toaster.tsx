"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:dark:bg-slate-900 group-[.toaster]:text-slate-800 group-[.toaster]:dark:text-slate-200 group-[.toaster]:border-slate-200/50 group-[.toaster]:dark:border-white/10 group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl font-sans",
          description: "group-[.toast]:text-slate-400 group-[.toast]:dark:text-slate-500 font-sans",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { toast } from "sonner"

