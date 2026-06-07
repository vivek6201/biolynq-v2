"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowRight,
  ShieldCheck,
  Play,
  TrendingUp,
  ShoppingBag,
  Music,
  ExternalLink
} from "lucide-react"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import {YoutubeIcon, TwitterIcon, InstagramIcon} from "@workspace/ui/components/icons"
import { Input } from "@workspace/ui/components/input"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"

export default function HeroSection() {
  const [username, setUsername] = useState("")
  const [claimed, setClaimed] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setClaimed(true)
      setUsername("")
      setTimeout(() => setClaimed(false), 3000)
    }
  }

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 hero-gradient">
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-color/10 dark:bg-primary-color/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-secondary-container/20 dark:bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto px-margin-desktop relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[600px]">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 max-w-2xl text-left z-20"
          >
            {/* Trusted Badge with pulsing green dot */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-outline-variant/30 dark:border-outline/10 text-on-surface dark:text-white mb-8 text-[13px] font-semibold font-display shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Trusted by 10,000+ creators</span>
            </motion.div>

            {/* Headline with premium text gradient */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-display mb-6 tracking-tight text-on-surface dark:text-white leading-[1.1] text-5xl md:text-6xl font-extrabold"
            >
              Your entire digital presence,{" "}
              <span className="bg-linear-to-r from-primary-color via-indigo-600 to-purple-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                linked and analyzed.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="font-body-lg text-body-lg text-on-surface-variant/90 dark:text-outline/90 mb-10 max-w-xl leading-relaxed"
            >
              Consolidate your world into a single, high-converting bio link. Track every click, discover your audience, and grow with precision analytics.
            </motion.p>

            {/* Claim URL Box with focus effect */}
            <motion.div variants={itemVariants} className="mb-6 max-w-lg">
              <form onSubmit={handleClaim} className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-slate-900 rounded-[20px] border border-outline-variant/40 dark:border-outline/10 shadow-lg shadow-primary-color/5 focus-within:ring-2 focus-within:ring-primary-color/40 focus-within:border-primary-color transition-all">
                <div className="flex items-center flex-1 px-3 py-2">
                  <span className="text-on-surface-variant/70 dark:text-outline/70 font-display text-body-md select-none font-medium">
                    biolynq.to/
                  </span>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                    placeholder="yourname"
                    className="flex-1 min-w-0 bg-transparent border-none shadow-none outline-none focus-visible:ring-0 focus-visible:outline-none h-auto p-0 ml-1 text-on-surface dark:text-white font-display text-body-md font-semibold placeholder-outline-variant/60 dark:placeholder-outline/40"
                    maxLength={20}
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary-color hover:bg-primary-container text-on-primary rounded-[16px] font-bold flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap h-auto"
                  >
                    <AnimatePresence mode="wait">
                      {claimed ? (
                        <motion.span
                          key="claimed"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="flex items-center gap-1 font-bold"
                        >
                          Claimed! <ShieldCheck className="h-4 w-4 fill-white text-primary-color" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="claim"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-1.5"
                        >
                          Claim My Link
                          <ArrowRight className="h-4.5 w-4.5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Checklist of value propositions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 max-w-lg">
              <div className="flex items-center gap-1.5 text-on-surface-variant/80 dark:text-outline/80 font-label-sm text-[12px] font-medium">
                <span className="text-secondary-color dark:text-secondary-fixed-dim">✦</span> Free forever
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant/80 dark:text-outline/80 font-label-sm text-[12px] font-medium">
                <span className="text-secondary-color dark:text-secondary-fixed-dim">✦</span> No card required
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant/80 dark:text-outline/80 font-label-sm text-[12px] font-medium">
                <span className="text-secondary-color dark:text-secondary-fixed-dim">✦</span> Setup in 1 minute
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Bento Hub collage */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] w-full mt-12 lg:mt-0 flex justify-center items-center">
            
            {/* Ambient shadow behind the collage */}
            <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -z-10" />

            {/* Card 1: Music Playback Card (Top Left) */}
            <motion.div
              className="absolute left-4 top-8 md:left-12 lg:left-0 xl:-left-12 cursor-pointer z-20"
              initial={{ opacity: 0, x: -50, y: -50, rotate: -8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: [0, -8, 0],
                rotate: -5
              }}
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 0.2
                },
                opacity: { duration: 0.8 },
                x: { duration: 0.8 }
              }}
              whileHover={{ scale: 1.05, y: -12, rotate: -2, zIndex: 30 }}
            >
              <Card className="glass-card dark:bg-slate-900/80 p-4 rounded-2xl shadow-xl w-60 border border-outline-variant/20 dark:border-outline/10">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-linear-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                      <Music className="h-6 w-6 stroke-[1.5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-label-md text-on-surface dark:text-white truncate font-bold">
                        Now Playing
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline truncate">
                        Golden Hours - Single
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary-color/10 flex items-center justify-center text-primary-color dark:text-inverse-primary dark:bg-primary-color/20">
                      <Play className="h-4 w-4 fill-primary-color/20" />
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-outline-variant/30 dark:bg-outline/25 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-color w-[60%]" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2: Analytics Sparks Card (Top Right) */}
            <motion.div
              className="absolute right-4 top-16 md:right-12 lg:right-0 xl:-right-12 cursor-pointer z-20"
              initial={{ opacity: 0, x: 50, y: -50, rotate: 6 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: [0, -10, 0],
                rotate: 4
              }}
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 0.8
                },
                opacity: { duration: 0.8 },
                x: { duration: 0.8 }
              }}
              whileHover={{ scale: 1.05, y: -12, rotate: 0, zIndex: 30 }}
            >
              <Card className="glass-card dark:bg-slate-900/80 p-5 rounded-2xl shadow-xl w-56 border border-outline-variant/20 dark:border-outline/10">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger render={<span className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline hover:text-primary-color dark:hover:text-inverse-primary transition-colors cursor-help" />}>
                          Live Analytics
                        </TooltipTrigger>
                        <TooltipContent>
                          Updated real-time
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-color opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-color"></span>
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-display text-headline-md font-bold text-on-surface dark:text-white">
                      2,492
                    </h4>
                    <Badge variant="secondary" className="bg-secondary-color/10 text-secondary-color dark:bg-secondary-color/20 dark:text-secondary-fixed-dim border-none font-semibold flex items-center gap-0.5 px-1.5 h-5 rounded-full">
                      <TrendingUp className="h-3 w-3" /> +12%
                    </Badge>
                  </div>
                  
                  {/* Custom SVG Sparkline */}
                  <div className="mt-3 h-10 w-full overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <motion.path
                        d="M 0,25 Q 15,10 30,18 T 60,8 T 80,18 T 100,5"
                        fill="none"
                        stroke="var(--color-primary-color)"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                      />
                      <path
                        d="M 0,25 Q 15,10 30,18 T 60,8 T 80,18 T 100,5 L 100,30 L 0,30 Z"
                        fill="url(#grad)"
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="var(--color-primary-color)" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3: Dynamic Simulated User Card (Center - reacting to the username input!) */}
            <motion.div
              className="absolute z-10 w-[280px] cursor-pointer animate-float"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -6, 0]
              }}
              transition={{
                y: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut" as const
                },
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 }
              }}
              whileHover={{ scale: 1.04, y: -10, zIndex: 40 }}
            >
              <Card className="glass-card dark:bg-slate-900/85 p-6 rounded-[28px] shadow-2xl border-2 border-primary-color/20 dark:border-primary-color/30 flex flex-col items-center text-center">
                <CardContent className="p-0 flex flex-col items-center w-full">
                  {/* Profile Avatar Grid */}
                  <div className="relative mb-4">
                    <div className="h-20 w-20 rounded-full bg-linear-to-tr from-primary-color to-secondary-container p-1 shadow-md">
                      <div className="h-full w-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-primary-color dark:text-inverse-primary font-display font-bold text-2xl">
                        {username ? username.charAt(0).toUpperCase() : "B"}
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger render={<div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-secondary-color flex items-center justify-center text-white border-2 border-white dark:border-slate-800 cursor-help" />}>
                          <ShieldCheck className="h-3.5 w-3.5 fill-white text-secondary-color" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Verified Profile
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Profile details */}
                  <h4 className="font-display text-label-md font-bold text-on-surface dark:text-white">
                    {username ? `@${username}` : "@creator"}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline mt-1 mb-4">
                    biolynq.to/{username || "yourname"}
                  </p>

                  {/* Mock Links Stack (using real shadcn buttons!) */}
                  <div className="w-full space-y-2">
                    <Button className="w-full bg-primary-color hover:bg-primary-container text-on-primary rounded-xl font-semibold shadow-sm h-10 select-none cursor-pointer">
                      My Work & Portfolio
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl font-semibold h-10 select-none border-outline-variant/30 dark:border-outline/10 text-on-surface dark:text-white bg-transparent cursor-pointer">
                      Support My Store
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 4: Social stack (Bottom Left) */}
            <motion.div
              className="absolute left-2 bottom-8 md:left-8 lg:left-0 xl:-left-10 cursor-pointer z-20"
              initial={{ opacity: 0, x: -50, y: 50, rotate: -4 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: [0, -7, 0],
                rotate: -3
              }}
              transition={{
                y: {
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 0.5
                },
                opacity: { duration: 0.8 },
                x: { duration: 0.8 }
              }}
              whileHover={{ scale: 1.05, y: -12, rotate: 0, zIndex: 30 }}
            >
              <Card className="glass-card dark:bg-slate-900/80 p-3.5 rounded-2xl shadow-xl border border-outline-variant/20 dark:border-outline/10">
                <CardContent className="p-0 flex gap-3 text-on-surface-variant dark:text-outline">
                  <div className="p-2.5 bg-red-500/10 dark:bg-red-500/20 text-red-500 rounded-xl">
                    <YoutubeIcon className="h-5 w-5" />
                  </div>
                  <div className="p-2.5 bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 rounded-xl">
                    <TwitterIcon className="h-5 w-5" />
                  </div>
                  <div className="p-2.5 bg-pink-500/10 dark:bg-pink-500/20 text-pink-500 rounded-xl">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 5: Store Product Card (Bottom Right) */}
            <motion.div
              className="absolute right-2 bottom-6 md:right-8 lg:right-0 xl:-right-10 cursor-pointer z-20"
              initial={{ opacity: 0, x: 50, y: 50, rotate: 5 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: [0, -9, 0],
                rotate: 3
              }}
              transition={{
                y: {
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: 1.1
                },
                opacity: { duration: 0.8 },
                x: { duration: 0.8 }
              }}
              whileHover={{ scale: 1.05, y: -12, rotate: 0, zIndex: 30 }}
            >
              <Card className="glass-card dark:bg-slate-900/80 p-4 rounded-2xl shadow-xl w-52 border border-outline-variant/20 dark:border-outline/10">
                <CardContent className="p-0 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-container/20 dark:bg-secondary-container/10 flex items-center justify-center text-on-secondary-container dark:text-secondary-fixed-dim">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-label-sm text-on-surface dark:text-white font-bold truncate">
                      Merch Item
                    </p>
                    <p className="font-body-sm text-body-sm text-secondary-color dark:text-secondary-fixed-dim font-semibold">
                      $19.00
                    </p>
                  </div>
                  <Button size="xs" className="px-2.5 h-6 bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 rounded-md font-bold text-[10px] border-none cursor-pointer">
                    Buy
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
