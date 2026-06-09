import { LinkResponse } from "@workspace/utils/types/links"
import { createLink, updateLink, deleteLink } from "@workspace/utils/api/links"

// ─── Change types ─────────────────────────────────────────────────────────────

export type CreateChange = {
  kind: "create"
  /** Temporary client-only ID assigned before the server returns a real one */
  tempId: string
  data: Omit<LinkResponse, "id">
}

export type UpdateChange = {
  kind: "update"
  id: string
  data: Partial<LinkResponse>
}

export type DeleteChange = {
  kind: "delete"
  id: string
}

export type LinkChange = CreateChange | UpdateChange | DeleteChange

// ─── Change-log reducer ───────────────────────────────────────────────────────
//
// Pure function — no React dependencies, fully unit-testable.
//
// Rules:
//   delete on tempId → cancels the pending create (nothing hits the server)
//   delete on real ID → strips any pending update, appends delete (once)
//   update           → merged into any existing update or create for the same ID
//   create           → always appended (tempIds are unique per call)

export type ChangeLogAction = { kind: "enqueue"; change: LinkChange } | { kind: "clear" }

export function changeLogReducer(log: LinkChange[], action: ChangeLogAction): LinkChange[] {
  if (action.kind === "clear") return []

  const { change } = action

  switch (change.kind) {
    case "delete": {
      // Temp link: cancel the create and any updates — no server call needed
      const isTempCreate = log.some(
        (c) => c.kind === "create" && c.tempId === change.id
      )
      if (isTempCreate) {
        return log.filter(
          (c) =>
            !(c.kind === "create" && c.tempId === change.id) &&
            !(c.kind === "update" && c.id === change.id)
        )
      }
      // Real link: idempotent delete (ignore if already queued)
      if (log.some((c) => c.kind === "delete" && c.id === change.id)) return log
      return [
        ...log.filter((c) => !(c.kind === "update" && c.id === change.id)),
        change,
      ]
    }

    case "update": {
      // Merge into an existing update for the same real ID
      const updateIdx = log.findIndex(
        (c) => c.kind === "update" && c.id === change.id
      )
      if (updateIdx !== -1) {
        const next = log.slice()
        next[updateIdx] = {
          kind: "update",
          id: change.id,
          data: { ...(log[updateIdx] as UpdateChange).data, ...change.data },
        }
        return next
      }
      // Merge into a pending create for the same temp ID
      const createIdx = log.findIndex(
        (c) => c.kind === "create" && c.tempId === change.id
      )
      if (createIdx !== -1) {
        const next = log.slice()
        next[createIdx] = {
          kind: "create",
          tempId: change.id,
          data: {
            ...(log[createIdx] as CreateChange).data,
            ...change.data,
          } as Omit<LinkResponse, "id">,
        }
        return next
      }
      return [...log, change]
    }

    case "create":
      return [...log, change]
  }
}

// ─── Executor ─────────────────────────────────────────────────────────────────
//
// Runs a single queued change against the API.
// Returns the real server ID for creates (so callers can replace the temp ID).

export async function executeChange(
  change: LinkChange
): Promise<{ kind: "created"; tempId: string; realId: string } | null> {
  switch (change.kind) {
    case "create": {
      const res = await createLink(change.data)
      if (!res.success || !res.data) {
        throw new Error(res.message ?? "Failed to create link")
      }
      return { kind: "created", tempId: change.tempId, realId: res.data.id }
    }
    case "update": {
      const res = await updateLink(change.id, change.data)
      if (!res.success) throw new Error(res.message ?? `Failed to update link "${change.id}"`)
      return null
    }
    case "delete": {
      const res = await deleteLink(change.id)
      if (!res.success) throw new Error(res.message ?? `Failed to delete link "${change.id}"`)
      return null
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function makeTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function nextPosition(links: LinkResponse[]): number {
  return links.reduce((max, l) => Math.max(max, l.position), 0) + 1
}

export function buildNewLink(
  data: Partial<LinkResponse>,
  position: number,
  tempId: string
): LinkResponse {
  return {
    id: tempId,
    title: data.title ?? "",
    url: data.url ?? "",
    description: data.description ?? "",
    icon_url: data.icon_url ?? "",
    position,
    is_active: data.is_active ?? true,
    is_social: data.is_social ?? false,
  }
}
