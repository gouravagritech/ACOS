'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { 
  GitBranch, Play, Settings, RefreshCw, AlertCircle, CheckCircle, 
  Terminal, ShieldCheck, BarChart3, Database, Key, Layout
} from 'lucide-react'
import { toast } from 'sonner'

interface BacklogItem {
  id: string
  title: string
  type: 'feature' | 'bug' | 'refactor' | 'tech_debt'
  priority: 'critical' | 'high' | 'medium'
  status: 'todo' | 'in_progress' | 'completed'
}

export default function AEMSPage() {
  const [activeTab, setActiveTab] = useState<'backlog' | 'velocity' | 'qa' | 'release'>('backlog')
  const [backlog, setBacklog] = useState<BacklogItem[]>([
    { id: 'EPIC-001', title: 'Enterprise Multi-Tenant Isolation', type: 'feature', priority: 'critical', status: 'completed' },
    { id: 'BUG-001', title: 'Customer search crashes when company name is empty', type: 'bug', priority: 'high', status: 'todo' },
    { id: 'REF-002', title: 'Optimize supabase query index parameters for formulations', type: 'refactor', priority: 'medium', status: 'in_progress' }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState<'feature' | 'bug' | 'refactor' | 'tech_debt'>('feature')

  const handleCreateIssue = () => {
    if (!newTitle) return
    const id = `${newType.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`
    setBacklog(prev => [
      ...prev,
      { id, title: newTitle, type: newType, priority: 'medium', status: 'todo' }
    ])
    setNewTitle('')
    toast.success(`AEMS generated GitHub Issue: ${id} successfully!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">ACOS Engineering Management (AEMS)</h1>
          <p className="text-sm text-muted-foreground mt-1">Enterprise management layer to compile Sprints, generate GitHub issues, and track QA regressions.</p>
        </div>
        <Badge variant="success" className="text-xs">AEMS v1.0 Online</Badge>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-2">
        <button 
          onClick={() => setActiveTab('backlog')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'backlog' ? 'border-primary-600 text-primary-600' : 'border-transparent text-muted-foreground hover:text-slate-800'}`}
        >
          Backlog & Issue Generator
        </button>
        <button 
          onClick={() => setActiveTab('velocity')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'velocity' ? 'border-primary-600 text-primary-600' : 'border-transparent text-muted-foreground hover:text-slate-800'}`}
        >
          Sprint Velocity & Burndowns
        </button>
        <button 
          onClick={() => setActiveTab('qa')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'qa' ? 'border-primary-600 text-primary-600' : 'border-transparent text-muted-foreground hover:text-slate-800'}`}
        >
          QA Test Cases & Regressions
        </button>
        <button 
          onClick={() => setActiveTab('release')}
          className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'release' ? 'border-primary-600 text-primary-600' : 'border-transparent text-muted-foreground hover:text-slate-800'}`}
        >
          Release Mappings & Changelogs
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'backlog' && (
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Layout className="h-4.5 w-4.5 text-primary-600" />
                <span>Issue & Epic Template Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-4">
                <Input 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="Issue title (e.g. Add loading bar to login screen)..." 
                  className="flex-1 text-xs"
                />
                <select 
                  value={newType} 
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="bg-background border border-input rounded-lg px-3 py-2 text-xs select-none outline-none"
                >
                  <option value="feature">Epic / Feature</option>
                  <option value="bug">Bug / Hotfix</option>
                  <option value="refactor">Refactor</option>
                  <option value="tech_debt">Tech Debt</option>
                </select>
                <Button onClick={handleCreateIssue} size="sm" className="flex items-center gap-1 text-2xs">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Generate Issue</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {backlog.map(item => (
              <Card key={item.id} className="border-border">
                <CardContent className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded text-3xs">
                      {item.id}
                    </span>
                    <span className="font-semibold text-slate-800">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.priority === 'critical' ? 'destructive' : 'secondary'} className="text-3xs uppercase">
                      {item.priority}
                    </Badge>
                    <Badge variant={item.status === 'completed' ? 'success' : 'outline'} className="text-3xs capitalize">
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'velocity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Sprint Velocity Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-xs space-y-4">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-muted-foreground">Sprint 1 Target Story Points:</span>
                <span className="font-semibold text-slate-800">45 pts</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-muted-foreground">Sprint 1 Achieved Story Points:</span>
                <span className="font-semibold text-accent-600">42 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Velocity (Last 3 Sprints):</span>
                <span className="font-semibold text-slate-800">38.4 pts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Burndown Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col justify-center items-center h-32 text-center text-xs text-muted-foreground">
              <BarChart3 className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <span>Burndown curve matches ideal path. 94% on-track.</span>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'qa' && (
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Regression Test Execution</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <div>
                <span className="font-semibold text-slate-800">Test Suite: Auth & Tenant Isolation</span>
                <p className="text-3xs text-muted-foreground mt-0.5">14 unit tests, 2 Playwright integrations.</p>
              </div>
              <Badge variant="success" className="text-3xs">Passed</Badge>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <div>
                <span className="font-semibold text-slate-800">Test Suite: LIMS Viscosity Calculation</span>
                <p className="text-3xs text-muted-foreground mt-0.5">8 calculation limits verifications.</p>
              </div>
              <Badge variant="success" className="text-3xs">Passed</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'release' && (
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Release Notes & Changelog Compiler</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800">
              <span className="font-mono text-2xs font-semibold text-primary-600 block mb-1">Generated Changelog - v1.0.0</span>
              <ul className="list-disc pl-4 space-y-1 mt-2 text-2xs leading-relaxed">
                <li>[EPIC-001] Deployed multi-tenant database partitions.</li>
                <li>[REF-002] Optimized Supabase index parameters for faster formulation scaling calculations.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
