"use client"

import React from "react"
import { AlertTriangle, Loader2, RotateCcw, Save } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface DirtySaveBarProps {
  isDirty: boolean
  isSaving: boolean
  changeCount: number
  saveError: string | null
  onSave: () => void
  onDiscard: () => void
}

export function DirtySaveBar({
  isDirty,
  isSaving,
  changeCount,
  saveError,
  onSave,
  onDiscard,
}: DirtySaveBarProps) {
  if (!isDirty && !saveError) return null

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-3 px-5 py-3
        rounded-2xl shadow-2xl border backdrop-blur-md
        animate-in slide-in-from-bottom-4 fade-in duration-300
        ${saveError
          ? "bg-red-50/95 dark:bg-red-950/90 border-red-200/60 dark:border-red-800/40"
          : "bg-white/95 dark:bg-slate-900/95 border-slate-200/60 dark:border-white/10"
        }
      `}
      role="status"
      aria-live="polite"
    >
      {/* Status icon */}
      <div className={`p-1.5 rounded-xl ${saveError
        ? "bg-red-100 dark:bg-red-900/40 text-red-500"
        : "bg-amber-50 dark:bg-amber-900/30 text-amber-500"
      }`}>
        <AlertTriangle className="h-3.5 w-3.5" />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
          {saveError
            ? "Save failed"
            : `${changeCount} unsaved change${changeCount !== 1 ? "s" : ""}`
          }
        </span>
        {saveError && (
          <span className="text-[10px] text-red-500 font-semibold max-w-[260px] truncate">
            {saveError}
          </span>
        )}
        {!saveError && (
          <span className="text-[10px] text-slate-400 font-semibold">
            Click Save to publish your changes
          </span>
        )}
      </div>

      <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1" />

      {/* Discard */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onDiscard}
        disabled={isSaving}
        className="h-8 rounded-xl text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 gap-1.5"
      >
        <RotateCcw className="h-3 w-3" />
        Discard
      </Button>

      {/* Save */}
      <Button
        type="button"
        size="sm"
        onClick={onSave}
        disabled={isSaving}
        className="h-8 rounded-xl text-[11px] font-bold bg-primary-color hover:bg-primary-color/90 text-white px-4 gap-1.5 shadow-md"
      >
        {isSaving ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Save className="h-3 w-3" />
        )}
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
