'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  ArrowLeft, Award, Settings, Phone, Calendar, 
  Sparkles, FileText, CheckCircle2, ChevronRight, Inbox, Database
} from 'lucide-react'
import Link from 'next/link'

export default function AccountDetailPage() {
  const params = useParams()
  const accountId = params.id as string

  // Mock Customer 360 parameters
  const account = {
    name: 'Britannia Industries Ltd',
    industry: 'Dairy & Processed Foods',
    tier: 'strategic',
    status: 'Active Customer',
    healthScore: 94,
    annualCons: '120 Metric Tons',
    representative: 'Gourav Sharma',
    aiSummary: 'Britannia is India\'s leading commercial purchaser of Kappa Carrageenan for cream-stabilizers. Current contract expires in 3 months. Next best action: Initiate contract renewal discussions pre-loaded with application laboratory trials feedback.',
    timeline: [
      { date: '2026-07-01', title: 'Sample Feedback Received', desc: 'Britannia Quality Lab approved batch no BK-401 for cheese viscosity.', type: 'feedback' },
      { date: '2026-06-25', title: 'Sample Dispatched', desc: '100g sample of biopolymer gel AquaCol K-100 shipped via courier.', type: 'dispatch' },
      { date: '2026-06-20', title: 'Technical Meeting Conducted', desc: 'R&D Head aligned on viscosity specs at Britannia Bangalore corporate office.', type: 'meeting' },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Back Header */}
      <div className="flex items-center gap-4">
        <Link href="/crm/accounts">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-display text-slate-800">{account.name}</h1>
            <Badge variant="success" className="h-5">{account.status}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{account.industry} · Account ID: {accountId}</p>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">B2B Account Tier</span>
          <span className="text-2xl font-bold text-slate-800 capitalize font-display mt-2 flex items-center gap-1.5">
            <Award className="h-5 w-5 text-primary-600" />
            {account.tier}
          </span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Customer Health Score</span>
          <span className="text-2xl font-bold text-accent-600 font-display mt-2">{account.healthScore}%</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Annual Consumption</span>
          <span className="text-2xl font-bold text-slate-800 font-display mt-2">{account.annualCons}</span>
        </Card>
        <Card className="p-4 flex flex-col justify-between shadow-sm">
          <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">Owner Account Manager</span>
          <span className="text-sm font-semibold text-slate-700 mt-2">{account.representative}</span>
        </Card>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: AI Summary and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI digital twin summary card */}
          <Card className="border border-primary-100 bg-primary-50/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-primary-900">
                <Sparkles className="h-4.5 w-4.5 text-primary-600 animate-pulse" />
                <span>AI Customer Digital Twin Insight</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-950 leading-relaxed font-sans">{account.aiSummary}</p>
            </CardContent>
          </Card>

          {/* Timeline events */}
          <Card className="shadow-sm">
            <CardHeader className="border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Customer 360 Activity Timeline</CardTitle>
              <CardDescription>Comprehensive record of all emails, calls, samples, and trial feedback logs</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative border-l border-border pl-6 space-y-6">
                {account.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    {/* Event icon circle */}
                    <div className="absolute -left-[31px] top-0.5 h-4.5 w-4.5 rounded-full bg-background border-2 border-primary-500 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                    </div>
                    
                    <div>
                      <span className="text-3xs font-semibold text-muted-foreground uppercase">{event.date}</span>
                      <h4 className="text-sm font-semibold text-slate-800 mt-0.5">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Col 3: Side Directory modules */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Key Contacts Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Dr. Vivek Nair</h4>
                  <p className="text-[10px] text-muted-foreground">R&D Director - Dairy Applications</p>
                </div>
                <Badge variant="default" className="text-[10px] h-4.5">Decision Maker</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Pooja Patel</h4>
                  <p className="text-[10px] text-muted-foreground">Procurement Officer</p>
                </div>
                <Badge variant="secondary" className="text-[10px] h-4.5">Influencer</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
