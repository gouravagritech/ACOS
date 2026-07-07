'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'
import { Truck, CheckCircle2, ChevronRight } from 'lucide-react'

interface SampleRequest {
  id: string
  company: string
  product: string
  qty: string
  status: 'requested' | 'approved' | 'dispatched' | 'delivered'
  trackingId?: string
}

export default function SampleRequestsPage() {
  const [requests, setRequests] = useState<SampleRequest[]>([
    { id: 'smp-1', company: 'Britannia Industries Ltd', product: 'AquaCol K-100 (Kappa)', qty: '200g', status: 'requested' },
    { id: 'smp-2', company: 'Mother Dairy Veg', product: 'AquaCol I-80 (Iota)', qty: '100g', status: 'approved' },
    { id: 'smp-3', company: 'Apex Ingredients Inc', product: 'AquaCol K-100 (Kappa)', qty: '500g', status: 'dispatched', trackingId: 'DHL-92847104' }
  ])

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
    toast.success('Sample request approved! Invoiced to packaging queue.')
  }

  const handleDispatch = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'dispatched', trackingId: `DHL-${Math.floor(Math.random() * 90000000) + 10000000}` } : r))
    toast.success('Sample dispatched! Tracking ID created.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Sample Logistics Pipeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Track sample workflows from request, VP approval, plant packaging, courier booking, to customer delivery.</p>
      </div>

      <div className="space-y-4">
        {requests.map(req => (
          <Card key={req.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <span className="text-xs font-semibold text-slate-700">{req.company}</span>
              <Badge variant={req.status === 'dispatched' || req.status === 'delivered' ? 'success' : 'secondary'} className="capitalize">
                {req.status}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Product grade</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{req.product}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Sample Quantity</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{req.qty}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Courier Tracking</span>
                  <span className="font-semibold text-primary-600 font-mono mt-1 block">
                    {req.trackingId || 'Not dispatched'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                {req.status === 'requested' && (
                  <Button onClick={() => handleApprove(req.id)} size="sm" className="text-xs flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Approve Request</span>
                  </Button>
                )}
                {req.status === 'approved' && (
                  <Button onClick={() => handleDispatch(req.id)} size="sm" className="text-xs flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span>Book Courier & Dispatch</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
