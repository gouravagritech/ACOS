'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database, Key, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function DeveloperPortalPage() {
  const [apiKey, setApiKey] = useState('')

  const handleGenerate = () => {
    setApiKey(`acos_pk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`)
    toast.success('Developer API Key generated successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Developer API & Webhooks Console</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure OAuth keys and secure webhook integrations to sync ACOS data to external ERP systems.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Key className="h-4.5 w-4.5 text-primary-600" />
              <span>API Credentials</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <Button onClick={handleGenerate} className="w-full">Generate Sandbox API Key</Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[250px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Credentials Workspace</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {apiKey ? (
                <div className="space-y-4 flex-1 text-xs">
                  <div>
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">API Secret Key</span>
                    <span className="font-mono text-slate-800 bg-slate-50 border border-slate-100 p-3 rounded-lg block mt-1 select-all">
                      {apiKey}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-accent-50/20 border border-accent-100 text-accent-950 flex gap-2">
                    <Check className="h-4.5 w-4.5 text-accent-600 shrink-0" />
                    <span>Copy this key and authorization token. It will not be displayed again.</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Database className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">No active keys generated</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    API integration keys are scoped using RBAC security rules. Click generate to configure.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
