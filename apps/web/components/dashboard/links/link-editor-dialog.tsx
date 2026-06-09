"use client"

import React, { useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { LinkResponse } from "@workspace/utils/types/links"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { linkValidation, LinkValidation } from "@workspace/utils/validations/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"

interface LinkEditorDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<LinkResponse>) => Promise<void>
  link?: LinkResponse | null // If present, editing; otherwise creating
}

export function LinkEditorDialog({ isOpen, onClose, onSave, link }: LinkEditorDialogProps) {
  const form = useForm<LinkValidation>({
    resolver: zodResolver(linkValidation as any),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      is_social: false,
      is_active: true,
      position: 0,
      icon_url: ""
    }
  })

  // Reset form fields on load or when link changes
  useEffect(() => {
    if (isOpen) {
      if (link) {
        form.reset({
          title: link.title || "",
          url: link.url || "",
          description: link.description || "",
          is_social: link.is_social ?? false,
          is_active: link.is_active ?? true,
          position: link.position ?? 0,
          icon_url: link.icon_url || ""
        })
      } else {
        form.reset({
          title: "",
          url: "",
          description: "",
          is_social: false,
          is_active: true,
          position: 0,
          icon_url: ""
        })
      }
    }
  }, [link, isOpen, form])

  if (!isOpen) return null

  const handleSubmit = async (values: LinkValidation) => {
    // Automatically append https:// if missing to pass Zod URL validation
    let formattedUrl = values.url.trim()
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl
    }

    try {
      await onSave({
        ...values,
        url: formattedUrl,
      })
      onClose()
    } catch (err: any) {
      form.setError("root", {
        type: "manual",
        message: err?.message || "Failed to save link configuration"
      })
    }
  }

  const { isSubmitting, errors } = form.formState
  const rootError = errors.root?.message

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* Backdrop overlay tap-to-close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 p-6 rounded-3xl shadow-2xl z-10 animate-in zoom-in-95 duration-200 flex flex-col space-y-4">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display">
            {link ? "Edit Link Configuration" : "Add New Bio Link"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Root Form Error Notification */}
        {rootError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl text-xs font-semibold leading-normal">
            {rootError}
          </div>
        )}

        {/* Form Container */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Link Title
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. Portfolio Website"
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-semibold focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Target URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Target URL
                  </FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. https://mywebsite.com"
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-semibold focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Add details or subtitles..."
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/40 text-xs font-semibold focus:outline-hidden focus:border-primary-color dark:focus:border-secondary-fixed-dim h-20 resize-none"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Options Toggles */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              {/* Is Social */}
              <FormField
                control={form.control}
                name="is_social"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 cursor-pointer select-none space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded-lg border-slate-300 text-primary-color focus:ring-primary-color dark:border-white/10"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormLabel className="text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                      Social Icon
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Is Active */}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 cursor-pointer select-none space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded-lg border-slate-300 text-primary-color focus:ring-primary-color dark:border-white/10"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormLabel className="text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                      Visible
                    </FormLabel>
                  </FormItem>
                )}
              />

            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/5">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="rounded-2xl text-xs font-semibold px-4 py-2"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-2xl text-xs font-semibold px-5 py-2 bg-primary-color hover:bg-primary-color/90 text-white flex items-center space-x-1.5"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>{isSubmitting ? "Saving..." : "Save Link"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
