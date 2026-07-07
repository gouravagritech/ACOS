'use client'

import React from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import { Search, Bell, Sparkles, User, LogOut, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface AppHeaderProps {
  onSearchClick: () => void
  onAIClick: () => void
  onNotificationClick: () => void
}

export function AppHeader({ onSearchClick, onAIClick, onNotificationClick }: AppHeaderProps) {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // Simple breadcrumb generator
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = paths.map((path, idx) => {
    const href = '/' + paths.slice(0, idx + 1).join('/')
    const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    return { name, href }
  })

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-6 z-20">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-display font-medium text-foreground/80">ACOS</span>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <span className="text-muted-foreground/50">/</span>
            <span className={idx === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""}>
              {crumb.name}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right: Actions Menu */}
      <div className="flex items-center gap-4">
        {/* Search Input trigger */}
        <button 
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 w-64 px-3 py-1.5 rounded-lg border border-input bg-muted/50 text-muted-foreground hover:bg-muted text-sm transition-colors"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">Search everything...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">âŒ˜</span>K
          </kbd>
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={onNotificationClick}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-background" />
        </button>

        {/* AI Assistant Toggle */}
        <button 
          onClick={onAIClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-ocean shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>

        {/* User Profile dropdown */}
        <div className="flex items-center gap-2 border-l border-border pl-4">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold font-display text-sm border border-primary-200">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <button 
            onClick={signOut}
            className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
