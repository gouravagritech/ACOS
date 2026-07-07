'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ShieldCheck, Check } from 'lucide-react'

interface RolePermission {
  roleName: string
  description: string
  permissions: string[]
}

export default function RolesPage() {
  const [roles] = useState<RolePermission[]>([
    { roleName: 'lab_technician', description: 'Log analytical test outcomes and moisture levels.', permissions: ['read_products', 'create_lab_tests'] },
    { roleName: 'quality_manager', description: 'Approve and sign off Certificates of Analysis (COA).', permissions: ['read_products', 'create_lab_tests', 'release_coa', 'resolve_deviations'] },
    { roleName: 'sales_rep', description: 'Configure quotes and propose formulations to prospects.', permissions: ['read_products', 'create_proposals', 'create_quotations'] }
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Role-Based Access Control (RBAC)</h1>
        <p className="text-sm text-muted-foreground mt-1">Audit security scopes, default organizational roles, and permitted API permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((r, idx) => (
          <Card key={idx} className="hover:shadow-glass transition-shadow border-border">
            <CardHeader className="pb-2 bg-slate-50/50 border-b border-border p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-800 font-display flex items-center gap-1">
                  <ShieldCheck className="h-4.5 w-4.5 text-primary-600" />
                  {r.roleName}
                </CardTitle>
                <CardDescription className="text-3xs mt-0.5">{r.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs pt-3">
              <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block mb-2">Granted Scopes</span>
              {r.permissions.map((p, pIdx) => (
                <div key={pIdx} className="flex items-center gap-1.5 font-mono text-2xs text-slate-700 bg-slate-50 border border-slate-100 p-1.5 rounded">
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                  {p}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
