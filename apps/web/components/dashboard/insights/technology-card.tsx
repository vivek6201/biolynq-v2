"use client"

import React, { useState } from "react"
import { GroupedStat } from "@workspace/utils/types/analytics"
import { Laptop } from "lucide-react"
import { Card } from "@workspace/ui/components/card"

interface TechnologyCardProps {
  devices?: GroupedStat[]
  browsers?: GroupedStat[]
  os?: GroupedStat[]
}

export function TechnologyCard({ devices, browsers, os }: TechnologyCardProps) {
  const [techTab, setTechTab] = useState<"devices" | "browsers" | "os">("devices")

  const activeList = techTab === "devices" ? devices : techTab === "browsers" ? browsers : os
  const list = activeList ?? []
  const total = list.reduce((sum, item) => sum + item.count, 0)
  const sortedList = [...list].sort((a, b) => b.count - a.count).slice(0, 5)

  return (
    <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 flex flex-col h-[380px] shadow-none ring-0">
      {/* Tab Header Selector */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
            <Laptop className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
            Technology
          </h3>
        </div>

        {/* Custom Tab buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/20 text-[10px] font-bold">
          <button
            onClick={() => setTechTab("devices")}
            className={`px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
              techTab === "devices"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs"
                : "text-slate-500"
            }`}
          >
            Devices
          </button>
          <button
            onClick={() => setTechTab("browsers")}
            className={`px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
              techTab === "browsers"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs"
                : "text-slate-500"
            }`}
          >
            Browsers
          </button>
          <button
            onClick={() => setTechTab("os")}
            className={`px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
              techTab === "os"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs"
                : "text-slate-500"
            }`}
          >
            OS
          </button>
        </div>
      </div>

      {/* Rendered active Tab stats list */}
      <div className="flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[260px] text-slate-400">
            <p className="text-xs font-semibold">No data available for this segment</p>
          </div>
        ) : (
          <div className="space-y-4 h-[260px] overflow-y-auto pr-1">
            {sortedList.map((item, idx) => {
              const percentage = total > 0 ? (item.count / total) * 100 : 0
              const displayName = item.name ? item.name : "Unknown"

              return (
                <div key={idx} className="group/item flex flex-col space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]" title={displayName}>
                      {displayName}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-800 dark:text-slate-100 font-bold">
                        {item.count.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-[10px] font-normal">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-color dark:bg-secondary-fixed-dim rounded-full transition-all duration-500 ease-out group-hover/item:opacity-85"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
