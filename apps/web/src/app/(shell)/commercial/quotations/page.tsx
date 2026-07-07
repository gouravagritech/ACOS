'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'
import { Calculator, Send, AlertCircle, Sparkles, FileDown } from 'lucide-react'

export default function QuotationsPage() {
  // Quotation parameters
  const [productGrade, setProductGrade] = useState('kappa-carr')
  const [quantity, setQuantity] = useState('5000') // kgs
  const [targetPrice, setTargetPrice] = useState('320') // INR/kg
  const [isExport, setIsExport] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [quoteOutput, setQuoteOutput] = useState<any | null>(null)

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const q = parseFloat(quantity)
      const tp = parseFloat(targetPrice)
      const baseCost = productGrade === 'kappa-carr' ? 280 : 340
      const totalCost = baseCost * q
      const margin = ((tp - baseCost) / tp) * 100

      setQuoteOutput({
        totalCost: totalCost.toLocaleString('en-IN', { style: 'currency', currency: isExport ? 'USD' : 'INR' }),
        margin: margin.toFixed(2),
        isApproved: margin >= 12,
        notes: margin >= 12 
          ? 'Quotation meets standard margin policy. Ready for dispatch.' 
          : 'Warning: Margin below standard approval policy threshold (12%). Approval required by CCO / VP Sales.'
      })
      setIsCalculating(false)
      toast.success('Pricing calculations completed!')
    }, 1000)
  }

  const handleSend = () => {
    toast.success('Quotation draft dispatched to CCO approval queue!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Viscosity & Gelling Quotation Builder</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Perform domestic and export quotation pricing calculations with automated margin verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Parameters panel */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Calculator className="h-4.5 w-4.5 text-primary-600" />
                <span>Quotation Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              
              {/* Product grade */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Product Grade</label>
                <select 
                  value={productGrade}
                  onChange={(e) => setProductGrade(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm text-foreground outline-none focus:border-primary-500"
                >
                  <option value="kappa-carr">AquaCol K-100 (Kappa Carrageenan)</option>
                  <option value="iota-carr">AquaCol I-80 (Iota Carrageenan)</option>
                </select>
              </div>

              {/* Quantity input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Quantity (Kgs)</label>
                <Input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Target Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Target Price (per Kg)</label>
                <Input 
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
              </div>

              {/* Export switch toggle */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={isExport}
                  onChange={(e) => setIsExport(e.target.checked)}
                  id="export-switch"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="export-switch" className="text-xs font-semibold text-slate-700 uppercase">Export Quotation (USD)</label>
              </div>

              {/* Action trigger button */}
              <Button 
                onClick={handleCalculate}
                disabled={isCalculating}
                className="w-full mt-4 flex items-center justify-center gap-2"
              >
                {isCalculating ? 'Calculating...' : 'Run Pricing calculations'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Preview workspace */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[300px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Quotation Worksheet Output</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {quoteOutput ? (
                <div className="space-y-6 flex-1">
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100 pb-6">
                    <div>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase">Estimated Value</span>
                      <span className="text-xl font-bold text-slate-800 font-display block mt-1">{quoteOutput.totalCost}</span>
                    </div>
                    <div>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase">Estimated Margin</span>
                      <span className={`text-xl font-bold font-display block mt-1 ${quoteOutput.isApproved ? 'text-accent-600' : 'text-coral-600'}`}>
                        {quoteOutput.margin}%
                      </span>
                    </div>
                    <div>
                      <span className="text-2xs font-semibold text-muted-foreground uppercase">Approval Code</span>
                      <span className="mt-1 block">
                        <Badge variant={quoteOutput.isApproved ? 'success' : 'destructive'} className="font-display">
                          {quoteOutput.isApproved ? 'Standard' : 'Escalated'}
                        </Badge>
                      </span>
                    </div>
                  </div>

                  {/* Notes & guidelines warnings alerts */}
                  <div className={`p-4 rounded-xl border flex gap-3 text-sm ${
                    quoteOutput.isApproved 
                      ? 'border-accent-100 bg-accent-50/20 text-accent-950' 
                      : 'border-coral-100 bg-coral-50/20 text-coral-950'
                  }`}>
                    <AlertCircle className={`h-5 w-5 shrink-0 ${quoteOutput.isApproved ? 'text-accent-600' : 'text-coral-600'}`} />
                    <p className="font-sans leading-relaxed">{quoteOutput.notes}</p>
                  </div>

                  <div className="flex gap-3 justify-end mt-4">
                    <Button variant="outline" className="flex items-center gap-2 text-xs">
                      <FileDown className="h-4 w-4" />
                      <span>Download PDF</span>
                    </Button>
                    <Button onClick={handleSend} className="flex items-center gap-2 text-xs">
                      <Send className="h-4 w-4" />
                      <span>Dispatch for Approval</span>
                    </Button>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Calculator className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">Calculations not started</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Fill in target quantities and pricing on the left to review margins and generate PDF documents.
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
