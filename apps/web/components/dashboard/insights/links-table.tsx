import React from "react"
import { LinkStatsResponse } from "@workspace/utils/types/analytics"
import { ExternalLink, Link2, EyeOff, CheckCircle2 } from "lucide-react"
import { Card } from "@workspace/ui/components/card"

interface LinksTableProps {
  data?: LinkStatsResponse[]
}

export function LinksTable({ data }: LinksTableProps) {
  const links = data ?? []
  // Find the maximum click value to scale relative performance indicators
  const maxClicks = links.reduce((max, item) => (item.total_clicks > max ? item.total_clicks : max), 0)

  return (
    <Card className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 shadow-none ring-0">
      <div className="pb-4 mb-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display">
            Individual Link Performance
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Breakdown of traffic and CTR for each active link
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl">
          {links.length} Links Total
        </span>
      </div>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Link2 className="h-8 w-8 text-slate-300 dark:text-slate-700 mb-2.5" />
          <p className="text-xs font-semibold">No links found</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Create links in the Links page to see stats here</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase border-b border-slate-100 dark:border-white/5 pb-2">
                <th className="pb-3 font-semibold">Link info</th>
                <th className="pb-3 font-semibold text-center w-24">Type</th>
                <th className="pb-3 font-semibold text-center w-24">Status</th>
                <th className="pb-3 font-semibold w-48">Clicks (Relative)</th>
                <th className="pb-3 font-semibold text-right w-24">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {links.map((link) => {
                const relativeWidth = maxClicks > 0 ? (link.total_clicks / maxClicks) * 100 : 0
                return (
                  <tr key={link.id} className="group/row text-xs font-semibold hover:bg-slate-50/50 dark:hover:bg-white/1.5 transition-colors">
                    {/* Title & URL */}
                    <td className="py-4 pr-4">
                      <div className="flex flex-col space-y-0.5">
                        <span className="text-slate-800 dark:text-slate-200 font-bold group-hover/row:text-primary-color dark:group-hover/row:text-secondary-fixed-dim transition-colors">
                          {link.title || "Untitled Link"}
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 font-normal hover:underline inline-flex items-center space-x-1.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                          <span className="truncate max-w-[240px] md:max-w-[320px]">
                            {link.url}
                          </span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      </div>
                    </td>

                    {/* Social Badge */}
                    <td className="py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.75 rounded-lg text-[10px] font-bold ${
                        link.is_social
                          ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
                          : "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                      }`}>
                        {link.is_social ? "Social" : "Standard"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 text-center">
                      {link.is_active ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.75 rounded-lg font-bold">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-slate-500 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.75 rounded-lg font-bold">
                          <EyeOff className="h-3 w-3" />
                          <span>Hidden</span>
                        </span>
                      )}
                    </td>

                    {/* Clicks relative graphs */}
                    <td className="py-4 pr-6">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-slate-700 dark:text-slate-200 min-w-[32px] text-right">
                          {link.total_clicks.toLocaleString()}
                        </span>
                        <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400 dark:bg-slate-600 rounded-full transition-all duration-500 ease-out group-hover/row:bg-primary-color dark:group-hover/row:bg-secondary-fixed-dim"
                            style={{ width: `${relativeWidth}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* CTR */}
                    <td className="py-4 text-right pr-2 font-bold text-slate-800 dark:text-slate-200">
                      {link.ctr !== undefined ? `${link.ctr.toFixed(2)}%` : "0.00%"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
