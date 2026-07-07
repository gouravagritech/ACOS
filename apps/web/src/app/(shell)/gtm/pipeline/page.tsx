'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { LayoutGrid, Plus, Sliders, ArrowUpRight } from 'lucide-react'

interface Deal {
  id: string
  name: string
  company: string
  value: string
  probability: number
}

interface Column {
  title: string
  deals: Deal[]
}

export default function PipelinePage() {
  const [columns, setColumns] = useState<Record<string, Column>>({
    qualification: {
      title: 'Qualification',
      deals: [
        { id: 'deal-1', name: 'Yum Foods visco trial', company: 'Yum Foods Dairy', value: 'â‚¹ 1,200,000', probability: 20 },
      ]
    },
    tech_eval: {
      title: 'Technical Evaluation',
      deals: [
        { id: 'deal-2', name: 'Chocolate Milk Suspension Specs', company: 'Britannia Industries Ltd', value: 'â‚¹ 2,400,000', probability: 40 },
        { id: 'deal-3', name: 'Beer Clarifier Trial Run', company: 'United Breweries Group', value: 'â‚¹ 950,000', probability: 60 },
      ]
    },
    proposal: {
      title: 'Proposal & Quote',
      deals: [
        { id: 'deal-4', name: 'Veg Gummy Jelly Stabilizer PO', company: 'Delish Confectionery', value: 'â‚¹ 3,500,000', probability: 80 }
      ]
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Commercial Sales Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Track customer trial conversions and weighted pipeline forecasting.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Opportunity</span>
        </Button>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(columns).map(([colId, col]) => (
          <div key={colId} className="bg-slate-50 border border-border/80 rounded-xl p-4 flex flex-col space-y-3 min-h-[450px]">
            <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-1">
              <span className="font-semibold text-sm text-slate-800 font-display">{col.title}</span>
              <Badge variant="secondary" className="h-5">{col.deals.length}</Badge>
            </div>

            <div className="space-y-3 overflow-y-auto">
              {col.deals.map(deal => (
                <Card key={deal.id} className="hover:shadow-md transition-shadow duration-200 border-border/60">
                  <CardHeader className="p-4 pb-2">
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">{deal.company}</span>
                    <CardTitle className="text-sm font-bold mt-1 text-slate-800">{deal.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">{deal.value}</span>
                      <Badge className="h-4.5 text-[10px]" variant="outline">{deal.probability}% Prob</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
