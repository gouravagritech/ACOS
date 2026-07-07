'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, User, Brain } from 'lucide-react'

interface AIAssistantPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistantPanel({ isOpen, onClose }: AIAssistantPanelProps) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Hello! I am your ACOS Assistant. How can I help you with formulations, leads, or analytics today?' }
  ])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInput('')

    // Mock response trigger
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `Got your request about "${userMsg}". Querying the Aqua Colloids Knowledge Graph...` 
      }])
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-y-0 right-0 z-50 flex pl-10">
        {/* Overlay backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30"
        />

        {/* Panel panel */}
        <motion.div 
          initial={{ translateX: '100%' }}
          animate={{ translateX: 0 }}
          exit={{ translateX: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-screen max-w-md bg-card border-l border-border shadow-glass-lg flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center shadow-ocean">
                <Brain className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="font-semibold text-foreground font-display text-sm">ACOS Copilot</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0 border border-accent-200">
                    <Sparkles className="h-4 w-4 text-accent-700" />
                  </div>
                )}
                <div className={`p-3 rounded-xl text-sm max-w-[80%] ${
                  msg.sender === 'user' 
                    ? 'bg-primary-600 text-white rounded-tr-none shadow-ocean' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input field */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-card text-sm text-foreground outline-none focus:border-primary-500"
              />
              <button 
                onClick={handleSend}
                className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-ocean"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
