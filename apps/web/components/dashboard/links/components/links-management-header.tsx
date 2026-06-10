"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface LinksManagementHeaderProps {
  isDirty: boolean
  changeCount: number
  onAddLinkClick: () => void
}

export function LinksManagementHeader({
  isDirty,
  changeCount,
  onAddLinkClick,
}: LinksManagementHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-900/40 p-5 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-xs">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-bold tracking-tight text-slate-800 dark:text-white font-display">
            Link Management
          </h2>
          {isDirty && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider">
              Unsaved
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400">
          {isDirty
            ? `${changeCount} pending change${changeCount !== 1 ? "s" : ""} — click Save to publish`
            : "Organize and optimize your bio profile links."}
        </p>
      </div>

      <Button
        onClick={onAddLinkClick}
        className="rounded-2xl flex items-center space-x-2 bg-primary-color hover:bg-primary-color/90 text-white text-xs font-bold px-4 py-2.5 cursor-pointer shadow-md hover:shadow-lg transition-all"
      >
        <Plus className="h-4 w-4" />
        <span>Add New Link</span>
      </Button>
    </div>
  )
}
