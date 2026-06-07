import { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"

export const metadata: Metadata = {
  title: "Get Started | Biolynq",
  description:
    "Join Biolynq to create your high-converting bio link, customize your landing page, and track analytics in real-time.",
}

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface dark:bg-slate-950 text-on-surface dark:text-white transition-colors duration-300 overflow-hidden hero-gradient">
      
      {/* Visual background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-color/5 dark:bg-primary-color/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary-color/5 dark:bg-secondary-color/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 px-8 py-6 w-full flex justify-between items-center max-w-container-max mx-auto">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tight text-primary-color dark:text-inverse-primary select-none flex items-center"
        >
          Biolynq
          <span className="text-secondary-color dark:text-secondary-fixed-dim text-3xl leading-none ml-0.5">
            .
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          Back to Home
        </Link>
      </header>

      {/* Main Form Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-8">
        <h1 className="sr-only">Get Started on Biolynq</h1>
        <AuthCard />
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 px-8 border-t border-slate-100 dark:border-slate-900/50 w-full max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Biolynq. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
            Support
          </a>
        </div>
      </footer>
    </div>
  )
}