import React from "react"
import { cookies } from "next/headers"
import { getOverview, getLinkStats, getDemographics } from "@workspace/utils/api/insights"
import { OverviewCards } from "@/components/dashboard/insights/overview-cards"
import { AnalyticsChart } from "@/components/dashboard/insights/analytics-chart"
import { BreakdownCards } from "@/components/dashboard/insights/breakdown-cards"
import { LinksTable } from "@/components/dashboard/insights/links-table"
import { InsightsHeader } from "@/components/dashboard/insights/insights-header"
import { AlertCircle } from "lucide-react"

export default async function InsightsPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value
  const cookieHeader = sessionId ? `session_id=${sessionId}` : ""

  try {
    const [overviewRes, demographicsRes, linkStatsRes] = await Promise.all([
      getOverview({ Cookie: cookieHeader }),
      getDemographics({ Cookie: cookieHeader }),
      getLinkStats({ Cookie: cookieHeader }),
    ])

    if (!overviewRes.success || !demographicsRes.success || !linkStatsRes.success) {
      const errMsg =
        (!overviewRes.success && overviewRes.message) ||
        (!demographicsRes.success && demographicsRes.message) ||
        (!linkStatsRes.success && linkStatsRes.message) ||
        "Failed to fetch analytics data."
      throw new Error(errMsg)
    }

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Interactive Header (leaf client component) */}
        <InsightsHeader />

        {/* Overview cards (Server Component) */}
        <OverviewCards data={overviewRes.data} />

        {/* Interactive SVG Chart (Client Component edge) */}
        <AnalyticsChart data={overviewRes.data} isLoading={false} />

        {/* Demographics Breakdown (Client Component edge) */}
        <BreakdownCards data={demographicsRes.data} isLoading={false} />

        {/* Links metrics ranking list (Server Component) */}
        <LinksTable data={linkStatsRes.data} />
      </div>
    )
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-4 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500">
          <AlertCircle className="h-10 w-10 animate-bounce" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display">
            Failed to Load Insights
          </h2>
          <p className="text-xs text-slate-400 max-w-sm">
            {error?.message || "An unexpected error occurred while fetching analytics from the server."}
          </p>
        </div>
      </div>
    )
  }
}