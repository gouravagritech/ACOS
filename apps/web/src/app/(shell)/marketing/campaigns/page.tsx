'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Plus, Calendar, Target, DollarSign } from 'lucide-react'

interface MarketingCampaign {
  id: string
  name: string
  channel: string
  budget: string
  status: 'planning' | 'active' | 'completed'
  roi: string
}

export default function CampaignsPage() {
  const [query, setQuery] = useState('')
  const [campaigns] = useState<MarketingCampaign[]>([
    { id: 'cmp-1', name: 'Fi India 2026 Exhibition', channel: 'Exhibition / Booth', budget: 'â‚¹ 800,000', status: 'planning', roi: 'Pending event' },
    { id: 'cmp-2', name: 'Dairy Stabilizers Lead Gen Campaign', channel: 'LinkedIn Ads', budget: 'â‚¹ 150,000', status: 'active', roi: '180% estimated' },
    { id: 'cmp-3', name: 'Q2 biopolymer newsletters digest', channel: 'Email Newsletter', budget: 'â‚¹ 15,000', status: 'completed', roi: '340% actual' }
  ])

  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Campaign Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Plan exhibition booths, LinkedIn sponsorships, and review marketing return-on-investment (ROI) attributions.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search campaign name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <Card key={c.id} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {c.channel}
                </span>
                <Badge variant={c.status === 'active' ? 'default' : c.status === 'completed' ? 'success' : 'secondary'} className="capitalize">
                  {c.status}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2 font-display text-slate-800">{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-primary-600" />
                    Budget Spent
                  </span>
                  <span className="font-semibold text-slate-800 mt-1 block">{c.budget}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block flex items-center gap-1">
                    <Target className="h-3.5 w-3.5 text-accent-600" />
                    Campaign ROI
                  </span>
                  <span className="font-semibold text-slate-800 mt-1 block">{c.roi}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
