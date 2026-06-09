"use client"

import React, { useState, useMemo } from "react"
import { OverviewResponse } from "@workspace/utils/types/analytics"
import { Card } from "@workspace/ui/components/card"
import { Calendar } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface AnalyticsChartProps {
  data: OverviewResponse | undefined
  isLoading: boolean
}

// Custom tooltip renderer for Recharts that matches our visual design guidelines
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const formattedDate = new Date(label).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })

    return (
      <div className="bg-slate-950/90 dark:bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl text-xs flex flex-col space-y-1.5 min-w-[140px] z-50 border border-white/10 backdrop-blur-md">
        <div className="text-[10px] font-bold text-slate-400 pb-1 border-b border-white/5">
          {formattedDate}
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex justify-between items-center gap-4">
            <div className="flex items-center space-x-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-slate-300 capitalize">{entry.name}</span>
            </div>
            <span className="font-bold">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function AnalyticsChartSkeleton() {
  return (
    <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[460px] flex flex-col justify-between animate-pulse shadow-none ring-0">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-slate-300 dark:text-slate-700" />
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-48"></div>
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-64"></div>
      </div>
      <div className="flex-1 bg-slate-100 dark:bg-slate-800/40 rounded-2xl"></div>
    </Card>
  )
}

export function AnalyticsChart({ data, isLoading }: AnalyticsChartProps) {
  const [filter, setFilter] = useState<"all" | "views" | "clicks">("all")

  // Combine views and clicks time series into a unified Recharts dataset
  const chartData = useMemo(() => {
    const views = data?.views_over_time ?? []
    const clicks = data?.clicks_over_time ?? []
    return views.map((item, idx) => ({
      date: item.date,
      views: item.count,
      clicks: clicks[idx]?.count ?? 0,
    }))
  }, [data])

  // Format axis date strings to short representation (e.g. Jun 9)
  const formatXAxisDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })
    } catch {
      return dateStr
    }
  }

  if (isLoading) {
    return <AnalyticsChartSkeleton />
  }

  return (
    <Card className="group/chart-container glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 flex flex-col relative shadow-none ring-0">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            Performance Over Time (30 Days)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor page views and link clicks daily
          </p>
        </div>

        {/* Filters Toggle Button Group */}
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-0.75 rounded-2xl border border-slate-200/20 w-fit self-start sm:self-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              filter === "all"
                ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            All Traffic
          </button>
          <button
            onClick={() => setFilter("views")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              filter === "views"
                ? "bg-indigo-650 dark:bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Views Only
          </button>
          <button
            onClick={() => setFilter("clicks")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              filter === "clicks"
                ? "bg-emerald-650 dark:bg-emerald-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Clicks Only
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-[320px] w-full mt-2 select-none">
        <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 1, height: 1 }}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border, #e2e8f0)"
              className="opacity-40"
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisDate}
              stroke="#94a3b8"
              fontSize={10}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              dy={10}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />

            <Tooltip content={<CustomTooltip />} />

            {(filter === "all" || filter === "views") && (
              <Area
                type="monotone"
                name="views"
                dataKey="views"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorViews)"
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            )}

            {(filter === "all" || filter === "clicks") && (
              <Area
                type="monotone"
                name="clicks"
                dataKey="clicks"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorClicks)"
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
