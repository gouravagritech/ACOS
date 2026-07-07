'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BookOpen, HelpCircle, FileText, Sliders } from 'lucide-react'

interface ApplicationSegment {
  title: string
  category: string
  stabilizerSystem: string
  criticalCCP: string
  specs: string
}

export default function ApplicationsPage() {
  const [segments] = useState<ApplicationSegment[]>([
    { title: 'Dairy - Ice Cream Stabilization', category: 'Dairy', stabilizerSystem: 'Kappa/Iota Carrageenan + Locust Bean Gum', criticalCCP: 'Pasteurization temperature (min 75Â°C) to ensure biopolymer hydration.', specs: 'Prevents whey separation (syneresis) and ice crystal growth during thaw cycles.' },
    { title: 'Confectionery - Vegan Gummy Jelly', category: 'Confectionery', stabilizerSystem: 'Kappa + Iota blend', criticalCCP: 'Deposit pH must remain above 4.0 to prevent acid hydrolysis of gel network.', specs: 'Produces firm, elastic texture with rapid setting profile below 40Â°C.' },
    { title: 'Brewing - Wort Fining & Clarifier', category: 'Beverages', stabilizerSystem: 'Semi-refined Kappa Carrageenan', criticalCCP: 'Add 10 mins pre-boil end to maximize protein-carrageenan flocking.', specs: 'Precipitates haze-forming proteins, improving clarity and reducing conditioning.' }
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Application Engineering Matrix</h1>
        <p className="text-sm text-muted-foreground mt-1">Review standard hydrocolloid stabilization systems, critical control points, and troubleshooting guidelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {segments.map((seg, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow border-border">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-800 font-display">{seg.title}</CardTitle>
                <CardDescription className="text-xs">{seg.category}</CardDescription>
              </div>
              <Badge variant="default" className="text-[10px]">{seg.category}</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-primary-600" />
                  Recommended Stabilizer System
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">{seg.stabilizerSystem}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-coral-600" />
                  Critical Processing parameters (CCP)
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">{seg.criticalCCP}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-accent-600" />
                  Gelling & Quality specs
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">{seg.specs}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
