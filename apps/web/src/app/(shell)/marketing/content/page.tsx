'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  Sparkles, Search, Plus, Calendar, FileText, Send, 
  BarChart3, Globe, Share2, AlertCircle, Settings, CheckCircle2 
} from 'lucide-react'
import { toast } from 'sonner'

interface ContentAsset {
  id: string
  title: string
  type: string
  status: 'draft' | 'scheduled' | 'published'
  productLink: string
  seoScore: number
  clicks: number
  scheduledFor?: string
}

export default function MarketingContentPage() {
  const [query, setQuery] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<ContentAsset | null>(null)
  
  // Studio variables
  const [assetType, setAssetType] = useState('linkedin')
  const [productGrade, setProductGrade] = useState('kappa-food')
  const [audienceTone, setAudienceTone] = useState('technical')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState('')
  const [seoKeywords, setSeoKeywords] = useState('carrageenan stabilizer, dairy biopolymer, gel strength')

  const [assets, setAssets] = useState<ContentAsset[]>([
    { id: '1', title: 'Viscosity Controls in Chocolate Milk Stabilizers', type: 'Technical Article', status: 'published', productLink: 'AquaCol K-100', seoScore: 92, clicks: 1240 },
    { id: '2', title: 'Why Kappa Carrageenan Delivers Superior Water Binding in Poultry Processing', type: 'LinkedIn Post', status: 'scheduled', productLink: 'AquaCol M-25', seoScore: 88, clicks: 0, scheduledFor: '2026-07-10 10:00 IST' },
    { id: '3', title: 'Gummy Jelly Formulations: Clean Label Vegan Solutions', type: 'Blog Post', status: 'draft', productLink: 'AquaCol I-80', seoScore: 78, clicks: 0 },
  ])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      let output = ''
      if (assetType === 'linkedin') {
        output = `ðŸŒŠ **Optimizing Dairy Stabilizers: The Science of Carrageenan Interactions**\n\nViscosity separation in milk-based beverages remains a critical processing hurdle. At Aqua Colloids, our application lab has mapped how Kappa Carrageenan bonds with casein micelles to prevent phase separation.\n\nðŸ§ª **Key takeaway:** A concentration of just 0.02% maintains stable cocoa suspension without excessive thickening.\n\nRead the full formulation guide below. ðŸ‘‡\n\n#Hydrocolloids #FoodScience #DairyStabilization #Carrageenan #CleanLabel`
      } else if (assetType === 'article') {
        output = `# Technical Bulletin: Carrageenan Gelation Mechanics in Plant-Based Gummy Candy\n\n**Abstract:** Gelation behavior of Iota and Kappa biopolymers when combined with sugar-syrup formulations. The synergy optimizes melting profiles while maintaining structural integrity during summer transit.\n\n## 1. Viscosity Profile\nGelation occurs rapidly below 40Â°C. Enforcing standard FSSAI testing requirements assures absolute compliance...\n\n## 2. Recommendation\nFor direct vegan alternatives, utilize standard ratios of 1:1 Kappa-to-Iota blending...`
      } else {
        output = `Subject: Quick Guide: Solving Syneresis in Yogurt & Cheese Formulations\n\nDear Partner,\n\nPreventing whey separation (syneresis) is essential for maintaining premium product mouthfeel. Aqua Colloids' custom biopolymer blends create a uniform network that locks in moisture during temperature fluctuations.\n\nReply to this email to request a free sample pack for application testing.`
      }

      setGeneratedResult(output)
      setIsGenerating(false)
      toast.success('AI Content generated successfully!')
    }, 1500)
  }

  const handlePublish = () => {
    toast.success('Asset scheduled for publishing!')
    setAssets(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        title: `AI Generated ${assetType === 'linkedin' ? 'LinkedIn Post' : 'Marketing Campaign'} - ${productGrade}`,
        type: assetType === 'linkedin' ? 'LinkedIn Post' : 'Technical Guide',
        status: 'scheduled',
        productLink: productGrade === 'kappa-food' ? 'AquaCol K-100' : 'AquaCol I-80',
        seoScore: 85,
        clicks: 0,
        scheduledFor: '2026-07-08 14:00 IST'
      }
    ])
    setGeneratedResult('')
  }

  return (
    <div className="space-y-6">
      {/* Header Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">AI Content Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Convert complex hydrocolloid research and formulation data into targeted marketing assets.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Content Calendar</span>
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Editor Generator Control panel */}
        <div className="space-y-6">
          <Card className="shadow-glass border border-border">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-primary-600" />
                <span>AI Content Studio</span>
              </CardTitle>
              <CardDescription>Configure parameters for AI generation</CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              
              {/* Asset Type selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Asset Channel</label>
                <select 
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm text-foreground outline-none focus:border-primary-500"
                >
                  <option value="linkedin">LinkedIn Post</option>
                  <option value="article">Technical Article</option>
                  <option value="email">Email Campaign</option>
                </select>
              </div>

              {/* Product Linkage selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Product Linkage</label>
                <select 
                  value={productGrade}
                  onChange={(e) => setProductGrade(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm text-foreground outline-none focus:border-primary-500"
                >
                  <option value="kappa-food">AquaCol K-100 (Kappa Carrageenan)</option>
                  <option value="iota-dairy">AquaCol I-80 (Iota Carrageenan)</option>
                  <option value="brew-clear">AquaClear Beer Clarifier</option>
                </select>
              </div>

              {/* Persona selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Audience Persona</label>
                <select 
                  value={audienceTone}
                  onChange={(e) => setAudienceTone(e.target.value)}
                  className="w-full bg-background border border-input rounded-lg py-2 px-3 text-sm text-foreground outline-none focus:border-primary-500"
                >
                  <option value="technical">Food Scientist / R&D Manager</option>
                  <option value="executive">Procurement / plant C-Suite</option>
                  <option value="distributor">Channel Partner / Distributor</option>
                </select>
              </div>

              {/* SEO Target Keywords */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Target SEO Keywords</label>
                <Input 
                  type="text" 
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="text-xs bg-muted/30"
                />
              </div>

              {/* Generate button */}
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full mt-4 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Asset</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Col 2: Interactive Preview Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[400px] flex flex-col shadow-glass">
            <CardHeader className="bg-slate-50/50 border-b border-border p-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Workspace Preview</CardTitle>
                <CardDescription>Verify and optimize your brand asset copy</CardDescription>
              </div>
              {generatedResult && (
                <div className="flex gap-2">
                  <Badge variant="success" className="h-5 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>SEO Score: 94</span>
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              {generatedResult ? (
                <div className="space-y-4 flex-1">
                  <textarea 
                    value={generatedResult}
                    onChange={(e) => setGeneratedResult(e.target.value)}
                    className="w-full h-80 bg-slate-50 border border-input rounded-xl p-4 text-sm font-sans text-slate-800 outline-none focus:border-primary-500 focus:bg-background transition-colors resize-none"
                  />
                  
                  <div className="flex justify-between items-center bg-slate-50 rounded-lg p-3 border border-border/80">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Globe className="h-4 w-4 text-primary-600" />
                      <span>Linked Knowledge Graph: **Dairy micelle interactions**</span>
                    </div>
                    <Button onClick={handlePublish} size="sm" className="flex items-center gap-2">
                      <Send className="h-3.5 w-3.5" />
                      <span>Schedule & Publish</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground/30 animate-pulse mb-3" />
                  <p className="text-sm font-medium text-slate-600">Your AI Workspace is empty</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    Select a channel and product grade on the left, then click Generate to create your first content draft.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Row 2: Central Assets Library */}
      <Card className="shadow-glass border border-border mt-6">
        <CardHeader className="bg-slate-50/50 border-b border-border p-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4.5 w-4.5 text-primary-600" />
            <span>Content Library Archive</span>
          </CardTitle>
          <CardDescription>Search and monitor performance of all generated assets</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Search className="h-4.5 w-4.5 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search library..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/60 text-slate-700 text-xs uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Linked Grade</th>
                  <th className="px-6 py-3 font-semibold">SEO</th>
                  <th className="px-6 py-3 font-semibold">Clicks/Views</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {assets.filter(asset => asset.title.toLowerCase().includes(query.toLowerCase())).map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{asset.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{asset.type}</td>
                    <td className="px-6 py-4 font-mono text-xs">{asset.productLink}</td>
                    <td className="px-6 py-4">
                      <Badge variant={asset.seoScore > 85 ? 'success' : 'secondary'} className="h-5">
                        {asset.seoScore}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{asset.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge variant={asset.status === 'published' ? 'default' : 'outline'} className="capitalize h-5">
                        {asset.status}
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
import { Loader2 } from 'lucide-react'
