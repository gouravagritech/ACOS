'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Search, Ship, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

interface PurchaseOrder {
  id: string
  supplier: string
  seaweedType: string
  value: string
  status: 'pending_approval' | 'dispatched' | 'received'
}

export default function ProcurementPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([
    { id: 'PO-2026-041', supplier: 'Bali Seaweed Growers Co-op', seaweedType: 'Eucheuma cottonii (Dry)', value: '₹ 1,800,000', status: 'pending_approval' },
    { id: 'PO-2026-039', supplier: 'Zanzibar Aquaculture Group', seaweedType: 'Eucheuma spinosum (Dry)', value: '₹ 950,000', status: 'dispatched' }
  ])

  const handleApprove = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'dispatched' } : o))
    toast.success(`Purchase Order approved! Sent to supplier import manifest.`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Procurement & Raw Seaweed POs</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage dry seaweed import purchase orders and supplier quote comparisons.</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(o => (
          <Card key={o.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {o.id}
                </span>
                <span className="text-xs font-semibold text-slate-700">{o.supplier}</span>
              </div>
              <Badge variant={o.status === 'received' ? 'success' : o.status === 'dispatched' ? 'default' : 'secondary'} className="capitalize">
                {o.status.replace('_', ' ')}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Seaweed Variety</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{o.seaweedType}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-primary-600" />
                    PO Valuation
                  </span>
                  <span className="font-semibold text-slate-800 mt-1 block">{o.value}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block flex items-center gap-1">
                    <Ship className="h-3.5 w-3.5 text-accent-600" />
                    Shipping status
                  </span>
                  <span className="font-semibold text-slate-800 mt-1 block capitalize">
                    {o.status === 'pending_approval' ? 'Awaiting VP Sign-off' : 'In Transit (Sea Cargo)'}
                  </span>
                </div>
              </div>

              {o.status === 'pending_approval' && (
                <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                  <Button onClick={() => handleApprove(o.id)} size="sm" className="text-xs">
                    Approve PO & Dispatch to Grow-area
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
