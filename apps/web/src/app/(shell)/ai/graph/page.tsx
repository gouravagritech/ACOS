'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Database, GitPullRequest, ArrowRight } from 'lucide-react'

interface GraphRelation {
  source: string
  type: string
  target: string
}

export default function KnowledgeGraphPage() {
  const relations: GraphRelation[] = [
    { source: 'Britannia Industries', type: 'HAS_FORMULATION', target: 'Stabilizer Blend v4' },
    { source: 'Stabilizer Blend v4', type: 'USES_GRADE', target: 'AquaCol K-100 (Kappa)' },
    { source: 'AquaCol K-100 (Kappa)', type: 'PRODUCED_IN', target: 'Batch BK-401' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Knowledge Graph Explorer</h1>
        <p className="text-sm text-muted-foreground mt-1">Visualize and trace relations between B2B accounts, product SKUs, lab tests, and formulations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Total Nodes Ingested</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">1,420 nodes</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Directed Relations</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">4,850 edges</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Graph Database Status</span>
          <span className="text-sm font-semibold text-accent-600 mt-2 flex items-center gap-1.5">
            <Database className="h-4.5 w-4.5" />
            Connected (Supabase / Neo4j)
          </span>
        </Card>
      </div>

      <Card className="shadow-sm border border-border">
        <CardHeader className="border-b border-border p-4">
          <CardTitle className="text-sm font-semibold">Entity Relationships</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {relations.map((rel, idx) => (
            <div key={idx} className="flex items-center gap-4 text-xs font-mono bg-slate-50 border border-slate-100 p-3 rounded-lg w-fit">
              <span className="font-semibold text-slate-800 bg-white px-2 py-1 rounded shadow-sm">
                ({rel.source})
              </span>
              <span className="text-primary-600 font-bold flex items-center gap-1">
                ──[{rel.type}]──►
              </span>
              <span className="font-semibold text-slate-800 bg-white px-2 py-1 rounded shadow-sm">
                ({rel.target})
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
