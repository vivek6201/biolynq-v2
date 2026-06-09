"use client"

import React, { useState, useMemo } from "react"
import {
  Search,
  Bell,
  HelpCircle,
  Copy,
  Check,
  Plus,
  GripVertical,
  TrendingUp,
  Image as ImageIcon,
  Pencil,
  Trash2,
  FileText,
  Mail,
  AlertCircle,
} from "lucide-react"
import { LinkResponse } from "@workspace/utils/types/links"
import { UserProfileResponse } from "@workspace/utils/types/users"
import { LinkEditorDialog } from "./link-editor-dialog"
import { MobilePreview } from "./mobile-preview"
import { DirtySaveBar } from "./dirty-save-bar"
import { Button } from "@workspace/ui/components/button"
import { useDirtyLinks } from "@/hooks/use-dirty-links"

interface LinksDashboardContainerProps {
  initialProfile: UserProfileResponse | null
  initialLinks: LinkResponse[]
}

export function LinksDashboardContainer({ initialProfile, initialLinks }: LinksDashboardContainerProps) {
  const [profile] = useState<UserProfileResponse | null>(initialProfile)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeEditLink, setActiveEditLink] = useState<LinkResponse | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // All link mutation state is managed by the dirty-state hook
  const {
    links,
    sortedLinks,
    isDirty,
    isSaving,
    saveError,
    setSaveError,
    changeCount,
    queueToggleActive,
    queueSaveLink,
    queueDeleteLink,
    saveAll,
    discardAll,
  } = useDirtyLinks(initialLinks)

  // ── Copy Profile URL ────────────────────────────────────────────────────
  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(`biolynq.in/${profile?.username || "username"}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Search filter ───────────────────────────────────────────────────────
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return sortedLinks
    const q = searchQuery.toLowerCase()
    return sortedLinks.filter(
      (l) =>
        (l.title && l.title.toLowerCase().includes(q)) ||
        (l.url && l.url.toLowerCase().includes(q))
    )
  }, [sortedLinks, searchQuery])

  // ── Toggle active (queues change, no API call yet) ─────────────────────
  const handleToggleActive = (link: LinkResponse) => {
    queueToggleActive(link)
  }

  // ── Delete link (queues change, no API call yet) ────────────────────────
  const handleDeleteLink = (linkId: string) => {
    if (!confirm("Are you sure you want to delete this link? This will apply when you save.")) return
    queueDeleteLink(linkId)
  }

  // ── Dialog save → queue instead of immediate API call ──────────────────
  const handleSaveLink = async (data: Partial<LinkResponse>) => {
    queueSaveLink(data, activeEditLink)
    setIsEditorOpen(false)
    setActiveEditLink(null)
  }

  // ── Batch save all pending changes ──────────────────────────────────────
  const handleSaveAll = async () => {
    await saveAll()
  }

  // ── Discard all pending changes ─────────────────────────────────────────
  const handleDiscard = () => {
    if (
      !confirm(
        "Discard all unsaved changes? This will revert your links to their last saved state."
      )
    )
      return
    discardAll()
  }

  // ── Mock click metric ──────────────────────────────────────────────────
  const getMockClicks = (id: string) => {
    if (id.startsWith("temp_")) return "—"
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    const clicks = Math.abs(hash % 4800) + 120
    return clicks >= 1000 ? `${(clicks / 1000).toFixed(1)}k Clicks` : `${clicks} Clicks`
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-white/5">
        {/* Search input */}
        <div className="relative w-full sm:max-w-xs md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim placeholder:text-slate-400"
          />
        </div>

        {/* Action icons & Copyable link */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <button className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-250/30 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-xs">
            <Bell className="h-4 w-4" />
          </button>
          <button className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-250/30 dark:border-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-xs">
            <HelpCircle className="h-4 w-4" />
          </button>

          <div className="h-6 w-px bg-slate-250 dark:bg-white/10" />

          <button
            onClick={handleCopyProfileUrl}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-bold text-primary-color dark:text-secondary-fixed-dim transition-all shadow-xs"
          >
            <span>biolynq.in/{profile?.username || "username"}</span>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Link Management */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">

          {/* Header & Add Button */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900/40 p-5 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-md font-bold tracking-tight text-slate-800 dark:text-white font-display">
                  Link Management
                </h2>
                {isDirty && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider">
                    Unsaved
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {isDirty
                  ? `${changeCount} pending change${changeCount !== 1 ? "s" : ""} — click Save to publish`
                  : "Organize and optimize your bio profile links."}
              </p>
            </div>

            <Button
              onClick={() => {
                setActiveEditLink(null)
                setIsEditorOpen(true)
              }}
              className="rounded-2xl flex items-center space-x-2 bg-primary-color hover:bg-primary-color/90 text-white text-xs font-bold px-4 py-2.5 cursor-pointer shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Link</span>
            </Button>
          </div>

          {/* Links Card Stack */}
          <div className="space-y-4">
            {filteredLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 dark:border-white/5 rounded-3xl bg-white dark:bg-slate-900/10 text-center space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400">
                  <Plus className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350">
                    No links found
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-xs">
                    {searchQuery
                      ? "No matches found for your search query."
                      : "Start building your page by adding links, social media handles, and icons."}
                  </p>
                </div>
              </div>
            ) : (
              filteredLinks.map((link) => {
                const isPending = link.id.startsWith("temp_")
                return (
                  <div
                    key={link.id}
                    className={`flex items-start bg-white dark:bg-slate-900 border transition-all rounded-3xl p-5 shadow-xs hover:shadow-md ${
                      link.is_active
                        ? "border-slate-200/60 dark:border-white/5"
                        : "border-slate-100 dark:border-white/2 opacity-75"
                    } ${isPending ? "ring-1 ring-amber-300/60 dark:ring-amber-700/40" : ""}`}
                  >
                    {/* Drag Handle */}
                    <div className="mt-2 text-slate-300 dark:text-slate-650 cursor-grab active:cursor-grabbing mr-4 p-1 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg">
                      <GripVertical className="h-4.5 w-4.5" />
                    </div>

                    {/* Link Metadata */}
                    <div className="flex-1 space-y-3 min-w-0">
                      {/* Top Row */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-display">
                              {link.title || "Untitled Link"}
                            </h4>
                            {isPending && (
                              <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[8px] font-black uppercase tracking-wider">
                                New
                              </span>
                            )}
                          </div>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-slate-400 hover:text-primary-color dark:hover:text-secondary-fixed-dim truncate block font-semibold transition-colors"
                          >
                            {link.url}
                          </a>
                        </div>

                        {/* Visibility Toggle */}
                        <div className="flex flex-col items-center space-y-1 select-none">
                          <button
                            onClick={() => handleToggleActive(link)}
                            className={`relative w-10 h-5.5 rounded-full transition-colors focus:outline-hidden ${
                              link.is_active
                                ? "bg-emerald-500"
                                : "bg-slate-200 dark:bg-slate-800"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full transition-transform ${
                                link.is_active ? "translate-x-4.5" : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">
                            {link.is_active ? "Visible" : "Hidden"}
                          </span>
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 font-bold">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1.5">
                            <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                            <span>{getMockClicks(link.id)}</span>
                          </span>
                          <span className="flex items-center space-x-1.5">
                            <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                            <span>Thumbnail</span>
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setActiveEditLink(link)
                              setIsEditorOpen(true)
                            }}
                            className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Coming Soon panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="border border-dashed border-slate-250 dark:border-white/10 rounded-[32px] bg-slate-50/20 dark:bg-slate-900/5 p-6 flex flex-col items-center text-center space-y-4 shadow-2xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-white/5 text-primary-color dark:text-secondary-fixed-dim">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-255 font-display">Custom Forms</h4>
                <p className="text-[10px] leading-relaxed text-slate-400 font-semibold max-w-[180px]">
                  Capture leads and inquiries directly from your profile.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[8px] font-bold text-slate-400 tracking-wider">Coming Soon</span>
            </div>
            <div className="border border-dashed border-slate-250 dark:border-white/10 rounded-[32px] bg-slate-50/20 dark:bg-slate-900/5 p-6 flex flex-col items-center text-center space-y-4 shadow-2xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-white/5 text-primary-color dark:text-secondary-fixed-dim">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-255 font-display">Email List</h4>
                <p className="text-[10px] leading-relaxed text-slate-400 font-semibold max-w-[180px]">
                  Grow your newsletter with integrated subscription widgets.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[8px] font-bold text-slate-400 tracking-wider">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mobile Preview */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-xs flex flex-col items-center">
          <MobilePreview profile={profile} links={links} />
        </div>
      </div>

      {/* Link Editor Dialog */}
      <LinkEditorDialog
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false)
          setActiveEditLink(null)
        }}
        onSave={handleSaveLink}
        link={activeEditLink}
      />

      {/* Floating dirty save bar */}
      <DirtySaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        changeCount={changeCount}
        saveError={saveError}
        onSave={handleSaveAll}
        onDiscard={handleDiscard}
      />

      {/* Footer */}
      <div className="pt-10 border-t border-slate-200/60 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-semibold leading-normal">
        <div className="flex items-center space-x-1.5">
          <span className="font-extrabold tracking-wider text-slate-750 dark:text-white uppercase font-display">BIOLYNQ</span>
          <span>© 2026 Biolynq. Informed Growth for Creators.</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-slate-805 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-805 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-805 dark:hover:text-white transition-colors">Support</a>
          <a href="#" className="hover:text-slate-805 dark:hover:text-white transition-colors">Status</a>
        </div>
      </div>
    </div>
  )
}
