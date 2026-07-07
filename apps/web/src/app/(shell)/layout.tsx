/**
 * Shell Layout
 *
 * Main application shell rendered for authenticated users.
 * Wraps all module pages with:
 *  - Collapsible sidebar navigation
 *  - Top header bar (search, notifications, user menu)
 *  - Command palette (⌘K)
 *  - AI assistant panel (slide-over)
 *
 * Authentication: This layout validates the Supabase session server-side.
 * Unauthenticated requests are redirected to /login.
 *
 * Implementation: see src/components/shell/* (to be built)
 */
'use client'

import React, { useState } from 'react'
import { AppSidebar } from '@/components/shell/AppSidebar'
import { AppHeader } from '@/components/shell/AppHeader'
import { CommandPalette } from '@/components/shell/CommandPalette'
import { AIAssistantPanel } from '@/components/shell/AIAssistantPanel'
import { AuthProvider } from '@/lib/hooks/useAuth'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <AppHeader 
            onSearchClick={() => setIsSearchOpen(true)}
            onAIClick={() => setIsAIOpen(true)}
            onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          />

          {/* Page body */}
          <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-slate-50/50 dark:bg-background/20">
            <div className="h-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Floating Modals */}
        <CommandPalette 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
        <AIAssistantPanel 
          isOpen={isAIOpen} 
          onClose={() => setIsAIOpen(false)} 
        />
      </div>
    </AuthProvider>
  )
}

