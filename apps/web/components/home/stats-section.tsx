"use client"

import React from "react"
import { motion } from "motion/react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { MousePointerClick, Link2, Activity, ShieldCheck } from "lucide-react"

export default function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      }
    }
  }

  const stats = [
    {
      value: "10M+",
      label: "Total Clicks Tracked",
      desc: "Delivered to target channels",
      icon: MousePointerClick,
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-500 dark:text-blue-400"
    },
    {
      value: "50k+",
      label: "Active Bio Links",
      desc: "Creators growing their presence",
      icon: Link2,
      color: "from-purple-500 to-pink-600",
      accent: "text-purple-500 dark:text-purple-400"
    },
    {
      value: "99.9%",
      label: "Platform Uptime",
      desc: "Enterprise-grade reliability",
      icon: Activity,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-500 dark:text-emerald-400"
    },
    {
      value: "24/7",
      label: "Global Support",
      desc: "Average response under 5m",
      icon: ShieldCheck,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-500 dark:text-amber-400"
    }
  ]

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950/40 border-y border-outline-variant/20 dark:border-outline/10">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-on-surface dark:text-white font-extrabold mb-4 tracking-tight">
            Scale with <span className="bg-linear-to-r from-primary-color to-indigo-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Confidence</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant dark:text-outline max-w-xl mx-auto leading-relaxed">
            Biolynq powers digital operations for thousands of creators, influencers, and brands worldwide.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                variants={statItemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="cursor-pointer animate-none"
              >
                <Card className="glass-card dark:bg-slate-900/60 border border-outline-variant/30 dark:border-outline/10 p-6 rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  <CardContent className="p-0 flex flex-col gap-4">
                    {/* Icon wrapper with soft colored gradient background */}
                    <div className={`h-12 w-12 rounded-2xl bg-linear-to-br ${stat.color} p-2.5 flex items-center justify-center text-white shadow-md shadow-black/5`}>
                      <Icon className="h-full w-full stroke-[1.5]" />
                    </div>

                    <div>
                      <div className="font-display text-5xl md:text-6xl font-black tracking-tight bg-linear-to-br from-primary-color to-indigo-600 dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="font-display text-lg text-on-surface dark:text-white/95 font-bold mb-1">
                        {stat.label}
                      </div>
                      <div className="font-body-sm text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                        {stat.desc}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
