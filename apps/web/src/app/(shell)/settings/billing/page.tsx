'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CreditCard, ShieldCheck } from 'lucide-react'

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Billing & Subscriptions</h1>
        <p className="text-sm text-muted-foreground mt-1">Review active corporate licenses, database usage statistics, and subscription details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Active Plan</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">Enterprise Plan</span>
        </Card>
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Active Licenses</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">42 users</span>
        </Card>
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">License Status</span>
          <span className="text-sm font-semibold text-accent-600 mt-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5" />
            Active (Auto-renew)
          </span>
        </Card>
      </div>
    </div>
  )
}
