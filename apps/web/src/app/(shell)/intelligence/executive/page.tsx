'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, TrendingUp, ShieldAlert, Award, FileDown } from 'lucide-react'
import { toast } from 'sonner'

export default function ExecutiveDashboard() {
  const [isCompiling, setIsCompiling] = useState(false)
  const [briefing, setBriefing] = useState('')

  const handleBriefing = () => {
    setIsCompiling(true)
    setTimeout(() => {
      setBriefing(`## Weekly Executive Briefing Summary\n\n**Revenue:** MTD revenue stands at **₹ 8.4M** (+12% ahead of targets).\n**Ops Yield:** Refinement average at **72.1%**; Extractor Alpha running at 84% OEE.\n**Procurement Risk:** Bali Seaweed crop inventory currently at 42 Tons (below 50T minimum threshold). Purchase order PO-2026-041 dispatched.`)
      setIsCompiling(false)
      toast.success('AI C-suite Briefing compiled successfully!')
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Executive Command Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Cross-department operations summary, EBITDA margins, and strategic briefings scheduler.</p>
        </div>
        <Button onClick={handleBriefing} disabled={isCompiling} className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>{isCompiling ? 'Compiling Briefing...' : 'Compile C-suite Briefing'}</span>
        </Button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">EBITDA Margin</span>
          <span className="text-2xl font-bold text-accent-600 font-display mt-2">24.5%</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">MTD Sales Revenue</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">₹ 8,450,000</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">OEE Efficiency</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">84.2%</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Corporate OKR Score</span>
          <span className="text-2xl font-bold text-primary-600 font-display mt-2">89%</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Briefing preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[250px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-primary-900">
                <Sparkles className="h-4.5 w-4.5 text-primary-600" />
                <span>AI Strategic Briefing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {briefing ? (
                <div className="space-y-4 flex-1">
                  <textarea 
                    value={briefing}
                    onChange={(e) => setBriefing(e.target.value)}
                    className="w-full h-48 bg-slate-50 border border-input rounded-xl p-4 text-xs font-mono text-slate-800 outline-none focus:border-primary-500 focus:bg-background transition-colors resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="flex items-center gap-1 text-2xs">
                      <FileDown className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">Briefing not generated</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Click compile at the top right to roll up metrics from sales, lab QC logs, and inventory levels.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Alerts panel */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Strategic Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <ShieldAlert className="h-4.5 w-4.5 text-coral-600" />
                  Seaweed Stock Level
                </span>
                <Badge variant="destructive">Below Min</Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Award className="h-4.5 w-4.5 text-accent-600" />
                  UHT Viscosity Spec Pass
                </span>
                <Badge variant="success">Completed</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
