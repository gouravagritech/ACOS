'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart3, Target, MapPin } from 'lucide-react'

export default function DistributorPortalPage() {
  const [targetMetrics] = useState({
    territory: 'Western India (Gujarat / Maharashtra)',
    quota: '₹ 15,000,000',
    achieved: '₹ 11,200,000',
    percentage: 74.6
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Distributor Command Console</h1>
        <p className="text-sm text-muted-foreground mt-1">Review assigned sales quotas, territory performance indicators, and lead tracking lists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Territory</span>
          <span className="text-sm font-semibold text-slate-800 mt-2 flex items-center gap-1.5 font-display">
            <MapPin className="h-4.5 w-4.5 text-primary-600" />
            {targetMetrics.territory}
          </span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Sales Quota Target</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">{targetMetrics.quota}</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Target Achievement Rate</span>
          <span className="text-2xl font-bold text-accent-600 font-display mt-2">{targetMetrics.percentage}%</span>
        </Card>
      </div>
    </div>
  )
}
