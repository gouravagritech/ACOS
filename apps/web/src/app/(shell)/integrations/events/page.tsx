'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Database, ShieldCheck } from 'lucide-react'

interface DomainEvent {
  id: string
  eventType: string
  payload: string
  timestamp: string
}

export default function EventsPage() {
  const events: DomainEvent[] = [
    { id: 'evt-001', eventType: 'ORDER_DISPATCHED', payload: '{"orderId":"ORD-948271","courier":"DHL"}', timestamp: '2026-07-06 13:10 IST' },
    { id: 'evt-002', eventType: 'QC_TEST_FAILED', payload: '{"batchNo":"BI-202","reason":"Moisture high"}', timestamp: '2026-07-06 12:45 IST' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Event Bus Stream Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Review active event streams, domain message routing payloads, and audit trails.</p>
      </div>

      <div className="space-y-4">
        {events.map(e => (
          <Card key={e.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {e.eventType}
                </span>
                <span className="text-xs text-muted-foreground">{e.timestamp}</span>
              </div>
              <Badge variant="outline" className="text-3xs font-mono">{e.id}</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs">
              <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Event Payload</span>
              <pre className="font-mono text-2xs text-slate-800 bg-slate-50 border border-slate-100 p-3 rounded-lg overflow-x-auto">
                {e.payload}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
