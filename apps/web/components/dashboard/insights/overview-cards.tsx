import React from "react"
import { Eye, MousePointer, Percent, Users } from "lucide-react"
import { OverviewResponse } from "@workspace/utils/types/analytics"
import { Card } from "@workspace/ui/components/card"

interface OverviewCardsProps {
  data?: OverviewResponse
}

export function OverviewCards({ data }: OverviewCardsProps) {
  const stats = [
    {
      title: "Total Views",
      value: data?.views ?? 0,
      icon: Eye,
      colorClass: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40",
      borderColor: "group-hover:border-indigo-400/50",
    },
    {
      title: "Total Clicks",
      value: data?.clicks ?? 0,
      icon: MousePointer,
      colorClass: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "group-hover:border-emerald-400/50",
    },
    {
      title: "Average CTR",
      value: `${(data?.ctr ?? 0).toFixed(2)}%`,
      icon: Percent,
      colorClass: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
      borderColor: "group-hover:border-amber-400/50",
    },
    {
      title: "Unique Visitors",
      value: data?.unique_visitors ?? 0,
      icon: Users,
      colorClass: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40",
      borderColor: "group-hover:border-cyan-400/50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card
            key={idx}
            className={`group glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 flex flex-col justify-between h-32 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/20 dark:hover:shadow-none hover:border-slate-300 dark:hover:border-white/10 shadow-none ring-0 ${stat.borderColor}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.title}
              </span>
              <div className={`p-2.5 rounded-2xl ${stat.colorClass} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black font-display tracking-tight text-slate-800 dark:text-white">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
