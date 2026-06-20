"use client"

import React, { useState, useMemo } from "react"
import { Plus } from "lucide-react"
import { LinkResponse } from "@workspace/utils/types/links"
import { UserProfileResponse } from "@workspace/utils/types/users"
import { LinkEditorDialog } from "./components/link-editor-dialog"
import { ShortLinkDialog } from "./components/short-link-dialog"
import { MobilePreview } from "./components/mobile-preview"
import { DirtySaveBar } from "./components/dirty-save-bar"
import { useDirtyLinks } from "@/hooks/use-dirty-links"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { SortableLinkCard } from "./components/sortable-link-card"
import { DashboardHeader } from "./components/dashboard-header"
import { LinksManagementHeader } from "./components/links-management-header"
import { ComingSoonPanels } from "./components/coming-soon-panels"
import { AlertDialog } from "@workspace/ui/components/alert-dialog"
import { toast } from "@workspace/ui/components/toaster"

interface LinksDashboardContainerProps {
  initialProfile: UserProfileResponse | null
  initialLinks: LinkResponse[]
}

export function LinksDashboardContainer({ initialProfile, initialLinks }: LinksDashboardContainerProps) {
  const [profile] = useState<UserProfileResponse | null>(initialProfile)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeEditLink, setActiveEditLink] = useState<LinkResponse | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [deleteLinkIdConfirm, setDeleteLinkIdConfirm] = useState<string | null>(null)
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false)
  const [shortenLink, setShortenLink] = useState<LinkResponse | null>(null)

  // All link mutation state is managed by the dirty-state hook
  const {
    links,
    sortedLinks,
    isDirty,
    isSaving,
    saveError,
    changeCount,
    queueToggleActive,
    queueSaveLink,
    queueDeleteLink,
    moveLinkCard,
    commitReorder,
    saveAll,
    discardAll,
    updateLinkLocally,
  } = useDirtyLinks(initialLinks)

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
    setDeleteLinkIdConfirm(linkId)
  }

  const confirmDelete = () => {
    if (deleteLinkIdConfirm) {
      queueDeleteLink(deleteLinkIdConfirm)
      toast.success("Link deleted", {
        description: "Click 'Save Changes' to commit the deletion.",
      })
      setDeleteLinkIdConfirm(null)
    }
  }

  // ── Dialog save → queue instead of immediate API call ──────────────────
  const handleSaveLink = async (data: Partial<LinkResponse>) => {
    queueSaveLink(data, activeEditLink)
    setIsEditorOpen(false)
    setActiveEditLink(null)
  }

  // ── Batch save all pending changes ──────────────────────────────────────
  const handleSaveAll = async () => {
    const success = await saveAll()
    if (success) {
      toast.success("Changes saved successfully", {
        description: "All pending updates have been pushed to the server.",
      })
    } else {
      toast.error("Failed to save changes", {
        description: "Some modifications could not be processed.",
      })
    }
  }

  // ── Discard all pending changes ─────────────────────────────────────────
  const handleDiscard = () => {
    setIsDiscardConfirmOpen(true)
  }

  const confirmDiscard = () => {
    discardAll()
    setIsDiscardConfirmOpen(false)
    toast("Changes discarded", {
      description: "Reverted your links to their last saved state.",
    })
  }

  const handleShortenLink = (link: LinkResponse) => {
    setShortenLink(link)
  }

  const handleShortenSuccess = (shortUrl: string, slug: string) => {
    if (shortenLink) {
      updateLinkLocally(shortenLink.id, {
        short_url: shortUrl,
      })
      toast.success("Short link updated successfully!")
    }
  }

  const handleShortenDeleteSuccess = () => {
    if (shortenLink) {
      updateLinkLocally(shortenLink.id, {
        short_url: "",
      })
      toast.success("Short link deleted successfully!")
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Top Header Section */}
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          username={profile?.username}
        />

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Link Management */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Header & Add Button */}
            <LinksManagementHeader
              isDirty={isDirty}
              changeCount={changeCount}
              onAddLinkClick={() => {
                setActiveEditLink(null)
                setIsEditorOpen(true)
              }}
            />

            {/* Links Card Stack */}
            <div className="space-y-4">
              {filteredLinks.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 dark:border-white/5 rounded-3xl bg-white dark:bg-slate-900/10 text-center space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
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
                  const globalIdx = sortedLinks.findIndex((l) => l.id === link.id)
                  return (
                    <SortableLinkCard
                      key={link.id}
                      link={link}
                      index={globalIdx}
                      moveCard={moveLinkCard}
                      commitReorder={commitReorder}
                      handleToggleActive={handleToggleActive}
                      handleDeleteLink={handleDeleteLink}
                      setActiveEditLink={setActiveEditLink}
                      setIsEditorOpen={setIsEditorOpen}
                      handleShortenLink={handleShortenLink}
                    />
                  )
                })
              )}
            </div>

            {/* Coming Soon panels */}
            <ComingSoonPanels />
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

        {/* Short Link Dialog */}
        <ShortLinkDialog
          isOpen={shortenLink !== null}
          onClose={() => setShortenLink(null)}
          linkId={shortenLink?.id || ""}
          linkTitle={shortenLink?.title || ""}
          shortUrl={shortenLink?.short_url}
          onSuccess={handleShortenSuccess}
          onDeleteSuccess={handleShortenDeleteSuccess}
        />

        {/* Delete Confirmation Alert Dialog */}
        <AlertDialog
          isOpen={deleteLinkIdConfirm !== null}
          onClose={() => setDeleteLinkIdConfirm(null)}
          onConfirm={confirmDelete}
          title="Delete Link"
          description="Are you sure you want to delete this link? This change will be enqueued and applied when you save changes."
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
        />

        {/* Discard Confirmation Alert Dialog */}
        <AlertDialog
          isOpen={isDiscardConfirmOpen}
          onClose={() => setIsDiscardConfirmOpen(false)}
          onConfirm={confirmDiscard}
          title="Discard All Changes"
          description="Are you sure you want to discard all unsaved changes? This will revert your links to their last saved state."
          confirmText="Discard Changes"
          cancelText="Keep Editing"
          variant="destructive"
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
            <span className="font-extrabold tracking-wider text-slate-700 dark:text-white uppercase font-display">BIOLYNQ</span>
            <span>© 2026 Biolynq. Informed Growth for Creators.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Status</a>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

