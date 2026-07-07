'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Webhook, ShieldCheck } from 'lucide-react'

export default function SettingsIntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Integrations settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure Webhook listener hooks and security tokens for third-party ERP ingest adapters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Active Webhooks</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">4 hooks active</span>
        </Card>
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Ingest Health</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">100% Online</span>
        </Card>
        <Card className="p-5 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Security Scopes</span>
          <span className="text-sm font-semibold text-accent-600 mt-2 flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5" />
            OAuth Scoped
          </span>
        </Card>
      </div>
    </div>
  )
}
