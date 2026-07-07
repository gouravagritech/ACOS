'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react'

export default function MarketingAnalyticsPage() {
  const metrics = [
    { title: 'Exhibition Leads Generated', value: '420 leads', icon: Users, change: 'FI India & AAHAR total' },
    { title: 'LinkedIn Engagement Rate', value: '8.4%', icon: TrendingUp, change: '+1.5% compared to benchmark' },
    { title: 'Newsletter Open Rate', value: '42.1%', icon: Target, change: 'Industry-leading score' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Marketing Analytics & ROI</h1>
        <p className="text-sm text-muted-foreground mt-1">Review multi-channel marketing campaigns performance, open rates, and exhibition lead generation conversion metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, idx) => (
          <Card key={idx} className="shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">{m.title}</span>
                <m.icon className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800 font-display block">{m.value}</span>
                <span className="text-3xs font-medium text-accent-600 block mt-1">{m.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Exhibition Attendance Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Food Ingredients (Fi) India Expo</span>
              <span className="font-bold text-slate-800">280 leads (â‚¹ 2,400,000 value)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">AAHAR International Food Fair</span>
              <span className="font-bold text-slate-800">140 leads (â‚¹ 1,100,000 value)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
