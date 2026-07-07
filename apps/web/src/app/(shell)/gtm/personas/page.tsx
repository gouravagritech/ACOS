'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Target, ShieldAlert, Award } from 'lucide-react'

export default function PersonasPage() {
  const personas = [
    {
      title: 'Dr. Vivek Nair',
      role: 'R&D Director - Food Scientist',
      quote: '"viscosity consistency is non-negotiable. If the carrageenan batch gel strength decays under heat sterilizations, the production batch fails."',
      pain: 'Viscosity separations, ingredient quality decay during transit, poor temperature stability.',
      value: 'AquaCol K-100 provides verified UHT heat stability mappings and clean label vegan ingredients.'
    },
    {
      title: 'Pooja Patel',
      role: 'Procurement Manager',
      quote: '"I need stable supply contracts. Seaweed crop fluctuations cannot lead to sudden cost increases or shipping delays."',
      pain: 'Supply shortages, cost fluctuations, lack of shipping tracking transparency.',
      value: 'Locked long-term pricing contracts, annual volume procurement schedules, and auto-dispatch tracking.'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">B2B Buyer Personas Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">Map corporate stakeholders pain points and value messages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((per, idx) => (
          <Card key={idx} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-base font-bold text-slate-800 font-display">{per.title}</CardTitle>
              <CardDescription className="text-xs">{per.role}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <p className="italic text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-lg leading-relaxed">
                {per.quote}
              </p>
              
              <div>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-coral-600" />
                  Key Pain Points
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">{per.pain}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-accent-600" />
                  ACOS Value Pitch
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed">{per.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
