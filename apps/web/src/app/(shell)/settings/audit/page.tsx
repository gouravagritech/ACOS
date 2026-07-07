'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'

interface AuditLogEntry {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
}

export default function AuditLogsPage() {
  const [query, setQuery] = useState('')
  const [logs] = useState<AuditLogEntry[]>([
    { id: 'aud-49274', actor: 'Pooja Patel', action: 'APPROVE_PURCHASE_ORDER', target: 'PO-2026-041', timestamp: '2026-07-06 13:02 IST' },
    { id: 'aud-49275', actor: 'Gourav Sharma', action: 'RELEASE_COA', target: 'Batch BK-401', timestamp: '2026-07-06 12:45 IST' }
  ])

  const filtered = logs.filter(l => l.actor.toLowerCase().includes(query.toLowerCase()) || l.action.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Security Audit Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Read-only history tracking all PO approvals, lab COA releases, and admin changes.</p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search actor or action..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="shadow-sm border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                  <th className="px-6 py-3 font-semibold">Target Entity</th>
                  <th className="px-6 py-3 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{l.actor}</td>
                    <td className="px-6 py-4 text-slate-700 font-mono text-2xs">{l.action}</td>
                    <td className="px-6 py-4 font-mono text-2xs text-muted-foreground">{l.target}</td>
                    <td className="px-6 py-4 font-mono text-xs">{l.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
