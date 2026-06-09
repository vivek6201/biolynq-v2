import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { cache } from "react"
import { getPublicProfile } from "@workspace/utils/api/users"
import { PublicProfileContent } from "@/components/public/public-profile-content"

// Memoize public profile requests at the request level to avoid double-fetching/double-tracking
const getPublicProfileCached = cache(getPublicProfile)

interface PageProps {
  params: Promise<{
    username: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  try {
    const res = await getPublicProfileCached(username)
    if (res.success && res.data) {
      const profile = res.data
      return {
        title: `${profile.display_name || profile.username} (@${profile.username}) | Biolynq`,
        description:
          profile.bio ||
          `Check out ${
            profile.display_name || profile.username
          }'s links and social networks on Biolynq.`,
      }
    }
  } catch {}
  return {
    title: "User Profile | Biolynq",
    description: "Check out this user's links and social networks on Biolynq.",
  }
}

export default async function Page({ params }: PageProps) {
  const { username } = await params

  try {
    const res = await getPublicProfileCached(username)
    if (!res.success || !res.data) {
      notFound()
    }
    return <PublicProfileContent profile={res.data} />
  } catch {
    notFound()
  }
}
