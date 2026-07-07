'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Sparkles, Database, FileText, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

interface SearchResult {
  id: string
  title: string
  source: string
  score: number
  summary: string
}

export default function SemanticSearchPage() {
  const [query, setQuery] = useState('Which formulations generated the highest repeat orders?')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setResults([
        { id: 'res-1', title: 'Stabilizer Blend for Chocolate Milk (v4)', source: 'Formulation Studio', score: 0.94, summary: 'Highly optimized Kappa/Iota blend approved for Britannia Industries. Re-ordered 3 times in Q2.' },
        { id: 'res-2', title: 'Viscosity Alignment Meeting Notes', source: 'CRM Meetings', score: 0.88, summary: 'Meeting with Dr. Vivek Nair. Aligned on target ash content specs for chocolate milk suspension batches.' }
      ])
      setIsSearching(false)
      toast.success('Semantic search query processed!')
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">Semantic Search & RAG</h1>
        <p className="text-sm text-muted-foreground mt-1">Search the entire ACOS Knowledge Graph, documents, and database entries using natural language.</p>
      </div>

      <div className="flex gap-3 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-muted-foreground" />
          <Input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            placeholder="Type your natural language query..."
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching} className="flex items-center gap-1.5 shrink-0">
          <Sparkles className="h-4.5 w-4.5" />
          <span>{isSearching ? 'Searching...' : 'Search'}</span>
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(r => (
            <Card key={r.id} className="border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {r.source}
                  </Badge>
                  <span className="text-2xs font-semibold text-muted-foreground">Cosine Similarity Score:</span>
                  <Badge variant="success" className="text-[10px]">
                    {(r.score * 100).toFixed(0)}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  {r.title}
                  <ArrowRight className="h-3.5 w-3.5 text-primary-600" />
                </h4>
                <p className="text-slate-600 leading-relaxed italic">
                  "{r.summary}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
