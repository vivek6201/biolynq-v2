import React from "react"
import { GroupedStat } from "@workspace/utils/types/analytics"
import { Share2 } from "lucide-react"
import { Card } from "@workspace/ui/components/card"

interface ReferrerCardProps {
  data?: GroupedStat[]
}

export function ReferrerCard({ data }: ReferrerCardProps) {
  const list = data ?? []
  const total = list.reduce((sum, item) => sum + item.count, 0)
  const sortedList = [...list].sort((a, b) => b.count - a.count).slice(0, 5)

  return (
    <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 flex flex-col h-[380px] shadow-none ring-0">
      {/* Title Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
            <Share2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
              Top Referrers
            </h3>
          </div>
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[260px] text-slate-400">
            <p className="text-xs font-semibold">No referrer data available</p>
          </div>
        ) : (
          <div className="space-y-4 h-[260px] overflow-y-auto pr-1">
            {sortedList.map((item, idx) => {
              const percentage = total > 0 ? (item.count / total) * 100 : 0
              const displayName = item.name ? item.name : "Direct / Unknown"

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
