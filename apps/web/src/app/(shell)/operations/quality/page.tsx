'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

interface QCIssue {
  id: string
  batchNo: string
  type: string
  severity: 'minor' | 'major' | 'critical'
  notes: string
  status: 'open' | 'investigating' | 'resolved'
}

export default function QualityPage() {
  const [issues, setIssues] = useState<QCIssue[]>([
    { id: 'dev-001', batchNo: 'BI-202', type: 'Moisture content deviation', severity: 'minor', notes: 'Moisture recorded at 14.2% (spec limit < 12.0%). Sent for re-drying cycles.', status: 'investigating' },
    { id: 'dev-002', batchNo: 'BK-398', type: 'Gel strength drop', severity: 'critical', notes: 'Gel strength recorded at 680 g/cm2 (spec limit > 900 g/cm2). Blended raw crop lot rejected.', status: 'resolved' }
  ])

  const handleResolve = (id: string) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status: 'resolved' } : i))
    toast.success('Quality deviation CAPA signed off and resolved!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Quality Assurance & CAPA Deviation Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Track manufacturing deviations, record corrective actions (CAPA), and verify ISO regulatory compliance.</p>
      </div>

      <div className="space-y-4">
        {issues.map(i => (
          <Card key={i.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  Batch: {i.batchNo}
                </span>
                <span className="text-xs font-semibold text-slate-700">{i.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={i.severity === 'critical' ? 'destructive' : 'secondary'} className="capitalize text-3xs font-display">
                  {i.severity}
                </Badge>
                <Badge variant={i.status === 'resolved' ? 'success' : 'secondary'} className="capitalize text-3xs font-display">
                  {i.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                {i.notes}
              </p>

              {i.status !== 'resolved' && (
                <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                  <Button onClick={() => handleResolve(i.id)} size="sm" className="text-2xs flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Sign-off and Close Deviation</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
