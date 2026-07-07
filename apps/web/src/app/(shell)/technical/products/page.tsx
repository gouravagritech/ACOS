'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Plus, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react'

interface CarrageenanGrade {
  id: string
  sku: string
  name: string
  type: string
  gelStrength: string
  viscosity: string
  status: 'active' | 'development'
  certs: string[]
}

export default function ProductsPage() {
  const [query, setQuery] = useState('')

  const [grades, setGrades] = useState<CarrageenanGrade[]>([
    { id: 'grad-001', sku: 'AQUACOL-K100', name: 'AquaCol K-100', type: 'Refined Semi-refined Kappa', gelStrength: '900+ g/cmÂ²', viscosity: '20-30 cps', status: 'active', certs: ['FSSAI', 'FDA', 'Halal', 'Kosher'] },
    { id: 'grad-002', sku: 'AQUACOL-I80', name: 'AquaCol I-80', type: 'Refined Iota Carrageenan', gelStrength: 'Elastic Gel', viscosity: '15-25 cps', status: 'active', certs: ['FSSAI', 'FDA', 'Halal'] },
    { id: 'grad-003', sku: 'AQUACOL-KM50', name: 'AquaCol KM-50', type: 'Modified Kappa Blend', gelStrength: '700+ g/cmÂ²', viscosity: '25-35 cps', status: 'active', certs: ['FSSAI', 'Halal'] },
    { id: 'grad-004', sku: 'AQUACOL-KDEV', name: 'AquaCol K-Dev 3', type: 'Experimental Kappa', gelStrength: '1100+ g/cmÂ²', viscosity: '10-15 cps', status: 'development', certs: [] }
  ])

  const filtered = grades.filter(g => g.name.toLowerCase().includes(query.toLowerCase()) || g.sku.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Carrageenan Product Master</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage technical grade specifications, viscosity ranges, and regulatory certificates.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Product Grade</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search grade code (SKU), name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(g => (
          <Card key={g.id} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {g.sku}
                </span>
                <Badge variant={g.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                  {g.status}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2 font-display text-slate-800">{g.name}</CardTitle>
              <CardDescription className="text-xs">{g.type}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3 text-xs">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Gel Strength</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{g.gelStrength}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Viscosity</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{g.viscosity}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {g.certs.map((c, idx) => (
                  <Badge key={idx} variant="success" className="text-[9px] px-1.5 h-4.5">
                    {c}
                  </Badge>
                ))}
              </div>

              <Link href={`/technical/products/${g.id}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-xs">
                  <span>Open Spec Sheet</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
