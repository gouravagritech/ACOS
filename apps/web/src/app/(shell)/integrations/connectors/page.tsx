'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Share2, ToggleLeft, ToggleRight, Check } from 'lucide-react'
import { toast } from 'sonner'

interface Connector {
  id: string
  name: string
  category: string
  status: 'connected' | 'disconnected'
}

export default function ConnectorsPage() {
  const [connectors, setConnectors] = useState<Connector[]>([
    { id: 'con-1', name: 'SAP ERP (Material Management)', category: 'ERP Sync', status: 'connected' },
    { id: 'con-2', name: 'Zoho CRM Sync Adapter', category: 'CRM Integration', status: 'connected' },
    { id: 'con-3', name: 'Tally Accounting Bridge', category: 'Financial Accounting', status: 'disconnected' }
  ])

  const handleToggle = (id: string, current: string) => {
    setConnectors(prev => prev.map(c => c.id === id ? { ...c, status: current === 'connected' ? 'disconnected' : 'connected' } : c))
    toast.success(`Connector status updated successfully!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Integration Connectors Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">Connect and sync ACOS databases with third-party ERPs, CRM systems, and accounting platforms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map(c => (
          <Card key={c.id} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-border p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-800 font-display">{c.name}</CardTitle>
                <CardDescription className="text-3xs mt-0.5">{c.category}</CardDescription>
              </div>
              <Badge variant={c.status === 'connected' ? 'success' : 'secondary'} className="capitalize text-3xs">
                {c.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 flex items-center justify-between text-xs pt-3">
              <span className="text-muted-foreground">Toggle Status:</span>
              <button onClick={() => handleToggle(c.id, c.status)}>
                {c.status === 'connected' ? (
                  <ToggleRight className="h-6 w-6 text-accent-600" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-slate-400" />
                )}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
