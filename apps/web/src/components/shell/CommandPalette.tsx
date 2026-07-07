'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Database, FileText, UserPlus, Calendar, Plus, Command } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (isOpen) onClose()
        else onClose() // Toggle handled by parent
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = [
    { name: 'ICP Builder', icon: Target, category: 'Navigation', action: () => router.push('/gtm/icp') },
    { name: 'Lead Inbox', icon: Bell, category: 'Navigation', action: () => router.push('/leads/inbox') },
    { name: 'Create New Lead', icon: UserPlus, category: 'Quick Action', action: () => alert('Create Lead Triggered') },
    { name: 'Schedule Meeting', icon: Calendar, category: 'Quick Action', action: () => alert('Schedule Meeting Triggered') },
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
        {/* Overlay backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal wrapper */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-glass-lg"
        >
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <input 
              autoFocus
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder-muted-foreground"
            />
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {items.length > 0 ? (
              items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action()
                    onClose()
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-2xs bg-muted px-1.5 py-0.5 rounded border text-muted-foreground/80">{item.category}</span>
                </button>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">No matches found.</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
import { Target, Bell } from 'lucide-react'
