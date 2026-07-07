'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Sparkles, FileText, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ProposalsPage() {
  const [template, setTemplate] = useState('dairy')
  const [draft, setDraft] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let doc = ''
      if (template === 'dairy') {
        doc = `# Technical Stabilization Proposal: Dairy Ice Cream Viscosity\n\n**Prepared for:** Mother Dairy Fruit & Veg\n**Biopolymer Solution:** AquaCol K-100 (Kappa Carrageenan)\n\n## 1. Technical Formulation Specs\nRecommended inclusion rate: **0.03%** based on total mix weight. Prevents serum separation (syneresis) during storage cycles. Meets standard FSSAI stabilizers guidelines.`
      } else {
        doc = `# Technical Clarification Proposal: Brewery Fining & Beer Clarifier\n\n**Prepared for:** United Breweries Group\n**Clarifier Solution:** AquaClear Beer Clarifier\n\n## 1. Process Optimization\nAdd AquaClear during wort boiling at 0.01% concentrations. Rapidly binds cloud-forming yeast cells, speeding secondary conditioning by **3 days**.`
      }
      setDraft(doc)
      setIsGenerating(false)
      toast.success('Proposal drafted by AI Copilot!')
    }, 1200)
  }

  const handleSend = () => {
    toast.success('Proposal finalized and saved to customer DMS documents!')
    setDraft('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Technical & Commercial Proposal Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Auto-compile customer specifications and R&D formulation data into branded application proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <FileText className="h-4.5 w-4.5 text-primary-600" />
              <span>Configure Proposal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Application template</label>
              <select 
                value={template} 
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm outline-none focus:border-primary-500"
              >
                <option value="dairy">Dairy Stabilizers (Ice Cream/Milk)</option>
                <option value="brewery">Brewery Fining (Beer Clarifiers)</option>
              </select>
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full mt-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Drafting...' : 'Run AI Proposal Builder'}</span>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[350px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Draft Preview worksheet</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {draft ? (
                <div className="space-y-4 flex-1">
                  <textarea 
                    value={draft} 
                    onChange={(e) => setDraft(e.target.value)}
                    className="w-full h-80 bg-slate-50 border border-input rounded-xl p-4 text-sm font-mono text-slate-800 outline-none focus:border-primary-500 focus:bg-background transition-colors resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleSend} className="flex items-center gap-2 text-xs">
                      <Send className="h-4 w-4" />
                      <span>Finalize Proposal</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">Draft empty</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Select a proposal category and trigger the generation parameters.
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
