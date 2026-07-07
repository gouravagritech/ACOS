'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Mail, Sparkles, Send, Users } from 'lucide-react'
import { toast } from 'sonner'

export default function EmailNewsletterPage() {
  const [subscribers, setSubscribers] = useState(1420)
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState('')

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setDraft(`Dear Hydrocolloid Specialist,\n\nIn this issue, we highlight recent quality trials at the Aqua Colloids Bangalore testing lab. Our Kappa carrageenan AquaCol K-100 achieved a 940 g/cmÂ² gel strength, delivering excellent syneresis control for processed cheese. Read the technical spec breakdown inside!`)
      setIsGenerating(false)
      toast.success('Newsletter issue drafted by AI Copilot!')
    }, 1200)
  }

  const handleSend = () => {
    toast.success(`Newsletter successfully dispatched to ${subscribers} subscribers!`)
    setDraft('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Newsletter Studio</h1>
          <p className="text-sm text-muted-foreground mt-1">Design, edit, and dispatch weekly biopolymer technical updates to food industry subscribers.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-border px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
          <Users className="h-4 w-4 text-primary-600" />
          <span>{subscribers} Subscribers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Mail className="h-4.5 w-4.5 text-primary-600" />
              <span>Issue Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Compiling...' : 'Auto-Generate Issue'}</span>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[350px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Issue Draft Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {draft ? (
                <div className="space-y-4 flex-1">
                  <textarea 
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="w-full h-64 bg-slate-50 border border-input rounded-xl p-4 text-sm font-sans text-slate-800 outline-none focus:border-primary-500 focus:bg-background transition-colors resize-none"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSend} className="flex items-center gap-2 text-xs">
                      <Send className="h-4 w-4" />
                      <span>Send to Subscribers</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Mail className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">Draft empty</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Click the auto-generate button to compile recent lab successes and product logs into a subscriber newsletter template.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
