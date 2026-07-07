'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart3, Target, Calendar } from 'lucide-react'

export default function BIAnalyticsPage() {
  const okrs = [
    { objective: 'Expand domestic dairy stabilizer sales', progress: 92, status: 'on_track' },
    { objective: 'Optimize seaweed extraction yield past 75%', progress: 68, status: 'at_risk' },
    { objective: 'Onboard 10 key accounts for vegan jelly gelling', progress: 85, status: 'on_track' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Business Intelligence & OKRs</h1>
        <p className="text-sm text-muted-foreground mt-1">Cascaded corporate objective key results, financial trends charts, and departmental achievements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OKR Cascade */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Corporate OKR Cascade</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {okrs.map((okr, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-700">{okr.objective}</span>
                  <Badge variant={okr.status === 'on_track' ? 'success' : 'destructive'}>
                    {okr.progress}%
                  </Badge>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${okr.status === 'on_track' ? 'bg-accent-500' : 'bg-coral-500'}`} 
                    style={{ width: `${okr.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sales funnel attribution */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Financial Contribution margins</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Gross Margin (YTD)</span>
              <span className="font-bold text-slate-800">42.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Contribution Margin (Kappa Carrageenan)</span>
              <span className="font-bold text-slate-800">31.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Contribution Margin (Iota Carrageenan)</span>
              <span className="font-bold text-slate-800">28.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
