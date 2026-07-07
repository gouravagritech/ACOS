'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ShieldCheck, BarChart3 } from 'lucide-react'

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">AI Governance & Cost Audit</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor API keys usage, verify prompt template versions, and review model token cost metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">MTD Token Expenditure</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">$24.50</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Total API Calls</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">12,450 requests</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">PII Compliance rate</span>
          <span className="text-sm font-semibold text-accent-600 mt-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5" />
            100% Secure (Masked)
          </span>
        </Card>
      </div>
    </div>
  )
}
