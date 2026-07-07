'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Search, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface SEOKeyword {
  keyword: string
  volume: string
  difficulty: string
  status: 'optimized' | 'pending'
}

export default function SEOPage() {
  const [query, setQuery] = useState('')
  const [keywords] = useState<SEOKeyword[]>([
    { keyword: 'carrageenan stabilizer dairy food', volume: '1,400/mo', difficulty: 'Low', status: 'optimized' },
    { keyword: 'vegan gummy gelling agents', volume: '850/mo', difficulty: 'Medium', status: 'pending' },
    { keyword: 'beer wort fining agent supplier', volume: '320/mo', difficulty: 'Low', status: 'optimized' }
  ])

  const filtered = keywords.filter(k => k.keyword.toLowerCase().includes(query.toLowerCase()))

  const handleOptimize = (kw: string) => {
    toast.success(`SEO & GEO structured meta-tags compiled for target: ${kw}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">SEO & GEO Optimization Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">Perform search keywords audit, build topic clusters, and construct AI search engine optimized schema markup tags.</p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search keyword target..."
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
                  <th className="px-6 py-3 font-semibold">Target Search Keyword</th>
                  <th className="px-6 py-3 font-semibold">Search Volume</th>
                  <th className="px-6 py-3 font-semibold">Ranking Difficulty</th>
                  <th className="px-6 py-3 font-semibold">Attribution Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((k, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{k.keyword}</td>
                    <td className="px-6 py-4 font-mono text-xs">{k.volume}</td>
                    <td className="px-6 py-4">{k.difficulty}</td>
                    <td className="px-6 py-4">
                      <Badge variant={k.status === 'optimized' ? 'success' : 'secondary'} className="capitalize">
                        {k.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button onClick={() => handleOptimize(k.keyword)} size="sm" variant="outline" className="text-2xs flex items-center gap-1 ml-auto">
                        <Sparkles className="h-3 w-3" />
                        <span>Build Schema Meta</span>
                      </Button>
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
