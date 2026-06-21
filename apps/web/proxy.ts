import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = ["/dashboard"]
const AUTH_ROUTES = ["/get-started"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionId = request.cookies.get("session_id")?.value

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (isProtected) {
    if (!sessionId) {
      const loginUrl = new URL("/get-started", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify session with the backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
    try {
      const response = await fetch(`${apiUrl}/users/`, {
        method: "GET",
        headers: {
          Cookie: `session_id=${sessionId}`,
        },
      })

      if (!response.ok) {
        // Clear invalid session cookie and redirect to login
        const loginUrl = new URL("/get-started", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        const res = NextResponse.redirect(loginUrl)
        res.cookies.delete("session_id")
        return res
      }
    } catch (e) {
      console.error("Middleware session verification failed:", e)
      // Allow request to continue in case of network issue, client-side fetch session will retry
    }
  }

  if (isAuthRoute && sessionId) {
    // Verify session is valid before redirecting from auth page
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
    try {
      const response = await fetch(`${apiUrl}/users/`, {
        method: "GET",
        headers: {
          Cookie: `session_id=${sessionId}`,
        },
      })

      if (response.ok) {
        const hasOAuthParams = request.nextUrl.searchParams.has("session_id")
        if (!hasOAuthParams) {
          return NextResponse.redirect(new URL("/dashboard/links", request.url))
        }
      } else {
        // Cookie is invalid/expired, delete it and allow user to view login page
        const res = NextResponse.next()
        res.cookies.delete("session_id")
        return res
      }
    } catch (e) {
      console.error("Middleware auth verification failed:", e)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/get-started",
  ],
}
