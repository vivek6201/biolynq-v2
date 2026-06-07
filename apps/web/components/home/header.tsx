"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "motion/react"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 0)

    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { text: "Features", href: "#", active: true },
    { text: "Pricing", href: "#" },
    { text: "Analytics", href: "#" },
    { text: "Shortlinks", href: "#" }
  ]

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-300">
      <motion.nav
        className={`w-full transition-all duration-500 ease-out flex items-center justify-between border ${
          scrolled
            ? "max-w-4xl py-2.5 px-6 bg-white/80 dark:bg-slate-900/85 border-outline-variant/30 dark:border-outline/25 shadow-lg shadow-black/5 backdrop-blur-lg rounded-full"
            : "max-w-5xl py-4 px-8 bg-white/40 dark:bg-slate-900/30 border-outline-variant/15 dark:border-outline/5 shadow-sm backdrop-blur-md rounded-full"
        }`}
        layout
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <motion.a
            href="#"
            className="font-display text-headline-md font-extrabold tracking-tight text-primary-color dark:text-inverse-primary select-none flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Biolynq
            <span className="text-secondary-color dark:text-secondary-fixed-dim text-4xl leading-0 ml-0.5">
              .
            </span>
          </motion.a>
        </div>

        {/* Desktop CTAs & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="rounded-full text-on-surface-variant dark:text-outline hover:text-primary-color dark:hover:text-inverse-primary hover:bg-slate-100/50 dark:hover:bg-slate-800/40 border border-transparent hover:border-outline-variant/10 dark:hover:border-outline/5 cursor-pointer"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          )}
          
          <Link href="/get-started" className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                className="bg-primary-color text-on-primary rounded-full font-bold shadow-md shadow-primary-color/10 hover:bg-primary-container h-10 px-6 cursor-pointer"
              >
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-on-surface-variant dark:text-outline"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-on-surface-variant dark:text-outline"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Dropdown Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 bg-white/95 dark:bg-slate-900/95 border border-outline-variant/30 dark:border-outline/20 p-6 rounded-[28px] shadow-2xl backdrop-blur-lg flex flex-col gap-4 z-40 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl font-label-md text-label-md transition-colors ${
                    link.active
                      ? "bg-primary-color/10 text-primary-color dark:bg-primary-color/20 dark:text-inverse-primary font-bold"
                      : "text-on-surface-variant dark:text-outline hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.text}
                </a>
              ))}
            </div>
            <Separator className="bg-outline-variant/30 dark:bg-outline/10 my-1" />
            <div className="flex flex-col gap-3">
              <Link href="/get-started" className="w-full">
                <Button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-primary-color text-on-primary rounded-2xl font-bold shadow-md shadow-primary-color/10 hover:bg-primary-container cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
