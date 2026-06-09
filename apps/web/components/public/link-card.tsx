"use client"

import React from "react"
import { ChevronRight, Globe, Mail } from "lucide-react"
import {
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
} from "@workspace/ui/components/icons"
import { API_URL } from "@workspace/utils/api/index"
import type { LinkResponse } from "@workspace/utils/types/links"
import Link from "next/link"

interface LinkCardProps {
  link: LinkResponse
}

export function LinkCard({ link }: LinkCardProps) {
  // Get a matching icon for link URLs
  const getLinkIcon = (url: string, iconUrl?: string) => {
    if (iconUrl) {
      return (
        <img
          src={iconUrl}
          alt=""
          className="h-5 w-5 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
      )
    }

    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes("instagram.com"))
      return <InstagramIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be"))
      return <YoutubeIcon className="h-5 w-5 text-rose-600 dark:text-rose-400" />
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com"))
      return <TwitterIcon className="h-5 w-5 text-sky-500 dark:text-sky-400" />
    if (lowerUrl.includes("github.com"))
      return <GithubIcon className="h-5 w-5 text-slate-800 dark:text-slate-200" />
    if (lowerUrl.includes("linkedin.com"))
      return <LinkedinIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    if (lowerUrl.includes("mail") || lowerUrl.includes("@"))
      return <Mail className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
    return <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
  }

  // Generate a soft background color for link icon container
  const getIconBg = (url: string) => {
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes("instagram.com")) return "bg-pink-50 dark:bg-pink-950/20"
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be"))
      return "bg-rose-50 dark:bg-rose-950/20"
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com"))
      return "bg-sky-50 dark:bg-sky-950/20"
    if (lowerUrl.includes("github.com")) return "bg-slate-100 dark:bg-slate-900/50"
    if (lowerUrl.includes("linkedin.com")) return "bg-blue-50 dark:bg-blue-950/20"
    return "bg-emerald-50 dark:bg-emerald-950/20"
  }

  return (
    <Link
      href={`${API_URL}/visit/${link.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-4 bg-white dark:bg-slate-900/60 border border-slate-200/40 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full hover:-translate-y-0.5"
    >
      <div className="flex items-center space-x-4">
        {/* Soft Background Icon Box */}
        <div className={`p-2.5 rounded-xl ${getIconBg(link.url)} flex items-center justify-center shrink-0`}>
          {getLinkIcon(link.url, link.icon_url)}
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
            {link.title}
          </p>
          {link.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
              {link.description}
            </p>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
    </Link>
  )
}
