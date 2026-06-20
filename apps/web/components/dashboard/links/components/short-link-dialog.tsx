"use client"

import React, { useState, useEffect, useCallback } from "react"
import { X, Loader2, Link2, Trash2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { createShortLink, updateShortLink, deleteShortLink, checkShortLinkSlug } from "@workspace/utils/api/links"

interface ShortLinkDialogProps {
  isOpen: boolean
  onClose: () => void
  linkId: string
  linkTitle: string
  shortUrl?: string
  onSuccess: (shortUrl: string, slug: string) => void
  onDeleteSuccess: () => void
}

export function ShortLinkDialog({
  isOpen,
  onClose,
  linkId,
  linkTitle,
  shortUrl,
  onSuccess,
  onDeleteSuccess,
}: ShortLinkDialogProps) {
  const [shortAlias, setShortAlias] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle")

  const activeSlug = shortUrl ? shortUrl.split("/").pop() : undefined
  const hasShortLink = !!shortUrl

  const checkAvailability = useCallback((val: string) => {
    let tChecking: NodeJS.Timeout | null = null
    let delay: NodeJS.Timeout | null = null

    if (val.length < 3) {
      setSlugStatus("idle")
      return () => {}
    }

    if (hasShortLink && val === activeSlug) {
      setSlugStatus("available")
      return () => {}
    }

    if (/[^a-z0-9_-]/.test(val)) {
      setSlugStatus("invalid")
      return () => {}
    }

    tChecking = setTimeout(() => {
      setSlugStatus("checking")
    }, 0)

    delay = setTimeout(() => {
      checkShortLinkSlug(val)
        .then((res) => {
          if (res.success) {
            setSlugStatus("available")
          } else {
            setSlugStatus("taken")
          }
        })
        .catch(() => {
          setSlugStatus("taken")
        })
    }, 600)

    return () => {
      if (tChecking) clearTimeout(tChecking)
      if (delay) clearTimeout(delay)
    }
  }, [hasShortLink, activeSlug])

  // Track availability reactively
  useEffect(() => {
    if (!isOpen) return
    const cleanUp = checkAvailability(shortAlias)
    return cleanUp
  }, [shortAlias, checkAvailability, isOpen])

  // Reset inputs when dialog state changes
  useEffect(() => {
    if (isOpen) {
      setShortAlias("")
      setError(null)
      setSlugStatus("idle")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasShortLink && !shortAlias.trim()) {
      setError("Please specify a new short alias.")
      return
    }

    if (shortAlias && (shortAlias.length < 3 || shortAlias.length > 50)) {
      setError("Alias must be between 3 and 50 characters.")
      return
    }

    if (shortAlias && slugStatus !== "available") {
      setError("Please choose an available short alias.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      if (hasShortLink && activeSlug) {
        const res = await updateShortLink(linkId, activeSlug, shortAlias)
        if (res.success && res.data) {
          onSuccess(res.data.short_url, res.data.slug)
          setShortAlias("")
          onClose()
        } else {
          setError(res.message || "Failed to update short link.")
        }
      } else {
        const res = await createShortLink(linkId, shortAlias || undefined)
        if (res.success && res.data) {
          onSuccess(res.data.short_url, res.data.slug || "")
          setShortAlias("")
          onClose()
        } else {
          setError(res.message || "Failed to create short link.")
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!activeSlug) return

    setIsDeleting(true)
    setError(null)

    try {
      const res = await deleteShortLink(linkId, activeSlug)
      if (res.success) {
        onDeleteSuccess()
        onClose()
      } else {
        setError(res.message || "Failed to delete short link.")
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Backdrop overlay tap-to-close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 p-6 rounded-3xl shadow-2xl z-10 animate-in zoom-in-95 duration-200 flex flex-col space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <div className="flex items-center space-x-2">
            <Link2 className="h-5 w-5 text-primary-color dark:text-emerald-400" />
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display">
              {hasShortLink ? "Manage Short Link" : "Create Short Link"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="text-xs text-slate-400 space-y-2">
          <p>
            Configure shortened redirection URL for <span className="font-semibold text-slate-600 dark:text-slate-300">"{linkTitle}"</span>.
          </p>
          {hasShortLink && shortUrl && (
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/30 rounded-2xl space-y-1">
              <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                Current Active Short Link
              </div>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-700 dark:text-slate-200 hover:underline break-all"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-semibold leading-normal">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {hasShortLink ? "New Short Alias" : "Short Alias (Optional)"}
            </label>
            <div className="relative flex items-center">
              <Input
                value={shortAlias}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
                  setShortAlias(val)
                }}
                type="text"
                placeholder={hasShortLink ? "e.g. new-alias (min 3 chars)" : "e.g. my-promo-link (min 3 chars)"}
                className="w-full pr-10 px-4 py-2.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim"
                disabled={isSubmitting || isDeleting}
              />
              <div className="absolute right-3 flex items-center">
                {slugStatus === "checking" && (
                  <Loader2 className="h-4 w-4 text-primary-color dark:text-emerald-400 animate-spin" />
                )}
                {slugStatus === "available" && shortAlias.length >= 3 && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                )}
                {(slugStatus === "taken" || slugStatus === "invalid") && shortAlias.length >= 3 && (
                  <XCircle className="h-4 w-4 text-rose-500" />
                )}
              </div>
            </div>
            
            {/* Feedback message */}
            <div className="h-5 pl-1 mt-1">
              {slugStatus === "available" && shortAlias.length >= 3 && (
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  🎉 Short link alias is available!
                </p>
              )}
              {slugStatus === "taken" && (
                <p className="text-[10px] font-bold text-rose-500">
                  ⚠️ This alias is already taken.
                </p>
              )}
              {slugStatus === "invalid" && shortAlias.length > 0 && (
                <p className="text-[10px] font-bold text-rose-500">
                  ❌ Use only lowercase letters, numbers, hyphens, and underscores.
                </p>
              )}
              {slugStatus === "idle" && !hasShortLink && (
                <p className="text-[10px] text-slate-400 italic">
                  If left blank, a random unique slug will be automatically generated.
                </p>
              )}
              {slugStatus === "idle" && hasShortLink && (
                <p className="text-[10px] text-slate-400 italic">
                  Entering a new alias will update the shortlink slug.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/5 gap-3">
            {hasShortLink ? (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="rounded-2xl text-xs font-semibold px-4 py-2 flex items-center space-x-1.5 cursor-pointer"
                disabled={isSubmitting || isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                <span>{isDeleting ? "Deleting..." : "Delete Shortlink"}</span>
              </Button>
            ) : (
              <div /> // Spacer
            )}

            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="rounded-2xl text-xs font-semibold px-4 py-2"
                disabled={isSubmitting || isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-2xl text-xs font-semibold px-5 py-2 bg-primary-color hover:bg-primary-color/90 text-white flex items-center space-x-1.5"
                disabled={isSubmitting || isDeleting || (shortAlias !== "" && slugStatus !== "available")}
              >
                {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>
                  {hasShortLink 
                    ? (isSubmitting ? "Updating..." : "Update Shortlink")
                    : (isSubmitting ? "Generating..." : "Generate Link")}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
