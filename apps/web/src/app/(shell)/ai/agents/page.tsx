'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Brain, Settings, Play } from 'lucide-react'
import { toast } from 'sonner'

interface AIAgent {
  name: string
  role: string
  model: string
  status: 'idle' | 'running'
  lastAction: string
}

export default function AgentsPage() {
  const agents: AIAgent[] = [
    { name: 'Formulation Scientist Agent', role: 'Formulation Optimization & Scaling', model: 'Claude 3.5 Sonnet', status: 'idle', lastAction: 'Scaled chocolate milk recipe v4 to 100 kgs target.' },
    { name: 'CEO Agent', role: 'Weekly Briefing & KPIs compiling', model: 'Gemini 2.0 Flash', status: 'idle', lastAction: 'Generated weekly executive report summary.' },
    { name: 'Workflow Orchestrator Agent', role: 'n8n pipelines coordinator', model: 'GPT-4o', status: 'running', lastAction: 'Traversing knowledge graph to resolve PO reorders.' }
  ]

  const handleTrigger = (name: string) => {
    toast.success(`Agent ${name} triggered in the background!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">AI Agent framework</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage specialized agentic nodes, model assignments, and review background execution logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((ag, idx) => (
          <Card key={idx} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-border p-4 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-sm font-bold text-slate-800 font-display">{ag.name}</CardTitle>
                <CardDescription className="text-3xs mt-0.5">{ag.role}</CardDescription>
              </div>
              <Badge variant={ag.status === 'running' ? 'default' : 'secondary'} className="capitalize text-3xs">
                {ag.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-muted-foreground">Model:</span>
                <span className="font-semibold text-slate-800">{ag.model}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">Last Action:</span>
                <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-2xs italic">
                  "{ag.lastAction}"
                </p>
              </div>
              <Button onClick={() => handleTrigger(ag.name)} className="w-full flex items-center justify-center gap-1.5 text-2xs">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Execute Agent Task</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
