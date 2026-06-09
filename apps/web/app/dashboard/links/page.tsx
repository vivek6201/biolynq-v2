import React from "react"
import { getProfile } from "@workspace/utils/api/users"
import { getAllLinks } from "@workspace/utils/api/links"
import { LinksDashboardContainer } from "@/components/dashboard/links/links-container"
import { AlertCircle } from "lucide-react"

export const metadata = {
  title: "Link Management | Biolynq",
  description: "Organize and optimize your bio profile links.",
}

export default async function LinksPage() {
  try {
    const [profileRes, linksRes] = await Promise.all([
      getProfile(),
      getAllLinks(),
    ])

    if (!profileRes.success) {
      throw new Error(profileRes.message || "Failed to retrieve user profile details.")
    }

    if (!linksRes.success) {
      throw new Error(linksRes.message || "Failed to retrieve link configurations.")
    }

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <LinksDashboardContainer
          initialProfile={profileRes.data || null}
          initialLinks={linksRes.data || []}
        />
      </div>
    )
  } catch (error: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="p-4 rounded-full bg-red-50 dark:bg-red-950/40 text-red-500">
          <AlertCircle className="h-10 w-10 animate-bounce" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-md font-bold text-slate-800 dark:text-slate-200 font-display">
            Failed to Load Link Dashboard
          </h2>
          <p className="text-xs text-slate-400 max-w-sm">
            {error?.message || "An unexpected error occurred while fetching links from the server."}
          </p>
        </div>
      </div>
    )
  }
}
