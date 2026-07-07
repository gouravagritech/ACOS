'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Layers, Sliders, TrendingUp } from 'lucide-react'

interface WorkOrder {
  id: string
  sku: string
  qty: string
  machine: string
  status: 'scheduled' | 'running' | 'completed'
}

export default function ProductionPage() {
  const [orders] = useState<WorkOrder[]>([
    { id: 'wo-101', sku: 'AQUACOL-K100', qty: '2,500 kg', machine: 'Extractor Alpha', status: 'running' },
    { id: 'wo-102', sku: 'AQUACOL-I80', qty: '1,200 kg', machine: 'Dryer Beta', status: 'scheduled' }
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Manufacturing Planning & Schedules</h1>
        <p className="text-sm text-muted-foreground mt-1">Schedule seaweed extraction runs, allocate dryers, and monitor factory OEE yields.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Overall Equipment Efficiency (OEE)</span>
          <span className="text-2xl font-bold text-accent-600 font-display mt-2">84.2%</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Refinement Yield (Average)</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">72.1%</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Active Work Orders</span>
          <span className="text-2xl font-bold text-primary-600 font-display mt-2">{orders.length} runs</span>
        </Card>
      </div>

      <Card className="shadow-sm border border-border">
        <CardHeader className="border-b border-border p-4">
          <CardTitle className="text-sm font-semibold">Active Work Orders Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Product SKU</th>
                  <th className="px-6 py-3 font-semibold">Target Qty</th>
                  <th className="px-6 py-3 font-semibold">Assigned Line</th>
                  <th className="px-6 py-3 font-semibold">Execution Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900">{o.id}</td>
                    <td className="px-6 py-4 text-slate-700">{o.sku}</td>
                    <td className="px-6 py-4 text-muted-foreground">{o.qty}</td>
                    <td className="px-6 py-4">{o.machine}</td>
                    <td className="px-6 py-4">
                      <Badge variant={o.status === 'running' ? 'default' : 'secondary'} className="capitalize">
                        {o.status}
                      </Badge>
                    </td>
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
