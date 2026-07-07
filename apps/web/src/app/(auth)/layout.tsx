import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Sign In',
    template: '%s | ACOS',
  },
  description: 'Sign in to the Aqua Colloids Operating System.',
  robots: { index: false, follow: false },
}

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Auth Layout
 *
 * Renders unauthenticated pages (login, register, forgot-password, etc.)
 * with a centred, full-screen background — no sidebar or shell chrome.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800">
      {/* Background decorative blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-ocean-500/20 blur-3xl" />
        <div className="absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-seaweed-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-ocean-400/10 blur-3xl" />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full max-w-md px-4 py-12">
        {/* Logo / Brand mark */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-500 shadow-ocean">
            {/* Placeholder for Aqua Colloids logo mark */}
            <span className="text-xl font-bold text-white font-display">AC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-display">Aqua Colloids</h1>
            <p className="text-xs text-ocean-300 font-medium tracking-widest uppercase mt-0.5">
              Operating System
            </p>
          </div>
        </div>

        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 text-center">
        <p className="text-xs text-ocean-400/70">
          © {new Date().getFullYear()} Aquagri Processing Pvt Ltd. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
