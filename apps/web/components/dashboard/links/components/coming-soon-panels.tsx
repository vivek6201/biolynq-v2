import React from "react"
import { FileText, Mail } from "lucide-react"

export function ComingSoonPanels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
      <div className="border border-dashed border-slate-200 dark:border-white/10 rounded-[32px] bg-slate-50/20 dark:bg-slate-900/5 p-6 flex flex-col items-center text-center space-y-4 shadow-2xs">
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-white/5 text-primary-color dark:text-secondary-fixed-dim">
          <FileText className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">Custom Forms</h4>
          <p className="text-[10px] leading-relaxed text-slate-400 font-semibold max-w-[180px]">
            Capture leads and inquiries directly from your profile.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[8px] font-bold text-slate-400 tracking-wider">Coming Soon</span>
      </div>
      <div className="border border-dashed border-slate-200 dark:border-white/10 rounded-[32px] bg-slate-50/20 dark:bg-slate-900/5 p-6 flex flex-col items-center text-center space-y-4 shadow-2xs">
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-white/5 text-primary-color dark:text-secondary-fixed-dim">
          <Mail className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">Email List</h4>
          <p className="text-[10px] leading-relaxed text-slate-400 font-semibold max-w-[180px]">
            Grow your newsletter with integrated subscription widgets.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[8px] font-bold text-slate-400 tracking-wider">Coming Soon</span>
      </div>
    </div>
  )
}
