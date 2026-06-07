"use client"

import React from "react"
import { motion } from "motion/react"
import {
  Link2,
  Smartphone,
  LineChart,
  Sparkles,
  Play,
  ShoppingBag,
  Podcast,
  Rocket
} from "lucide-react"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"

export default function FeaturesSection() {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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

  // Animation variants for the device insights bar chart
  const barHeights = [24, 32, 48, 40, 28] // converted to percentage equivalents or custom heights
  const chartContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }


  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          <h2 className="font-display text-4xl md:text-5xl text-on-surface dark:text-white font-extrabold mb-4 tracking-tight">
            Engineered for <span className="bg-linear-to-r from-primary-color to-indigo-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Informed Growth</span>
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant dark:text-outline max-w-2xl mx-auto leading-relaxed">
            Modern creators need more than just links. Biolynq provides a professional suite of tools to scale your personal brand.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Feature 1: Link-in-Bio */}
          <motion.div
            className="col-span-12 md:col-span-7 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-surface-container-low dark:bg-slate-900/50 p-8 md:p-12 rounded-[32px] overflow-hidden flex flex-col justify-between h-full border border-outline-variant/10 dark:border-outline/5 shadow-none">
              <CardContent className="p-0 flex flex-col justify-between h-full">
                <div className="max-w-md">
                  <div className="p-3 bg-primary-color/10 dark:bg-primary-color/20 rounded-xl inline-block mb-6">
                    <Link2 className="h-6 w-6 text-primary-color dark:text-inverse-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-4">
                    Beautiful Link-in-Bio
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-outline">
                    Create a bespoke landing page in minutes. Our drag-and-drop builder makes it effortless to organize your music, videos, and social profiles.
                  </p>
                </div>
                
                {/* Interactive mockup preview */}
                <div className="mt-12 overflow-hidden relative h-48">
                  <motion.div
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 space-y-3 max-w-xs mx-auto border border-outline-variant/20 dark:border-outline/10 absolute left-0 right-0"
                    initial={{ y: 64 }}
                    whileInView={{ y: 24 }}
                    viewport={{ once: true }}
                    whileHover={{ y: 8 }}
                    transition={{ type: "spring" as const, stiffness: 100, damping: 15 }}
                  >
                    <div className="flex items-center gap-3 p-3 bg-primary-color/5 dark:bg-primary-color/10 rounded-lg border border-primary-color/10 dark:border-primary-color/20">
                      <Play className="h-4 w-4 text-primary-color dark:text-inverse-primary fill-primary-color/20" />
                      <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">
                        Latest YouTube Video
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary-color/5 dark:bg-primary-color/10 rounded-lg border border-primary-color/10 dark:border-primary-color/20">
                      <ShoppingBag className="h-4 w-4 text-primary-color dark:text-inverse-primary" />
                      <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">
                        Merch Store
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary-color/5 dark:bg-primary-color/10 rounded-lg border border-primary-color/10 dark:border-primary-color/20">
                      <Podcast className="h-4 w-4 text-primary-color dark:text-inverse-primary" />
                      <span className="font-label-md text-label-md text-on-surface dark:text-inverse-on-surface">
                        Weekly Newsletter
                      </span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 2: Device Insights */}
          <motion.div
            className="col-span-12 md:col-span-5 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-inverse-surface dark:bg-slate-900 text-on-primary p-8 md:p-12 rounded-[32px] flex flex-col justify-between h-full border border-outline/10 shadow-none">
              <CardContent className="p-0 flex flex-col justify-between h-full">
                <div>
                  <div className="p-3 bg-secondary-fixed/10 dark:bg-secondary-fixed-dim/20 rounded-xl inline-block mb-6">
                    <Smartphone className="h-6 w-6 text-secondary-fixed dark:text-secondary-fixed-dim" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Device Source Insights
                  </h3>
                  <p className="text-outline text-body-md">
                    Understand exactly how your audience finds you. Mobile vs Desktop, iOS vs Android—optimized for your next campaign.
                  </p>
                </div>

                {/* Dynamic Animated Bars */}
                <motion.div
                  className="mt-12 flex items-end justify-center gap-3 h-48"
                  variants={chartContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {barHeights.map((h, index) => (
                    <motion.div
                      key={index}
                      className={`w-8 rounded-t-lg ${
                        index === 3
                          ? "bg-secondary-fixed"
                          : index === 2
                          ? "bg-secondary-fixed/70"
                          : index === 4
                          ? "bg-secondary-fixed/50"
                          : index === 1
                          ? "bg-secondary-fixed/40"
                          : "bg-secondary-fixed/20"
                      }`}
                      custom={h}
                      variants={{
                        hidden: { height: 0 },
                        visible: {
                          height: `${h * 3.5}px`,
                          transition: { duration: 0.8, ease: "easeOut" as const, delay: index * 0.1 }
                        }
                      }}
                    />
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 3: Deep Analytics */}
          <motion.div
            className="col-span-12 md:col-span-5 cursor-pointer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-surface-container-high dark:bg-slate-900/40 p-8 md:p-12 rounded-[32px] flex flex-col justify-between h-full border border-outline-variant/10 dark:border-outline/5 shadow-none">
              <CardContent className="p-0 flex flex-col justify-between h-full gap-8">
                <div className="flex-1">
                  <div className="p-3 bg-primary-color/10 dark:bg-primary-color/20 rounded-xl inline-block mb-6">
                    <LineChart className="h-6 w-6 text-primary-color dark:text-inverse-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-on-surface dark:text-white mb-4">
                    Deep Analytics
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-outline">
                    Real-time traffic trends that go beyond simple clicks. See peak engagement times and high-performing content clusters.
                  </p>
                </div>

                {/* Growth Rate indicator with animated meter */}
                <div className="glass-card dark:bg-slate-950/70 p-6 rounded-2xl border border-outline-variant/20 dark:border-outline/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline">
                      Growth Rate
                    </span>
                    <Badge variant="secondary" className="bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 font-bold border-none px-2 py-0.5 rounded-full text-xs">
                      +24.5%
                    </Badge>
                  </div>
                  <div className="h-2 bg-outline-variant/30 dark:bg-outline/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-color"
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" as const, delay: 0.2 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feature 4: Future-Proof Tools */}
          <motion.div
            className="col-span-12 md:col-span-7 cursor-pointer relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-primary-color text-on-primary p-8 md:p-12 rounded-[32px] overflow-hidden h-full border border-primary-color/20 shadow-none relative">
              <CardContent className="p-0 flex flex-col justify-between h-full relative z-10">
                <div className="max-w-sm">
                  <div className="p-3 bg-primary-fixed-dim/20 rounded-xl inline-block mb-6">
                    <Sparkles className="h-6 w-6 text-primary-fixed-dim" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    Future-Proof Tools
                  </h3>
                  <p className="opacity-80 font-body-md text-white/90">
                    Shortlinks for every social post and custom Forms to build your email list—everything you need in one powerful ecosystem.
                  </p>
                </div>

                {/* Floating Rocket with hover animation */}
                <motion.div
                  className="absolute right-0 bottom-0 text-primary-fixed-dim opacity-10 pointer-events-none"
                  initial={{ rotate: -15, scale: 0.8 }}
                  whileHover={{ rotate: 5, scale: 1.05, x: 10, y: -10 }}
                  transition={{ type: "spring" as const, stiffness: 100, damping: 10 }}
                >
                  <Rocket className="w-[300px] h-[300px] select-none stroke-[0.5px]" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
