'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Plus, Database, CheckCircle2 } from 'lucide-react'

interface ProductionBatch {
  id: string
  batchNo: string
  productCode: string
  qty: string
  mfgDate: string
  status: 'passed_qc' | 'pending_qc' | 'failed_qc'
}

export default function LabBatchesPage() {
  const [query, setQuery] = useState('')
  const [batches] = useState<ProductionBatch[]>([
    { id: 'bat-1', batchNo: 'BK-401', productCode: 'AquaCol K-100', qty: '1,200 kg', mfgDate: '2026-07-02', status: 'passed_qc' },
    { id: 'bat-2', batchNo: 'BI-202', productCode: 'AquaCol I-80', qty: '800 kg', mfgDate: '2026-06-28', status: 'failed_qc' },
    { id: 'bat-3', batchNo: 'BK-402', productCode: 'AquaCol K-100', qty: '1,500 kg', mfgDate: '2026-07-05', status: 'pending_qc' }
  ])

  const filtered = batches.filter(b => b.batchNo.toLowerCase().includes(query.toLowerCase()) || b.productCode.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Manufacturing Batch Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">Review factory batch outputs, quantities, manufacturing dates, and quality status.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Log Batch Run</span>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search batch number, grade SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="shadow-sm border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Batch Number</th>
                  <th className="px-6 py-3 font-semibold">Product Grade</th>
                  <th className="px-6 py-3 font-semibold">Batch Quantity</th>
                  <th className="px-6 py-3 font-semibold">Mfg Date</th>
                  <th className="px-6 py-3 font-semibold">QC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900">{b.batchNo}</td>
                    <td className="px-6 py-4 text-slate-700">{b.productCode}</td>
                    <td className="px-6 py-4 text-muted-foreground">{b.qty}</td>
                    <td className="px-6 py-4 font-mono text-xs">{b.mfgDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant={b.status === 'passed_qc' ? 'success' : b.status === 'failed_qc' ? 'destructive' : 'secondary'} className="capitalize">
                        {b.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
