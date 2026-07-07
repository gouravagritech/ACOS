'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Target, AlertTriangle } from 'lucide-react'

export default function CompetitiveIntelPage() {
  const competitorSWOT = [
    { competitor: 'CP Kelco (Genulacta range)', priceComparison: 'Kelco price: ₹ 420/kg vs AquaCol: ₹ 320/kg', strength: 'Strong global brand distribution channels.', weakness: 'Premium pricing barriers in developing markets like India.' },
    { competitor: 'Cargill (Satiagel range)', priceComparison: 'Cargill price: ₹ 380/kg vs AquaCol: ₹ 320/kg', strength: 'Broad portfolio stabilizers blends.', weakness: 'Slow custom R&D response times for domestic processors.' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Competitive Positioning & SWOT Matrix</h1>
        <p className="text-sm text-muted-foreground mt-1">Audit competitor carrageenan grades, compare pricing structures, and formulate value propositions.</p>
      </div>

      <div className="space-y-4">
        {competitorSWOT.map((comp, idx) => (
          <Card key={idx} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Target className="h-4.5 w-4.5 text-primary-600" />
                <span className="text-xs font-semibold text-slate-700">{comp.competitor}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] font-mono">
                {comp.priceComparison}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="font-semibold text-slate-700 block">Competitor Strength</span>
                  <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                    {comp.strength}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block">Competitor Weakness / AquaCol Entry Opportunity</span>
                  <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                    {comp.weakness}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
