'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FileDown, Calendar, Database, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

interface CustomerOrder {
  id: string
  product: string
  qty: string
  status: 'delivered' | 'in_transit'
  coaUrl: string
}

export default function CustomerPortalPage() {
  const [orders] = useState<CustomerOrder[]>([
    { id: 'ORD-948271', product: 'AquaCol K-100 (Kappa Carrageenan)', qty: '5,000 Kgs', status: 'delivered', coaUrl: '/api/v1/documents/coa/ORD-948271' },
    { id: 'ORD-948302', product: 'AquaCol I-80 (Iota Carrageenan)', qty: '2,000 Kgs', status: 'in_transit', coaUrl: '' }
  ])

  const handleDownload = (id: string) => {
    toast.success(`Certificate of Analysis (COA) for ${id} downloaded successfully!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Customer Self-Service Portal</h1>
        <p className="text-sm text-muted-foreground mt-1">Review orders history, trace shipping status, and download Certificates of Analysis (COA).</p>
      </div>

      <div className="space-y-4">
        {orders.map(o => (
          <Card key={o.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  Order: {o.id}
                </span>
                <span className="text-xs font-semibold text-slate-700">{o.product}</span>
              </div>
              <Badge variant={o.status === 'delivered' ? 'success' : 'secondary'} className="capitalize text-3xs font-display">
                {o.status.replace('_', ' ')}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Quantity</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{o.qty}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Estimated Delivery</span>
                  <span className="font-semibold text-slate-800 mt-1 block flex items-center gap-1 font-mono">
                    <Calendar className="h-3.5 w-3.5" />
                    2026-07-15
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  {o.status === 'delivered' ? (
                    <Button onClick={() => handleDownload(o.id)} size="sm" variant="outline" className="flex items-center gap-1">
                      <FileDown className="h-3.5 w-3.5" />
                      <span>Download COA Spec Sheet</span>
                    </Button>
                  ) : (
                    <span className="text-muted-foreground italic">COA pending dispatch release</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
