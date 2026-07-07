'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Calculator, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ROICalculatorPage() {
  const [competitorPrice, setCompetitorPrice] = useState('380') // INR/kg
  const [ourPrice, setOurPrice] = useState('320') // INR/kg
  const [usageVolume, setUsageVolume] = useState('10000') // kgs/year
  const [result, setResult] = useState<any | null>(null)

  const handleCalculate = () => {
    const compP = parseFloat(competitorPrice)
    const ourP = parseFloat(ourPrice)
    const vol = parseFloat(usageVolume)

    const savingsPerKg = compP - ourP
    const annualSavings = savingsPerKg * vol

    setResult({
      savingsPerKg: savingsPerKg.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      annualSavings: annualSavings.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      marginPercentage: ((savingsPerKg / compP) * 100).toFixed(1)
    })
    toast.success('ROI savings calculated!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">B2B Cost Saving ROI Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Perform pricing comparison audits comparing competitor prices against Aqua Colloids biopolymers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Calculator className="h-4.5 w-4.5 text-primary-600" />
              <span>ROI Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Competitor price (per Kg)</label>
              <Input type="number" value={competitorPrice} onChange={(e) => setCompetitorPrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Aqua Colloids price (per Kg)</label>
              <Input type="number" value={ourPrice} onChange={(e) => setOurPrice(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Annual Volume (Kgs)</label>
              <Input type="number" value={usageVolume} onChange={(e) => setUsageVolume(e.target.value)} />
            </div>
            <Button onClick={handleCalculate} className="w-full mt-4">Calculate Savings</Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[250px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Savings summary worksheet</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {result ? (
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 pb-6">
                    <div>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase">Savings per Kg</span>
                      <span className="text-xl font-bold text-accent-600 font-display block mt-1">{result.savingsPerKg}</span>
                    </div>
                    <div>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase">Annual Saved Cost</span>
                      <span className="text-xl font-bold text-primary-600 font-display block mt-1">{result.annualSavings}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-accent-100 bg-accent-50/20 text-accent-950 flex gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0" />
                    <p className="font-sans leading-relaxed">
                      Switching to Aqua Colloids delivers a **{result.marginPercentage}% cost saving** on biopolymer stabilizers. Viscosity specs matched.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Calculator className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">Savings audit not run</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Calculate comparison pricing to generate savings charts for pitches.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
