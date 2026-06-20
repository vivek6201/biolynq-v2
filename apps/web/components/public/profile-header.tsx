"use client"

import React, { useState } from "react"
import { Share2, Globe, Mail } from "lucide-react"
import {
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
} from "@workspace/ui/components/icons"
import { motion, AnimatePresence } from "motion/react"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import type { UserProfileResponse } from "@workspace/utils/types/users"
import Link from "next/link"
import { API_URL } from "@workspace/utils/api/index"
import { cn } from "@workspace/ui/lib/utils"

interface ProfileHeaderProps {
  profile: UserProfileResponse
}

const getSocialIcon = (urlStr: string) => {
  if (!urlStr) return Globe
  const url = urlStr.toLowerCase()
  if (url.includes("instagram.com")) return InstagramIcon
  if (url.includes("youtube.com") || url.includes("youtu.be")) return YoutubeIcon
  if (url.includes("twitter.com") || url.includes("x.com")) return TwitterIcon
  if (url.includes("github.com")) return GithubIcon
  if (url.includes("linkedin.com")) return LinkedinIcon
  if (url.includes("mail") || url.includes("@")) return Mail
  return Globe
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const socialLinks = (profile.links || []).filter((l) => l.is_social && l.is_active)

  return (
    <div className="flex flex-col items-center text-center space-y-8 w-full">
      {/* Top Branding */}
      <div className="flex items-center space-x-1.5 opacity-90 select-none">
        <svg
          className="h-5 w-5 text-indigo-600 dark:text-secondary-fixed-dim"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span className="font-display text-sm font-black tracking-tight text-slate-800 dark:text-slate-200">
          Biolynq
        </span>
      </div>

      {/* User Info Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar Container */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl bg-slate-200 dark:bg-slate-800">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 text-3xl font-black font-display">
                {profile.display_name?.[0]?.toUpperCase() || profile.username?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          {/* Green Online Badge */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800 animate-pulse" />
        </div>

        {/* Name & Bio */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            {profile.display_name || profile.username}
          </h2>
          {profile.bio && (
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xs leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Social Row / Quick Connect Icons */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
          {/* Copy Link / Share Action */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleShare}
              className="rounded-full bg-white dark:bg-slate-900 border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-2.5 py-1 rounded-md shadow-md"
                >
                  Link copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Social Link Icons */}
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.url)
            return (
              <Link
                key={link.id}
                href={link.short_url || `${API_URL}/visit/${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                title={link.title}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "rounded-full bg-white dark:bg-slate-900 border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm flex items-center justify-center"
                )}
              >
                {link.icon_url ? (
                  <img
                    src={link.icon_url}
                    alt={link.title}
                    className="h-4 w-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
