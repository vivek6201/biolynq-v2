"use client"

import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { useSession } from "@/hooks/use-session"

export default function CtaSection() {
  const { isAuthenticated } = useSession()

  return (
    <section className="py-24 overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <motion.div
          className="bg-primary-color rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-[1.1] font-black">
              Ready to grow? Join the <span className="bg-linear-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">Biolynq inner circle</span> today.
            </h2>
            <p className="text-primary-fixed-dim font-body-lg mb-10 text-lg opacity-90 max-w-xl mx-auto leading-relaxed">
              Stop guessing. Start growing. The most powerful digital presence tool is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      className="px-10 py-6 bg-white hover:bg-slate-100 text-primary-color rounded-full font-bold shadow-xl cursor-pointer h-auto text-base"
                    >
                      Go to Dashboard
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <Link href="/get-started">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      className="px-10 py-6 bg-white hover:bg-slate-100 text-primary-color rounded-full font-bold shadow-xl cursor-pointer h-auto text-base"
                    >
                      Get Started Now
                    </Button>
                  </motion.div>
                </Link>
              )}
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  className="px-10 py-6 border-white/20 hover:bg-white/10 text-white rounded-full font-bold cursor-pointer h-auto text-base bg-transparent"
                >
                  Talk to Sales
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px"
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
