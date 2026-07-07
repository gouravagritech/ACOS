'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Plus, ArrowUpRight, Sliders, Calendar } from 'lucide-react'

interface Formulation {
  id: string
  name: string
  application: string
  version: number
  costEstimate: string
  status: 'approved' | 'draft'
  created: string
}

export default function FormulationsPage() {
  const [query, setQuery] = useState('')

  const [formulations, setFormulations] = useState<Formulation[]>([
    { id: 'form-1', name: 'Stabilizer Blend for Chocolate Milk Suspension', application: 'Dairy / Flavoured Milk', version: 4, costEstimate: 'â‚¹ 220 / kg', status: 'approved', created: '2026-07-01' },
    { id: 'form-2', name: 'Clean Label Gummy Jelly Gelling Matrix', application: 'Confectionery / Gummies', version: 2, costEstimate: 'â‚¹ 310 / kg', status: 'approved', created: '2026-06-28' },
    { id: 'form-3', name: 'Water-binding gel for Poultry sausages', application: 'Meat / Sausages', version: 1, costEstimate: 'â‚¹ 190 / kg', status: 'draft', created: '2026-06-25' }
  ])

  const filtered = formulations.filter(f => f.name.toLowerCase().includes(query.toLowerCase()) || f.application.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Formulation Studio Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage version-controlled ingredient formulations and cost estimates.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Create Formula</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search formulation name, application category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(f => (
          <Card key={f.id} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {f.created}
                </span>
                <Badge variant={f.status === 'approved' ? 'default' : 'secondary'} className="capitalize">
                  {f.status}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2 font-display text-slate-800">{f.name}</CardTitle>
              <CardDescription className="text-xs">{f.application}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3 text-xs">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Active Version</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">v{f.version}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Cost Estimate</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{f.costEstimate}</span>
                </div>
              </div>

              <Link href={`/technical/formulations/${f.id}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-xs">
                  <span>Open Formulation Studio</span>
                  <Sliders className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
