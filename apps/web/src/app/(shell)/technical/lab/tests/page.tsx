'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'
import { CheckCircle2, AlertTriangle, FileCode, Check } from 'lucide-react'

interface LabTest {
  id: string
  batchNo: string
  grade: string
  parameter: string
  expected: string
  observed: string
  status: 'pending' | 'passed' | 'failed'
}

export default function LabTestsPage() {
  const [tests, setTests] = useState<LabTest[]>([
    { id: 'test-1', batchNo: 'BK-401', grade: 'AquaCol K-100', parameter: 'Viscosity (1.5% Sol, 75Â°C)', expected: '20-30 cps', observed: '24.5 cps', status: 'passed' },
    { id: 'test-2', batchNo: 'BK-401', grade: 'AquaCol K-100', parameter: 'Gel Strength (1.5% Sol, 20Â°C)', expected: '900+ g/cmÂ²', observed: '940 g/cmÂ²', status: 'passed' },
    { id: 'test-3', batchNo: 'BI-202', grade: 'AquaCol I-80', parameter: 'Moisture content', expected: '< 12%', observed: '14.2%', status: 'failed' },
    { id: 'test-4', batchNo: 'BK-402', grade: 'AquaCol K-100', parameter: 'Ash content', expected: '15-25%', observed: 'Pending log', status: 'pending' }
  ])

  const handleVerify = (id: string, isPass: boolean) => {
    setTests(prev => prev.map(t => t.id === id ? { ...t, status: isPass ? 'passed' : 'failed', observed: isPass ? t.expected : 'Out of spec' } : t))
    toast.success(`Lab Test parameters verified! Batch updated.`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">LIMS & Laboratory Queue</h1>
        <p className="text-sm text-muted-foreground mt-1">Review manufacturing batch QC tests, verify analytical values, and release Certificates of Analysis.</p>
      </div>

      <div className="space-y-4">
        {tests.map(test => (
          <Card key={test.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  Batch: {test.batchNo}
                </span>
                <span className="text-xs font-semibold text-slate-700">{test.grade}</span>
              </div>
              <Badge variant={test.status === 'passed' ? 'success' : test.status === 'failed' ? 'destructive' : 'secondary'} className="capitalize">
                {test.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">QC Parameter</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{test.parameter}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Spec Limits</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{test.expected}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Observed Value</span>
                  <span className={`font-semibold mt-1 block ${test.status === 'failed' ? 'text-coral-600' : 'text-slate-800'}`}>
                    {test.observed}
                  </span>
                </div>
              </div>

              {test.status === 'pending' && (
                <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                  <Button onClick={() => handleVerify(test.id, false)} variant="outline" size="sm" className="text-xs flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-coral-600" />
                    <span>Fail test</span>
                  </Button>
                  <Button onClick={() => handleVerify(test.id, true)} size="sm" className="text-xs flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>Pass and Release</span>
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
