"use client"

import { motion, AnimatePresence } from "motion/react"
import { cn } from "@workspace/ui/lib/utils"
import { buttonVariants } from "@workspace/ui/components/button"

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "destructive" | "default"
}

export function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: AlertDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 p-6 rounded-3xl shadow-2xl z-10 flex flex-col space-y-4"
          >
            {/* Header */}
            <div className="space-y-2 text-left">
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {description}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-2xl text-xs font-bold w-full sm:w-auto"
                )}
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
                className={cn(
                  buttonVariants({
                    variant: variant === "destructive" ? "destructive" : "default",
                    size: "sm",
                  }),
                  "rounded-2xl text-xs font-bold w-full sm:w-auto",
                  variant === "default" && "bg-indigo-650 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700"
                )}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
