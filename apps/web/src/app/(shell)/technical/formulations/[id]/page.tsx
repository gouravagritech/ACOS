'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, Sliders, Play, Calculator } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function FormulationDetailPage() {
  const params = useParams()
  const formulationId = params.id as string

  // Scaling factor
  const [scale, setScale] = useState('100') // kgs
  const [ingredients, setIngredients] = useState([
    { name: 'Refined Semi-refined Kappa (Acol-K100)', pct: 45, unitCost: 280 },
    { name: 'Refined Iota Carrageenan (Acol-I80)', pct: 15, unitCost: 340 },
    { name: 'Potassium Chloride (KCl)', pct: 10, unitCost: 65 },
    { name: 'Standard Food Dextrose filler', pct: 30, unitCost: 40 }
  ])

  const factor = parseFloat(scale) / 100
  const totalCost = ingredients.reduce((sum, item) => sum + (item.pct * (item.unitCost / 100)), 0)

  const handleSave = () => {
    toast.success('Formulation recipe scaling and modifications saved as v4 draft!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/technical/formulations">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-800">Stabilizer Blend for Chocolate Milk</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Active Version: v4 · ID: {formulationId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ingredient math builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4 flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-sm font-semibold">Ingredient Recipe Matrix</CardTitle>
                <CardDescription>Recipe percentages must sum strictly to 100%.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Total Cost:</span>
                <span className="text-sm font-bold text-slate-800">₹ {totalCost.toFixed(2)} / kg</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Ingredient</th>
                      <th className="px-6 py-3 font-semibold">Composition %</th>
                      <th className="px-6 py-3 font-semibold">Calculated weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {ingredients.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                        <td className="px-6 py-4 font-mono">{item.pct}%</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{(item.pct * factor).toFixed(2)} Kgs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scaling and Actions sidebar panel */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Calculator className="h-4.5 w-4.5 text-primary-600" />
                <span>Scaling controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase">Target Batch Scale (Kgs)</label>
                <Input 
                  type="number" 
                  value={scale} 
                  onChange={(e) => setScale(e.target.value)} 
                />
              </div>
              <Button onClick={handleSave} className="w-full mt-4">Save recipe modifications</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
