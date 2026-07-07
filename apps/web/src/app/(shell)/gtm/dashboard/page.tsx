'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart3, TrendingUp, Users, Target, Ship, MapPin } from 'lucide-react'

export default function GTMDashboardPage() {
  const stats = [
    { title: 'Weighted Pipeline Value', value: 'â‚¹ 12,450,000', icon: TrendingUp, change: '+14% from last month' },
    { title: 'Active Lead Conversions', value: '78.5%', icon: Target, change: '+2.1% efficiency lift' },
    { title: 'Strategic Accounts Active', value: '34 accounts', icon: Users, change: '2 onboarded this week' },
    { title: 'Carrageenan Volume Sold', value: '420 Tons', icon: Ship, change: 'Year-to-date total' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">GTM Leadership Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time overview of sales pipeline value, target account conversions, and regional biopolymer consumption.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.title}</span>
                <stat.icon className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-800 font-display block">{stat.value}</span>
                <span className="text-3xs font-medium text-accent-600 block mt-1">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Territory Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">North India (Delhi Corporate)</span>
              <span className="text-xs font-bold text-slate-800">â‚¹ 5,800,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">South India (Manamadurai / Chennai)</span>
              <span className="text-xs font-bold text-slate-800">â‚¹ 4,200,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Export Markets (Europe / Americas)</span>
              <span className="text-xs font-bold text-slate-800">â‚¹ 2,450,000</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-sm font-semibold">Top Application Segments</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Dairy Stabilizers (Ice Cream / Flavoured Milk)</span>
              <Badge variant="default" className="text-[10px]">62% share</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Confectionery Gelling (Vegan Gummies)</span>
              <Badge variant="secondary" className="text-[10px]">24% share</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Brewing & Processed Meats</span>
              <Badge variant="outline" className="text-[10px]">14% share</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
