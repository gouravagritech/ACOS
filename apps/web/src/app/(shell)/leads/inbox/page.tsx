'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Sparkles, ArrowRight, UserPlus, Filter, RefreshCcw, Bell } from 'lucide-react'
import { toast } from 'sonner'

interface Lead {
  id: string
  name: string
  company: string
  source: 'indiamart' | 'tradeindia' | 'website'
  score: number
  query: string
  created: string
}

export default function LeadInboxPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'lead-1', name: 'Rajesh Kumar', company: 'Yum Foods Dairy', source: 'indiamart', score: 85, query: 'Inquiry for food grade Kappa Carrageenan stabilizer with gel strength 900+ g/cm2. Viscosity specification 25cps. Quantity: 5 Tons.', created: '10 mins ago' },
    { id: 'lead-2', name: 'Amanda Smith', company: 'Apex Ingredients Inc', source: 'website', score: 92, query: 'Need immediate quote for clean label biopolymer stabilizers for chocolate milk suspension trials. Viscosity 15-20cps. Export to USA.', created: '2 hrs ago' },
    { id: 'lead-3', name: 'Vikram Singh', company: 'Delish Confectionery', source: 'tradeindia', score: 62, query: 'We need gelling agent for jelly candy. Send specifications.', created: '1 day ago' }
  ])

  const handleQualify = (id: string, name: string) => {
    toast.success(`Lead ${name} qualified! Customer account generated.`)
    setLeads(prev => prev.filter(lead => lead.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Lead Intelligence Inbox</h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-channel lead ingestion with automated AI Ideal Customer Profile (ICP) scoring.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          <span>Sync Now</span>
        </Button>
      </div>

      <div className="space-y-4">
        {leads.map(lead => (
          <Card key={lead.id} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="uppercase text-[10px]">
                  {lead.source}
                </Badge>
                <span className="text-xs text-muted-foreground">{lead.created}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">ICP Match Score:</span>
                <Badge variant={lead.score > 80 ? 'success' : 'secondary'} className="font-display font-bold">
                  {lead.score}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-800">{lead.name} Â· <span className="font-medium text-slate-600">{lead.company}</span></h4>
                <p className="text-xs text-slate-700 bg-slate-50 border border-slate-100/80 rounded-lg p-3 font-sans mt-2 italic leading-relaxed">
                  "{lead.query}"
                </p>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Mark Unqualified
                </Button>
                <Button 
                  onClick={() => handleQualify(lead.id, lead.name)}
                  size="sm" 
                  className="flex items-center gap-1.5 text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Qualify & Onboard</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
