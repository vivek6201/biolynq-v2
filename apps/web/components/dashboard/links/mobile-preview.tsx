"use client"

import React from "react"
import { LinkResponse } from "@workspace/utils/types/links"
import { UserProfileResponse } from "@workspace/utils/types/users"
import { 
  Wifi, 
  Battery, 
  Share2, 
  Globe,
  ExternalLink,
  Mail
} from "lucide-react"
import {
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
} from "@workspace/ui/components/icons"

interface MobilePreviewProps {
  profile: UserProfileResponse | null
  links: LinkResponse[]
}

// Helper to determine brand icon from URL
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

export function MobilePreview({ profile, links }: MobilePreviewProps) {
  const visibleLinks = links.filter((l) => l.is_active)
  
  // Format copyable link
  const getProfileUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/${profile?.username || "username"}`
    }
    return `biolynq.in/${profile?.username || "username"}`
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(getProfileUrl())
      alert("Profile URL copied to clipboard!")
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Label Indicator */}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live Preview</span>
      </span>

      {/* Phone Mockup Wrapper */}
      <div className="relative border-8 border-slate-900 dark:border-slate-800 shadow-2xl rounded-[40px] h-[550px] w-[270px] bg-slate-50 dark:bg-slate-950 flex flex-col overflow-hidden ring-1 ring-slate-950/10">
        
        {/* Notch & Camera Pill */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-between px-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
          <span className="w-10 h-1 bg-slate-800 rounded-full"></span>
        </div>

        {/* Status Bar */}
        <div className="h-8 flex justify-between items-center px-6 pt-1.5 z-20 text-[10px] font-black font-sans text-slate-900 dark:text-white">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <Wifi className="h-2.5 w-2.5" />
            <Battery className="h-3 w-3" />
          </div>
        </div>

        {/* Dynamic Profile Preview Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4 flex flex-col items-center space-y-6 select-none scrollbar-none">
          
          {/* User Details */}
          <div className="flex flex-col items-center space-y-3 text-center">
            {/* Avatar circle */}
            <div className="h-16 w-16 rounded-full bg-primary-color/10 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center overflow-hidden">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-indigo-50 dark:bg-slate-800 text-primary-color dark:text-secondary-fixed-dim font-bold text-lg">
                  {profile?.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Display Name & Bio */}
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-white font-display">
                {profile?.display_name || profile?.username || "Your Name"}
              </h4>
              <p className="text-[10px] leading-relaxed text-slate-400 font-semibold max-w-[190px] line-clamp-3">
                {profile?.bio || "Describe yourself here. Share links, social profiles, and write a beautiful bio."}
              </p>
            </div>
          </div>

          {/* Links list buttons */}
          <div className="w-full flex-1 flex flex-col space-y-2.5">
            {visibleLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-slate-200 dark:border-white/5 rounded-2xl text-[9px] text-slate-400">
                <span>No active links.</span>
                <span>Toggling Visible will show them here.</span>
              </div>
            ) : (
              visibleLinks
                .sort((a, b) => a.position - b.position)
                .map((link, idx) => {
                  const Icon = getSocialIcon(link.url)
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-bold text-center flex items-center justify-between border transition-all active:scale-98 ${
                        idx === 0 
                          ? "bg-primary-color text-white border-primary-color shadow-sm shadow-indigo-650/10 hover:bg-primary-color/95" 
                          : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/2"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 opacity-80" />
                      <span className="truncate flex-1 px-2">{link.title || "Untitled Link"}</span>
                      <ExternalLink className="h-3 w-3 opacity-40" />
                    </a>
                  )
                })
            )}
          </div>

          {/* Phone Footer Branding */}
          <span className="text-[9px] font-black tracking-wider text-slate-350 dark:text-slate-750 font-display mt-auto pt-6">
            Biolynq
          </span>
        </div>

        {/* Home swipe indicator bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-300 dark:bg-slate-700 rounded-full z-20"></div>
      </div>

      {/* Share / Copy Button below phone frame */}
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary-color dark:hover:text-secondary-fixed-dim transition-colors cursor-pointer select-none"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share your profile link</span>
      </button>
    </div>
  )
}
