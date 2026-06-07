"use client"

import React from "react"
import { motion } from "motion/react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import { ArrowRight } from "lucide-react"
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@workspace/ui/components/icons"

export default function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { text: "Features", href: "#" },
        { text: "Marketplace", href: "#" },
        { text: "Templates", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Enterprise", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Help Center", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Community", href: "#" },
        { text: "Creators", href: "#" },
        { text: "Careers", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "#" },
        { text: "Press & News", href: "#" },
        { text: "Contact Support", href: "#" },
        { text: "Partnerships", href: "#" },
        { text: "Trust Center", href: "#" }
      ]
    }
  ]

  const socialLinks = [
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: YoutubeIcon, href: "#", label: "YouTube" },
    { icon: GithubIcon, href: "#", label: "GitHub" },
    { icon: LinkedinIcon, href: "#", label: "LinkedIn" }
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thanks for subscribing!")
  }

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-outline-variant/20 dark:border-outline/10 pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <span className="font-display text-headline-md text-primary-color dark:text-inverse-primary font-extrabold flex items-center select-none">
              Biolynq
              <span className="text-secondary-color dark:text-secondary-fixed-dim text-4xl leading-0 ml-0.5">
                .
              </span>
            </span>
            <p className="font-body-md text-on-surface-variant dark:text-outline max-w-sm leading-relaxed text-sm">
              The ultimate digital presence orchestrator. We enable modern creators and brands to link their entire worlds and decode audience analytics.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="h-9 w-9 rounded-full bg-white dark:bg-slate-900 border border-outline-variant/30 dark:border-outline/10 flex items-center justify-center text-on-surface-variant dark:text-outline hover:text-primary-color dark:hover:text-inverse-primary hover:border-primary-color dark:hover:border-inverse-primary transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            {footerSections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <span className="font-display text-sm font-bold tracking-wider uppercase text-on-surface/90 dark:text-white/90">
                  {section.title}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <motion.a
                        href={link.href}
                        className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline hover:text-primary-color dark:hover:text-inverse-primary hover:underline transition-colors block py-0.5"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {link.text}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Subscription / Newsletter Box */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <span className="font-display text-sm font-bold tracking-wider uppercase text-on-surface/90 dark:text-white/90">
              Stay in the Loop
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline leading-relaxed">
              Subscribe to our newsletter for brand tips, analytics hacks, and feature updates.
            </p>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2 mt-2">
              <div className="relative flex items-center w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pr-12 rounded-xl border border-outline-variant/30 dark:border-outline/10 bg-white dark:bg-slate-900 focus-visible:ring-primary-color text-on-surface dark:text-white"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 bottom-1 h-7.5 w-7.5 bg-primary-color hover:bg-primary-container text-on-primary rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

        </div>

        <Separator className="bg-outline-variant/20 dark:bg-outline/10 mb-8" />

        {/* Bottom Utility Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/80 dark:text-outline/85">
          <p>© {new Date().getFullYear()} Biolynq. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-color dark:hover:text-inverse-primary hover:underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-color dark:hover:text-inverse-primary hover:underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-color dark:hover:text-inverse-primary hover:underline transition-colors">
              Security
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
