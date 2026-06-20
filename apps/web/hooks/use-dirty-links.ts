"use client"

import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { LinkResponse } from "@workspace/utils/types/links"
import {
  changeLogReducer,
  executeChange,
  makeTempId,
  nextPosition,
  buildNewLink,
  type LinkChange,
} from "./use-dirty-links.logic"

export type { LinkChange } from "./use-dirty-links.logic"

export function useDirtyLinks(initialLinks: LinkResponse[]) {
  const [links, setLinks] = useState<LinkResponse[]>(initialLinks)
  const [savedLinks, setSavedLinks] = useState<LinkResponse[]>(initialLinks)
  const [changeLog, dispatch] = useReducer(changeLogReducer, [] as LinkChange[])
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const isDirty = changeLog.length > 0

  // Sync state if initial server props update
  useEffect(() => {
    setLinks(initialLinks)
    setSavedLinks(initialLinks)
  }, [initialLinks])

  // ── Warn before refresh / tab-close when there are unsaved changes ─────────
  useEffect(() => {
    if (!isDirty) return
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [isDirty])

  // ── Mutators — update UI immediately and queue the backend change ──────────

  const queueToggleActive = useCallback((link: LinkResponse) => {
    const is_active = !link.is_active
    setLinks((prev) => prev.map((l) => (l.id === link.id ? { ...l, is_active } : l)))
    dispatch({ kind: "enqueue", change: { kind: "update", id: link.id, data: { is_active } } })
  }, [])

  const queueUpdateLink = useCallback((existing: LinkResponse, data: Partial<LinkResponse>) => {
    setLinks((prev) => prev.map((l) => (l.id === existing.id ? { ...l, ...data } : l)))
    dispatch({ kind: "enqueue", change: { kind: "update", id: existing.id, data } })
  }, [])

  const queueCreateLink = useCallback((data: Partial<LinkResponse> & { shorten?: boolean; short_alias?: string }) => {
    const tempId = makeTempId()
    const pos = nextPosition(links)
    const newLink = buildNewLink(data, pos, tempId)
    dispatch({ kind: "enqueue", change: { kind: "create", tempId, data: { ...newLink, shorten: data.shorten, short_alias: data.short_alias } } })
    setLinks((prev) => [...prev, newLink])
  }, [links])

  /** Unified "save from dialog" — create or update depending on context */
  const queueSaveLink = useCallback(
    (data: Partial<LinkResponse> & { shorten?: boolean; short_alias?: string }, existingLink: LinkResponse | null) => {
      if (existingLink) queueUpdateLink(existingLink, data)
      else queueCreateLink(data)
    },
    [queueUpdateLink, queueCreateLink]
  )

  const queueDeleteLink = useCallback((linkId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== linkId))
    dispatch({ kind: "enqueue", change: { kind: "delete", id: linkId } })
  }, [])

  const moveLinkCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setLinks((prev) => {
      const sorted = [...prev].sort((a, b) => a.position - b.position)
      const [dragged] = sorted.splice(dragIndex, 1)
      if (dragged) {
        sorted.splice(hoverIndex, 0, dragged)
      }
      return sorted.map((l, idx) => ({ ...l, position: idx + 1 }))
    })
  }, [])

  const commitReorder = useCallback(() => {
    links.forEach((link) => {
      dispatch({
        kind: "enqueue",
        change: {
          kind: "update",
          id: link.id,
          data: { position: link.position },
        },
      })
    })
  }, [links])

  // ── Batch save ────────────────────────────────────────────────────────────

  const saveAll = useCallback(async (): Promise<boolean> => {
    if (!isDirty) return true
    setIsSaving(true)
    setSaveError(null)

    const results = await Promise.allSettled(changeLog.map(executeChange))

    const failures = results
      .filter((r): r is PromiseRejectedResult => r.status === "rejected")
      .map((r) => String(r.reason?.message ?? "Unknown error"))

    if (failures.length > 0) {
      setSaveError(`${failures.length} change(s) failed: ${failures[0]}`)
      setIsSaving(false)
      return false
    }

    // Replace temp IDs with real server links returned by creates
    const createdResults = results
      .filter((r): r is PromiseFulfilledResult<{ kind: "created"; tempId: string; realLink: LinkResponse } | null> =>
        r.status === "fulfilled" && r.value?.kind === "created"
      )
      .map((r) => r.value!)

    let updatedLinks = links
    if (createdResults.length > 0) {
      const lookup = new Map(createdResults.map((m) => [m.tempId, m.realLink]))
      updatedLinks = links.map((l) => (lookup.has(l.id) ? lookup.get(l.id)! : l))
      setLinks(updatedLinks)
    }

    setSavedLinks(updatedLinks)
    dispatch({ kind: "clear" })
    setIsSaving(false)
    return true
  }, [changeLog, isDirty, links])

  // ── Discard all pending changes ───────────────────────────────────────────

  const discardAll = useCallback(() => {
    setLinks(savedLinks)
    dispatch({ kind: "clear" })
    setSaveError(null)
  }, [savedLinks])

  // ── Derived sorted list (stable reference) ────────────────────────────────

  const sortedLinks = useMemo(
    () => [...links].sort((a, b) => a.position - b.position),
    [links]
  )

  const updateLinkLocally = useCallback((linkId: string, data: Partial<LinkResponse>) => {
    setLinks((prev) => prev.map((l) => (l.id === linkId ? { ...l, ...data } : l)))
    setSavedLinks((prev) => prev.map((l) => (l.id === linkId ? { ...l, ...data } : l)))
  }, [])

  return {
    links,
    sortedLinks,
    isDirty,
    isSaving,
    saveError,
    setSaveError,
    changeCount: changeLog.length,
    queueToggleActive,
    queueSaveLink,
    queueDeleteLink,
    moveLinkCard,
    commitReorder,
    saveAll,
    discardAll,
    updateLinkLocally,
  }
}
