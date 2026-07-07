'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Building2, Save, Globe } from 'lucide-react'
import { toast } from 'sonner'

export default function OrganizationPage() {
  const [orgName, setOrgName] = useState('Aqua Colloids India Ltd')
  const [currency, setCurrency] = useState('INR')
  const [timezone, setTimezone] = useState('UTC+5:30')

  const handleSave = () => {
    toast.success('Organization tenant settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Organization Tenant Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure company profiles, multi-country default currencies, and branding parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-border p-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Building2 className="h-4.5 w-4.5 text-primary-600" />
                <span>Tenant Configuration</span>
              </CardTitle>
            </div>
            <Badge variant="default" className="text-[10px]">Multi-Tenancy Active</Badge>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 uppercase">Organization name</label>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            </div>
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 uppercase">Default Base Currency</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-background border border-input rounded-lg py-2 px-3 outline-none focus:border-primary-500"
              >
                <option value="INR">Indian Rupee (INR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-slate-700 uppercase">Timezone localization</label>
              <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>
            <div className="flex justify-end pt-3">
              <Button onClick={handleSave} className="flex items-center gap-1.5 text-xs">
                <Save className="h-4 w-4" />
                <span>Save configurations</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
