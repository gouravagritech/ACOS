'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, Truck, ArrowUpRight } from 'lucide-react'

interface SampleDispatch {
  id: string
  company: string
  product: string
  carrier: string
  trackingNo: string
  status: 'transit' | 'delivered'
}

export default function SamplesDispatchPage() {
  const [query, setQuery] = useState('')
  const [dispatches] = useState<SampleDispatch[]>([
    { id: 'dsp-1', company: 'Britannia Industries Ltd', product: 'AquaCol K-100', carrier: 'DHL Express', trackingNo: 'DHL-92847104', status: 'transit' },
    { id: 'dsp-2', company: 'Mother Dairy Fruit & Veg', product: 'AquaCol I-80', carrier: 'BlueDart', trackingNo: 'BD-84729104', status: 'delivered' }
  ])

  const filtered = dispatches.filter(d => d.company.toLowerCase().includes(query.toLowerCase()) || d.trackingNo.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Courier & Dispatch Tracking</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor transit status and tracking IDs for dispatched biopolymer application samples.</p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search tracking ID, company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(d => (
          <Card key={d.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <span className="text-xs font-semibold text-slate-700">{d.company}</span>
              <Badge variant={d.status === 'delivered' ? 'success' : 'secondary'} className="capitalize">
                {d.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Product Dispatched</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{d.product}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Logistics Courier</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{d.carrier}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Tracking ID</span>
                  <span className="font-semibold text-primary-600 font-mono mt-1 block flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    {d.trackingNo}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
import { Input } from '@/components/ui/Input'
