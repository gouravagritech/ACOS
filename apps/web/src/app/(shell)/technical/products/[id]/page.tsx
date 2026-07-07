'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowLeft, Award, Shield, FileText, CheckCircle2, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  const product = {
    sku: 'AQUACOL-K100',
    name: 'AquaCol K-100',
    type: 'Refined Semi-refined Kappa Carrageenan',
    gelStrength: '900 g/cm² (1.5% Sol, 20°C)',
    viscosity: '24 cps (1.5% Sol, 75°C)',
    regulatory: 'Complies with FSSAI, US FDA 21 CFR, and EU Directives.',
    description: 'AquaCol K-100 is a standard gelling agent isolated from seaweed crops. Forms strong, rigid gels in potassium ions environments. Extensively utilized in dairy gelation and meat binding applications.',
    specs: [
      { param: 'Moisture content', expected: '< 12%', status: 'Compliant' },
      { param: 'Insoluble matter', expected: '< 2.0%', status: 'Compliant' },
      { param: 'Total Heavy Metals', expected: '< 20 ppm', status: 'Compliant' }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/technical/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-display text-slate-800">{product.name}</h1>
            <span className="font-mono text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
              {product.sku}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Category: {product.type} · ID: {productId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Technical Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
              <p>{product.description}</p>
              <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-3 mt-4">
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Gel Strength Spec</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{product.gelStrength}</span>
                </div>
                <div>
                  <span className="text-3xs uppercase font-semibold tracking-wider text-muted-foreground block">Viscosity Spec</span>
                  <span className="font-semibold text-slate-800 mt-1 block">{product.viscosity}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b border-border p-4">
              <CardTitle className="text-sm font-semibold">Analytical QC Limits</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Analytical Parameter</th>
                      <th className="px-6 py-3 font-semibold">Threshold expected</th>
                      <th className="px-6 py-3 font-semibold">Verification status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {product.specs.map((s, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 font-medium text-slate-800">{s.param}</td>
                        <td className="px-6 py-4 font-mono text-xs">{s.expected}</td>
                        <td className="px-6 py-4">
                          <Badge variant="success" className="h-5">{s.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-accent-100 bg-accent-50/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-accent-900 flex items-center gap-1.5">
                <Shield className="h-4.5 w-4.5 text-accent-600" />
                <span>Regulatory Approvals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-accent-950 leading-relaxed font-sans">
              <p>{product.regulatory}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
