import React from "react"
import { DemographicsResponse } from "@workspace/utils/types/analytics"
import { ReferrerCard } from "./referrer-card"
import { TechnologyCard } from "./technology-card"
import { GeographyCard } from "./geography-card"
import { Card } from "@workspace/ui/components/card"
import { Share2, Laptop, Globe2 } from "lucide-react"

interface BreakdownCardsProps {
  data?: DemographicsResponse
  isLoading?: boolean
}

export function BreakdownCards({ data, isLoading = false }: BreakdownCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="glass-card p-6 rounded-3xl border border-slate-200/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 h-[380px] animate-pulse flex flex-col justify-between shadow-none ring-0"
          >
            <div className="flex justify-between items-center pb-4">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-32"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-28"></div>
            </div>
            <div className="space-y-4 flex-1 pt-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-8"></div>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Referrer Card */}
      <ReferrerCard data={data?.referrers} />

      {/* 2. Tech Specs Card */}
      <TechnologyCard
        devices={data?.devices}
        browsers={data?.browsers}
        os={data?.os}
      />

      {/* 3. Geography Card */}
      <GeographyCard
        countries={data?.countries}
        cities={data?.cities}
      />
    </div>
  )
}
