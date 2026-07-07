'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function TechnicalSalesPage() {
  const [problem, setProblem] = useState('Viscosity separation in milk beverage stabilizer. Heat stability needed up to 120C.')
  const [isGenerating, setIsGenerating] = useState(false)
  const [recom, setRecom] = useState<any | null>(null)

  const handleRecommend = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setRecom({
        grade: 'AquaCol K-100 (Kappa Carrageenan)',
        dosage: '0.02% - 0.03%',
        rationale: 'Kappa Carrageenan provides strong gel synergy with milk casein proteins. Re-forms gel structures post-UHT treatments (120Â°C). Matches viscosity requirements.',
        compMatches: 'Equivalent to FMC Gelcarin GP-379.'
      })
      setIsGenerating(false)
      toast.success('AI Technical recommendations compiled!')
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Technical Sales Workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Perform technical problem discovery, get AI-backed product recommendations, and resolve client ingredient processing issues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <BrainCircuit className="h-4.5 w-4.5 text-primary-600" />
              <span>Technical Discovery</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Customer processing problem</label>
              <textarea 
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full h-32 bg-background border border-input rounded-lg p-3 text-sm outline-none focus:border-primary-500 font-sans resize-none"
              />
            </div>
            <Button onClick={handleRecommend} disabled={isGenerating} className="w-full mt-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Analyzing...' : 'Run Technical Recommendation'}</span>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[300px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">AI Recommendation Output</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {recom ? (
                <div className="space-y-4 flex-1 text-sm">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">Recommended Grade</span>
                    <span className="text-base font-bold text-slate-800 block mt-1">{recom.grade}</span>
                  </div>
                  <div>
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">Recommended Dosage</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">{recom.dosage}</span>
                  </div>
                  <div>
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">Technical Rationale</span>
                    <p className="text-slate-600 mt-1 leading-relaxed">{recom.rationale}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary-50/20 border border-primary-100 text-xs text-primary-950 flex gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary-600 shrink-0" />
                    <span>**Competitor Match:** {recom.compMatches}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <BrainCircuit className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">No recommendation compiled</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Detail the customer\'s food stabilization issues and click recommend to generate answers.
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
