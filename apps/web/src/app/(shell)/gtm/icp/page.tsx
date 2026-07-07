'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Target, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ICPBuilderPage() {
  const [minVolume, setMinVolume] = useState('10') // Tons
  const [industry, setIndustry] = useState('dairy')
  const [location, setLocation] = useState('IN')
  const [score, setScore] = useState<number | null>(null)

  const handleBuild = () => {
    const vol = parseFloat(minVolume)
    let s = 50
    if (vol >= 10) s += 20
    if (vol >= 50) s += 10
    if (industry === 'dairy') s += 15
    if (location === 'IN') s += 5

    setScore(s)
    toast.success('ICP match score calculated successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Ideal Customer Profile (ICP) Builder</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure parameters to calculate score thresholds for incoming marketplace leads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Target className="h-4.5 w-4.5 text-primary-600" />
              <span>Configure ICP parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Min Annual Volume (Tons)</label>
              <Input type="number" value={minVolume} onChange={(e) => setMinVolume(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Industry Vertical</label>
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm outline-none focus:border-primary-500"
              >
                <option value="dairy">Dairy Products / Ice Cream</option>
                <option value="confectionery">Confectionery (Gummies / Jelly)</option>
                <option value="brewery">Brewery Fining</option>
                <option value="petfood">Pet Food stabilization</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">Geographic Location</label>
              <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="IN" />
            </div>
            <Button onClick={handleBuild} className="w-full mt-4 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Calculate ICP Score Target</span>
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[250px] flex flex-col justify-between shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">ICP Scoring Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {score ? (
                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-2xs font-semibold text-muted-foreground uppercase">Calculated Target Match Score</span>
                    <Badge variant={score > 75 ? 'success' : 'secondary'} className="text-lg font-bold font-display py-1 px-3">
                      {score} / 100
                    </Badge>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-accent-100 bg-accent-50/20 text-accent-950 flex gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0" />
                    <p className="font-sans leading-relaxed">
                      A target score of **{score}** places this configuration profile in the **{score > 75 ? 'Strategic High-priority' : 'Standard'}** lead qualification pipeline.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Target className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-slate-600">ICP Profile not compiled</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Fill in target requirements on the left to review match threshold models.
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
