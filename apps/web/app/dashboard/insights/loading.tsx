import React from "react"
import { Calendar, Share2, Laptop, Globe2, Link2 } from "lucide-react"
import { Card } from "@workspace/ui/components/card"

export default function InsightsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-44"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
          </div>
        </div>
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-2xl w-28"></div>
      </div>

      {/* Overview Cards Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-32 flex flex-col justify-between shadow-none ring-0"
          >
            <div className="flex justify-between items-start">
              <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
              <div className="h-9 w-9 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
          </Card>
        ))}
      </div>

      {/* Analytics Chart Skeleton */}
      <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[460px] flex flex-col justify-between shadow-none ring-0">
        <div className="flex justify-between items-center pb-6">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-300 dark:text-slate-700" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
          </div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
        </div>
        <div className="flex-1 bg-slate-100 dark:bg-slate-800/40 rounded-2xl"></div>
      </Card>

      {/* Breakdown Cards Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referrers */}
        <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[380px] flex flex-col shadow-none ring-0">
          <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
            <Share2 className="h-4 w-4 text-slate-300 dark:text-slate-700" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
          </div>
          <div className="space-y-4 flex-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-6"></div>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tech */}
        <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[380px] flex flex-col shadow-none ring-0">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
            <div className="flex items-center space-x-2.5">
              <Laptop className="h-4 w-4 text-slate-300 dark:text-slate-700" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
            </div>
            <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
          </div>
          <div className="space-y-4 flex-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-6"></div>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Geo */}
        <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[380px] flex flex-col shadow-none ring-0">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
            <div className="flex items-center space-x-2.5">
              <Globe2 className="h-4 w-4 text-slate-300 dark:text-slate-700" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
            </div>
            <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
          </div>
          <div className="space-y-4 flex-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-6"></div>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Links Table Skeleton */}
      <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[340px] flex flex-col justify-between shadow-none ring-0">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
          <div className="flex items-center space-x-2">
            <Link2 className="h-4 w-4 text-slate-300 dark:text-slate-700" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-40"></div>
          </div>
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-xl w-20"></div>
        </div>
        <div className="space-y-4 flex-1 justify-center pt-2">
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-white/5">
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
              </div>
              <div className="flex space-x-8">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
