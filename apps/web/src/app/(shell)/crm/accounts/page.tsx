'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Plus, Filter, ArrowUpRight, ShieldAlert, Award } from 'lucide-react'

interface B2BAccount {
  id: string
  name: string
  type: 'prospect' | 'customer'
  tier: 'strategic' | 'key' | 'standard'
  country: string
  industry: string
  healthScore: number
  annualValue: string
}

export default function AccountsPage() {
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'customer' | 'prospect'>('all')

  const [accounts, setAccounts] = useState<B2BAccount[]>([
    { id: 'acc-001', name: 'Britannia Industries Ltd', type: 'customer', tier: 'strategic', country: 'IN', industry: 'Dairy / Biscuit', healthScore: 94, annualValue: 'â‚¹ 4,500,000' },
    { id: 'acc-002', name: 'Mother Dairy Fruit & Veg', type: 'customer', tier: 'key', country: 'IN', industry: 'Dairy / Ice Cream', healthScore: 88, annualValue: 'â‚¹ 2,800,000' },
    { id: 'acc-003', name: 'Nestle India Corporate', type: 'prospect', tier: 'strategic', country: 'IN', industry: 'Dairy / Confectionery', healthScore: 75, annualValue: 'â‚¹ 0' },
    { id: 'acc-004', name: 'Amul Co-operative Dairy', type: 'customer', tier: 'strategic', country: 'IN', industry: 'Dairy / Cheese', healthScore: 92, annualValue: 'â‚¹ 8,200,000' },
    { id: 'acc-005', name: 'Creambell Ice Creams', type: 'prospect', tier: 'standard', country: 'IN', industry: 'Dairy / Ice Cream', healthScore: 68, annualValue: 'â‚¹ 0' }
  ])

  const filtered = accounts.filter(acc => {
    const matchesQuery = acc.name.toLowerCase().includes(query.toLowerCase()) || acc.industry.toLowerCase().includes(query.toLowerCase())
    const matchesType = filterType === 'all' ? true : acc.type === filterType
    return matchesQuery && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">B2B CRM Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage accounts, customer health scores, and annual contract values.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Account</span>
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search account name, industry vertical..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <Button 
            variant={filterType === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilterType('all')}
            size="sm"
          >
            All
          </Button>
          <Button 
            variant={filterType === 'customer' ? 'default' : 'outline'} 
            onClick={() => setFilterType('customer')}
            size="sm"
          >
            Customers
          </Button>
          <Button 
            variant={filterType === 'prospect' ? 'default' : 'outline'} 
            onClick={() => setFilterType('prospect')}
            size="sm"
          >
            Prospects
          </Button>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(acc => (
          <Card key={acc.id} className="hover:shadow-glass-md transition-all duration-300 border-border">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant={acc.type === 'customer' ? 'default' : 'outline'} className="capitalize">
                  {acc.type}
                </Badge>
                <Badge variant={acc.tier === 'strategic' ? 'success' : 'secondary'} className="capitalize font-display">
                  {acc.tier}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2 font-display text-slate-800">{acc.name}</CardTitle>
              <CardDescription className="text-xs">{acc.industry}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-t border-b border-slate-100 py-2.5">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground block">Health Score</span>
                  <span className={`text-sm font-bold ${acc.healthScore > 85 ? 'text-accent-600' : 'text-coral-600'}`}>
                    {acc.healthScore}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground block">Annual Value</span>
                  <span className="text-sm font-semibold text-slate-800">{acc.annualValue}</span>
                </div>
              </div>
              <Link href={`/crm/accounts/${acc.id}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-xs">
                  <span>Open Customer 360</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
