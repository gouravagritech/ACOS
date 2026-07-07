'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Ship, FileText, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface SupplierPO {
  id: string
  seaweedType: string
  qty: string
  status: 'pending_dispatch' | 'shipped'
}

export default function SupplierPortalPage() {
  const [pos, setPos] = useState<SupplierPO[]>([
    { id: 'PO-2026-041', seaweedType: 'Dry Eucheuma cottonii', qty: '15 Tons', status: 'pending_dispatch' }
  ])

  const handleShip = (id: string) => {
    setPos(prev => prev.map(p => p.id === id ? { ...p, status: 'shipped' } : p))
    toast.success('Cargo shipment registered! Container tracking posted.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Supplier Collaboration Console</h1>
        <p className="text-sm text-muted-foreground mt-1">Review active seaweed purchase orders, confirm container cargo shipments, and track quality sheets.</p>
      </div>

      <div className="space-y-4">
        {pos.map(p => (
          <Card key={p.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {p.id}
                </span>
                <span className="text-xs font-semibold text-slate-700">{p.seaweedType}</span>
              </div>
              <Badge variant={p.status === 'shipped' ? 'success' : 'secondary'} className="capitalize text-3xs font-display">
                {p.status.replace('_', ' ')}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Order Volume Target</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{p.qty}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Crop Lot Quality Specs</span>
                  <span className="font-semibold text-accent-600 mt-1 block flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Moisture limit &lt; 35%
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  {p.status === 'pending_dispatch' ? (
                    <Button onClick={() => handleShip(p.id)} size="sm" className="flex items-center gap-1">
                      <Ship className="h-3.5 w-3.5" />
                      <span>Confirm Cargo Shipped</span>
                    </Button>
                  ) : (
                    <span className="text-muted-foreground italic">Manifest registered. Awaiting goods receipt.</span>
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
