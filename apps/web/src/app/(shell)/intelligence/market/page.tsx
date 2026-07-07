'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Map, Ship } from 'lucide-react'

export default function MarketIntelPage() {
  const globalRates = [
    { country: 'Indonesia (Bali crop)', price: '$1.45 / kg', volume: '12,500 Tons/yr', change: '-2.1%' },
    { country: 'Philippines (Zamboanga crop)', price: '$1.52 / kg', volume: '8,400 Tons/yr', change: '+1.4%' },
    { country: 'Tanzania (Zanzibar crop)', price: '$1.38 / kg', volume: '3,200 Tons/yr', change: '+0.5%' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Global Seaweed Market Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor dry seaweed global pricing indexes, export volumes, and crop yield forecasts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {globalRates.map((r, idx) => (
          <Card key={idx} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-border p-4 flex flex-row justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">{r.country}</span>
              <Badge variant="outline" className="text-[10px]">{r.change}</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Index Price:</span>
                <span className="font-semibold text-slate-800">{r.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Volume:</span>
                <span className="font-semibold text-slate-800">{r.volume}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
