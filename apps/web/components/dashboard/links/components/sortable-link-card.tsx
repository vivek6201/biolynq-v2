"use client"

import React, { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import {
  GripVertical,
  TrendingUp,
  Image as ImageIcon,
  Pencil,
  Trash2,
} from "lucide-react"
import { LinkResponse } from "@workspace/utils/types/links"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

interface SortableLinkCardProps {
  link: LinkResponse
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  commitReorder: () => void
  handleToggleActive: (link: LinkResponse) => void
  handleDeleteLink: (linkId: string) => void
  setActiveEditLink: (link: LinkResponse | null) => void
  setIsEditorOpen: (isOpen: boolean) => void
  getMockClicks: (id: string) => string
}

interface DragItem {
  index: number
  id: string
  type: string
}

export function SortableLinkCard({
  link,
  index,
  moveCard,
  commitReorder,
  handleToggleActive,
  handleDeleteLink,
  setActiveEditLink,
  setIsEditorOpen,
  getMockClicks,
}: SortableLinkCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isPending = link.id.startsWith("temp_")

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
    accept: "LINK_CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "LINK_CARD",
    item: () => ({ id: link.id, index }),
    end: () => {
      commitReorder()
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const dragRef = useRef<HTMLDivElement>(null)

  // Attach drop to outer div, drag to the grip handle
  drag(dragRef)
  drop(ref)

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start bg-white dark:bg-slate-900 border transition-all duration-200 rounded-3xl p-5 shadow-xs hover:shadow-md",
        link.is_active
          ? "border-slate-200/60 dark:border-white/5"
          : "border-slate-100 dark:border-white/2 opacity-75",
        isPending && "ring-1 ring-amber-300/60 dark:ring-amber-700/40",
        isDragging && "opacity-45 scale-[0.98] border-dashed border-primary-color dark:border-secondary-fixed-dim"
      )}
    >
      {/* Drag Handle */}
      <div
        ref={dragRef}
        className="mt-2 text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing mr-4 p-1 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg"
      >
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
              className={cn(
                "relative w-10 h-5.5 rounded-full transition-colors focus:outline-hidden",
                link.is_active ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full transition-transform",
                  link.is_active ? "translate-x-4.5" : "translate-x-0"
                )}
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
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setActiveEditLink(link)
                setIsEditorOpen(true)
              }}
              className="p-1.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleDeleteLink(link.id)}
              className="p-1.5 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
