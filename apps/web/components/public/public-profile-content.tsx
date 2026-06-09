"use client"

import React from "react"
import type { UserProfileResponse } from "@workspace/utils/types/users"
import { ThemeToggle } from "./theme-toggle"
import { ProfileHeader } from "./profile-header"
import { LinkCard } from "./link-card"
import { NewsletterForm } from "./newsletter-form"

interface PublicProfileContentProps {
  profile: UserProfileResponse
}

export function PublicProfileContent({ profile }: PublicProfileContentProps) {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col justify-between py-12 px-4 select-none overflow-hidden radial-gradient-decorations">
      {/* Background radial soft lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-primary-color/5 dark:bg-primary-color/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-secondary-color/5 dark:bg-secondary-color/10 blur-[150px] pointer-events-none" />

      {/* Floating Theme Toggle (Top Right) */}
      <ThemeToggle />

      {/* Profile Container */}
      <main className="flex-1 flex flex-col items-center max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* User Info & Social Actions Header */}
        <ProfileHeader profile={profile} />

        {/* Links List */}
        <div className="w-full space-y-4">
          {profile.links && profile.links.length > 0 ? (
            profile.links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 font-semibold text-sm">
              No links available yet.
            </div>
          )}
        </div>

        {/* Newsletter Subscription Form Card */}
        <NewsletterForm />
      </main>

      {/* Footer Branding & Links */}
      <footer className="mt-12 text-center space-y-4 relative z-10">
        <div className="flex justify-center items-center gap-6 text-[10px] font-bold text-slate-400 dark:text-slate-500">
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">Support</a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">Status</a>
        </div>
        <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 tracking-wide">
          Biolynq <span className="opacity-60">&bull;</span> &copy; {new Date().getFullYear()} Biolynq. Informed Growth for Creators.
        </p>
      </footer>
    </div>
  )
}
