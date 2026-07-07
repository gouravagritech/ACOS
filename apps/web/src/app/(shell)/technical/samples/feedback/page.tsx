'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Search, Star, MessageSquare } from 'lucide-react'

interface SampleFeedback {
  id: string
  company: string
  product: string
  rating: number
  notes: string
  created: string
}

export default function SamplesFeedbackPage() {
  const [query, setQuery] = useState('')
  const [feedbacks] = useState<SampleFeedback[]>([
    { id: 'fdb-1', company: 'Britannia Industries Ltd', product: 'AquaCol K-100', rating: 5, notes: 'The Kappa blend gel strength met our dairy stabilizers specs. Chocolate milk separation resolved.', created: '3 days ago' },
    { id: 'fdb-2', company: 'Creambell Ice Creams', product: 'AquaCol I-80', rating: 3, notes: 'Gelling was too elastic for our standard batch texture. Requesting a modified Kappa formulation.', created: '1 week ago' }
  ])

  const filtered = feedbacks.filter(f => f.company.toLowerCase().includes(query.toLowerCase()) || f.product.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Customer Trial Feedback Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">Review feedback, viscosity ratings, and technical recommendations submitted by B2B clients post-trial.</p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search company name, grade SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(f => (
          <Card key={f.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">{f.company}</span>
                <span className="text-xs text-muted-foreground">{f.created}</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < f.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Tested Grade</span>
                <span className="font-semibold text-slate-800 mt-1 block">{f.product}</span>
              </div>

              <div>
                <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-primary-600" />
                  Trial Notes
                </span>
                <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 border border-slate-100/80 p-3 rounded-lg text-xs italic">
                  "{f.notes}"
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
import { Input } from '@/components/ui/Input'
