'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Play, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

interface AutomationTask {
  id: string
  name: string
  runsCount: number
  status: 'active' | 'failed'
  lastRun: string
}

export default function WorkflowsPage() {
  const [tasks, setTasks] = useState<AutomationTask[]>([
    { id: 'flow-101', name: 'CRM-to-SAP Material Sync', runsCount: 142, status: 'active', lastRun: '10 mins ago' },
    { id: 'flow-102', name: 'Raw seaweed low stock PO reorder', runsCount: 12, status: 'active', lastRun: '2 hrs ago' }
  ])

  const handleRun = (name: string) => {
    toast.success(`Workflow "${name}" triggered manually!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Hyperautomation Workflows</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor scheduled automation jobs, execution tallies, and retry pipelines.</p>
      </div>

      <div className="space-y-4">
        {tasks.map(t => (
          <Card key={t.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <span className="text-xs font-semibold text-slate-700">{t.name}</span>
              <Badge variant="success" className="capitalize text-3xs font-display">
                {t.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Runs Total</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{t.runsCount} executions</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Last Executed</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{t.lastRun}</span>
                </div>
                <div className="flex justify-end items-center">
                  <Button onClick={() => handleRun(t.name)} size="sm" className="flex items-center gap-1.5 text-2xs">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run job</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
