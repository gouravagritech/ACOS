'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Search, Database, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'

interface StockLevel {
  id: string
  item: string
  category: 'raw_material' | 'finished_goods'
  qty: string
  minQty: string
  location: string
}

export default function InventoryPage() {
  const [query, setQuery] = useState('')
  const [stocks] = useState<StockLevel[]>([
    { id: 'stk-1', item: 'Dry Eucheuma cottonii Seaweed', category: 'raw_material', qty: '42 Tons', minQty: '50 Tons', location: 'Warehouse A (Raw)' },
    { id: 'stk-2', item: 'Dry Eucheuma spinosum Seaweed', category: 'raw_material', qty: '65 Tons', minQty: '30 Tons', location: 'Warehouse A (Raw)' },
    { id: 'stk-3', item: 'AquaCol K-100 Refined Powder', category: 'finished_goods', qty: '12 Tons', minQty: '5 Tons', location: 'Warehouse B (Dry)' }
  ])

  const filtered = stocks.filter(s => s.item.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Seaweed & Ingredient Inventories</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor dry seaweed crop lot weights, refined hydrocolloids finished goods, and minimum reorder triggers.</p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search ingredient or material..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(s => {
          const isLow = parseFloat(s.qty) < parseFloat(s.minQty)
          return (
            <Card key={s.id} className="hover:shadow-glass transition-shadow border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant={s.category === 'raw_material' ? 'outline' : 'default'} className="capitalize">
                    {s.category.replace('_', ' ')}
                  </Badge>
                  {isLow && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Low Stock Alert</span>
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-bold mt-2 font-display text-slate-800">{s.item}</CardTitle>
                <CardDescription className="text-xs">{s.location}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className={`font-semibold ${isLow ? 'text-coral-600' : 'text-slate-800'}`}>{s.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reorder Level:</span>
                  <span className="font-semibold text-slate-800">{s.minQty}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
