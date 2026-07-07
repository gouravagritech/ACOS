'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  Sparkles, TrendingUp, ShieldAlert, Award, FileDown, Activity, 
  Brain, CheckCircle2, AlertTriangle, Play, Check, Send, 
  Link2, Trash2, ArrowRight, Zap, RefreshCw, BarChart3, 
  Map, FileText, Database, Shield, ZapOff, Briefcase
} from 'lucide-react'
import { toast } from 'sonner'

// Type declarations
interface PriorityItem {
  id: string
  text: string
  completed: boolean
  impact: 'High' | 'Medium' | 'Low'
}

interface RiskItem {
  category: string
  description: string
  severity: 'Critical' | 'High' | 'Medium'
}

interface GraphNode {
  id: string
  label: string
  type: 'Customer' | 'Product' | 'Formula' | 'Trial' | 'Revenue'
  x: number
  y: number
}

interface GraphLink {
  source: string
  target: string
}

export default function ExecutiveDashboard() {
  // 1. Workspaces System
  const workspaces = [
    { id: 'ceo', name: 'CEO Workspace', icon: Shield, desc: 'Founder strategic HUD & cross-department command' },
    { id: 'sales', name: 'Sales Workspace', icon: TrendingUp, desc: 'CRM conversion, leads inbox, and GTM pipelines' },
    { id: 'technical', name: 'Technical Workspace', icon: Award, desc: 'Carrageenan grades library & application matrix' },
    { id: 'formulation', name: 'Formulation Workspace', icon: Database, desc: 'Costing engine, stability logs, and version control' },
    { id: 'manufacturing', name: 'Manufacturing Workspace', icon: Activity, desc: 'Batch schedules, OEE logs, and processing notes' },
    { id: 'quality', name: 'Quality Workspace', icon: ShieldAlert, desc: 'COA scanning, lab specs verification, and CAPA logs' },
    { id: 'research', name: 'Research Workspace', icon: Brain, desc: 'PhD projects, evolution map, and citation graph' },
    { id: 'personal', name: 'Personal Workspace', icon: Zap, desc: 'Founder daily habits, exams prep, and learning logs' }
  ]
  const [activeWorkspace, setActiveWorkspace] = useState('ceo')

  // 2. Emergency Dashboard Mode
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)

  // 3. Priorities & Goals State
  const [priorities, setPriorities] = useState<PriorityItem[]>([
    { id: 'p1', text: 'Approve PO for Bali Seaweed shipment (42 Tons)', completed: false, impact: 'High' },
    { id: 'p2', text: 'Review failed gummies trial report from Heritage Foods', completed: false, impact: 'High' },
    { id: 'p3', text: 'Finalize presentation for PhD review committee', completed: true, impact: 'Medium' }
  ])
  const [newPriority, setNewPriority] = useState('')

  // 4. Daily Journal & Energy Score
  const [journal, setJournal] = useState('Refining chocolate milk stabilizer formulas today. Active communication with Gujarat Cooperative.')
  const [energyScore, setEnergyScore] = useState(85)

  // 5. AI everywhere & Multi-Agent orchestration
  const [aiQuery, setAiQuery] = useState('')
  const [aiOrchestration, setAiOrchestration] = useState<any>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [confidenceScore, setConfidenceScore] = useState(94)

  // 6. AI Natural Language Data Entry
  const [naturalInput, setNaturalInput] = useState('')
  const [isIngesting, setIsIngesting] = useState(false)

  // 7. Interactive Knowledge Graph
  const nodes: GraphNode[] = [
    { id: 'n1', label: 'Heritage Foods', type: 'Customer', x: 120, y: 150 },
    { id: 'n2', label: 'Chocolate Milk Stabilizer', type: 'Formula', x: 220, y: 100 },
    { id: 'n3', label: 'Kappa Refined Grade A', type: 'Product', x: 320, y: 150 },
    { id: 'n4', label: 'Chocolate Milk Trial #4', type: 'Trial', x: 220, y: 220 },
    { id: 'n5', label: '₹ 4.2M MTD Pipeline', type: 'Revenue', x: 420, y: 100 }
  ]
  const links: GraphLink[] = [
    { source: 'n1', target: 'n2' },
    { source: 'n2', target: 'n3' },
    { source: 'n4', target: 'n1' },
    { source: 'n4', target: 'n2' },
    { source: 'n3', target: 'n5' }
  ]
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  // 8. AI C-Suite Briefing compiling
  const [isBriefingLoading, setIsBriefingLoading] = useState(false)
  const [briefingText, setBriefingText] = useState(
    `## Weekly C-Suite Summary\n\n- **Revenue Pipeline:** Active pipeline stands at **₹ 12.4M** (+18% above target).\n- **Product Stability:** Gummies trial #8 failed viscosity test at 35°C; recommending Formulation Adjustment A-4.\n- **Inventory Alert:** Bali Seaweed crop levels are currently at **42T** (8T below threshold).`
  )

  const compileBriefing = () => {
    setIsBriefingLoading(true)
    setTimeout(() => {
      setBriefingText(
        `## Fresh Strategic Briefing - Compiled Just Now\n\n- **CEO Directive:** Prioritize the Heritage Foods chocolate milk stabilization trial.\n- **Sales Velocity:** 5 new seaweed grade samples dispatched. Lead response rate increased by 22%.\n- **Technical Insights:** Lab tests show Kappa Carrageenan batch QC-2026-98 meets UHT milk stability requirements.`
      )
      setIsBriefingLoading(false)
      toast.success('AI C-suite Briefing updated with live signals!')
    }, 1000)
  }

  // Handle Priorities
  const togglePriority = (id: string) => {
    setPriorities(priorities.map(p => p.id === id ? { ...p, completed: !p.completed } : p))
  }

  const addPriority = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPriority.trim()) return
    setPriorities([
      ...priorities,
      { id: Date.now().toString(), text: newPriority.trim(), completed: false, impact: 'High' }
    ])
    setNewPriority('')
    toast.success('Priority added to daily HUD!')
  }

  // Handle AI queries
  const askAquaAI = (queryText: string) => {
    if (!queryText.trim()) return
    setIsAiLoading(true)
    setAiOrchestration({
      step: 'init',
      text: 'Initializing Multi-Agent Orchestration...'
    })

    setTimeout(() => {
      setAiOrchestration({
        step: 'sales',
        text: 'Sales AI: Analyzing Heritage Foods customer history and pipeline value (₹ 4.2M MTD)...'
      })
    }, 600)

    setTimeout(() => {
      setAiOrchestration({
        step: 'technical',
        text: 'Technical AI: Fetching Kappa Refined Grade A characteristics and formulation notes...'
      })
    }, 1200)

    setTimeout(() => {
      setAiOrchestration({
        step: 'phd',
        text: 'PhD & Research AI: Checking literature database for synergism with Locust Bean Gum...'
      })
    }, 1800)

    setTimeout(() => {
      setAiOrchestration({
        step: 'done',
        text: 'CEO AI: Unified Recommendation compiled!',
        recommendation: `Based on unified agent signals, Heritage Foods chocolate milk formulation requires a **1.2% Kappa:Iota blend** with **0.4% LBG** to prevent syneresis at 4°C. Similar trials in 2025 achieved 98% stability.`,
        sources: ['Trial #4 Log', 'Carrageenan Encyclopedia Sec. 4.2', 'Gujarat Cooperative Case Study'],
        confidence: 96
      })
      setConfidenceScore(96)
      setIsAiLoading(false)
    }, 2500)
  }

  // Handle Natural Language Ingestion
  const ingestNaturalInput = () => {
    if (!naturalInput.trim()) return
    setIsIngesting(true)
    setTimeout(() => {
      toast.success('AI parsed input: Created 1 Customer, 1 Sample, and 1 Trial Follow-up!')
      setNaturalInput('')
      setIsIngesting(false)
      // Add a priority automatically
      setPriorities(prev => [
        ...prev,
        { id: Date.now().toString(), text: 'Review 500g AQUATHICK sample feedback from Heritage Foods', completed: false, impact: 'High' }
      ])
    }, 1500)
  }

  return (
    <div className={`space-y-6 transition-all duration-300 pb-16 ${isEmergencyMode ? 'bg-red-50/30 p-4 rounded-3xl border border-red-200' : ''}`}>
      
      {/* Upper Status Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">AC-EOS V1.0</span>
            <span className="text-2xs text-muted-foreground">Live Cloud Node</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 font-display">
            {isEmergencyMode ? '⚠️ EMERGENCY CONTROL ROOM' : 'Founder Command Center'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Running Aqua Colloids. Mobile-optimized, single-source-of-truth operating system.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Emergency Toggle */}
          <Button 
            variant={isEmergencyMode ? 'destructive' : 'outline'}
            onClick={() => {
              setIsEmergencyMode(!isEmergencyMode)
              toast(isEmergencyMode ? 'Deactivating Emergency HUD' : '🚨 EMERGENCY MODE ACTIVATED: Focus is now strictly on risk mitigation.')
            }}
            className="flex items-center gap-2 rounded-2xl shadow-sm text-xs font-semibold"
          >
            {isEmergencyMode ? <ZapOff className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
            <span>{isEmergencyMode ? 'Exit Emergency Mode' : 'Emergency View'}</span>
          </Button>

          <Button 
            onClick={compileBriefing} 
            disabled={isBriefingLoading} 
            className="flex items-center gap-2 rounded-2xl shadow-ocean bg-primary-600 hover:bg-primary-700 text-xs font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isBriefingLoading ? 'Syncing...' : 'Re-compile HUD'}</span>
          </Button>
        </div>
      </div>

      {/* 1. Workspace Switcher Tab Bar */}
      <div className="bg-white border border-border rounded-3xl p-1.5 shadow-sm overflow-x-auto scrollbar-none flex gap-1">
        {workspaces.map(ws => {
          const Icon = ws.icon
          const isActive = activeWorkspace === ws.id
          return (
            <button
              key={ws.id}
              onClick={() => {
                setActiveWorkspace(ws.id)
                toast(`Switched to ${ws.name}`)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{ws.name.split(' ')[0]}</span>
            </button>
          )}
        )}
      </div>

      {/* Emergency Mode Banner */}
      {isEmergencyMode && (
        <div className="bg-red-600 text-white rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg animate-pulse">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold text-sm uppercase tracking-wider">Operational Risk Action Required</span>
            </div>
            <p className="text-xs text-red-100 mt-1">
              Bali Seaweed inventory below minimum threshhold. 1 critical customer trial failed.
            </p>
          </div>
          <Button variant="outline" className="bg-white text-red-700 border-none hover:bg-red-50 text-xs font-bold rounded-xl">
            Review Shipments
          </Button>
        </div>
      )}

      {/* Active Workspace Info */}
      <div className="bg-slate-100/60 rounded-2xl p-4 border border-slate-200/50 flex items-center justify-between">
        <div>
          <span className="text-2xs font-semibold text-slate-500 uppercase tracking-widest">Active Scope</span>
          <h2 className="text-sm font-bold text-slate-800 mt-0.5">
            {workspaces.find(w => w.id === activeWorkspace)?.name}
          </h2>
          <p className="text-xs text-slate-500">
            {workspaces.find(w => w.id === activeWorkspace)?.desc}
          </p>
        </div>
        <Badge className="bg-primary-50 text-primary-700 hover:bg-primary-50 border border-primary-100 rounded-lg text-2xs">
          Fully Synced
        </Badge>
      </div>

      {/* Main Grid: Founder HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Priorities, Goals, Performance */}
        <div className="space-y-6">
          
          {/* Priorities Section */}
          <Card className="rounded-3xl border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary-600" />
                  <span>Today's Top Priorities</span>
                </CardTitle>
                <Badge variant="outline" className="rounded-lg text-2xs font-medium">
                  {priorities.filter(p => !p.completed).length} Remaining
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* List */}
              <div className="space-y-2">
                {priorities.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => togglePriority(p.id)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      p.completed 
                        ? 'bg-slate-50/50 border-slate-200/40 opacity-60' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                      p.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'
                    }`}>
                      {p.completed && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold leading-relaxed text-slate-800 ${p.completed ? 'line-through text-slate-400' : ''}`}>
                        {p.text}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-3xs px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          p.impact === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          Impact: {p.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add form */}
              <form onSubmit={addPriority} className="flex gap-2 mt-2">
                <input 
                  type="text"
                  placeholder="Add high-impact priority..."
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-slate-300 outline-none transition-all"
                />
                <Button type="submit" size="sm" className="rounded-xl px-3 bg-slate-900 text-white text-xs hover:bg-slate-800">
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Founder Performance Indicators */}
          <Card className="rounded-3xl border-border shadow-sm">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-orange-500" />
                <span>Founder Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>PhD Progress (Carrageenan Extraction)</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-primary-600 h-full rounded-full transition-all" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Government Exams Preparation</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: '45%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>LinkedIn Outreach Velocity</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Energy Score & Daily Journal */}
              <div className="pt-2 border-t border-border/50 space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span>Founder Energy Score</span>
                    <span className="text-primary-600 font-bold">{energyScore}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={energyScore}
                    onChange={(e) => setEnergyScore(parseInt(e.target.value))}
                    className="w-full accent-primary-600 mt-2"
                  />
                </div>

                <div>
                  <label className="text-2xs font-bold text-slate-500 uppercase tracking-widest">Daily Focus Journal</label>
                  <textarea
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full h-20 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 mt-1 outline-none resize-none focus:bg-white focus:border-slate-300 transition-all font-sans"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column: AI Briefing, Active Trials & Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI C-Suite Briefing Card */}
          <Card className="rounded-3xl border-border shadow-sm bg-gradient-to-tr from-white to-slate-50/50">
            <CardHeader className="pb-3 border-b border-border/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <CardTitle className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary-600" />
                  <span>Aqua AI Strategic Briefing</span>
                </CardTitle>
                <CardDescription className="text-2xs">Real-time C-suite rollup of pipelines, lab reports, and stock levels</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-1.5 text-2xs">
                  <FileDown className="h-3.5 w-3.5" />
                  <span>Briefing PDF</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-xs leading-relaxed space-y-2 relative overflow-hidden shadow-inner">
                {/* Visual grid lines for terminal look */}
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                <div className="flex items-center gap-2 text-slate-400 mb-2 pb-2 border-b border-white/10">
                  <Activity className="h-4 w-4 text-primary-500 animate-pulse" />
                  <span className="text-3xs uppercase tracking-widest font-bold">AQUA-AI COMPILER ACTIVE</span>
                </div>
                
                {/* Render the briefing markdown snippet */}
                <div className="space-y-3 whitespace-pre-line text-slate-200">
                  {briefingText}
                </div>
              </div>

              {/* Ingestion Engine / AI Command Input */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4.5 w-4.5 text-primary-600" />
                  <h4 className="text-xs font-bold text-slate-800">AI Continuous Data Entry & Ingest</h4>
                </div>
                <p className="text-3xs text-slate-500">
                  Type any natural language commercial update to auto-generate customers, samples, trials, or actions instantly.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Sent 500g AQUATHICK sample to Heritage Foods for chocolate milk trial"
                    value={naturalInput}
                    onChange={(e) => setNaturalInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-slate-300 outline-none"
                  />
                  <Button 
                    onClick={ingestNaturalInput} 
                    disabled={isIngesting}
                    className="rounded-xl px-4 bg-primary-600 text-white text-xs hover:bg-primary-700 flex items-center gap-1 shrink-0"
                  >
                    {isIngesting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    <span>Ingest</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Revenue Opportunities & Trials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pipelines */}
            <Card className="rounded-3xl border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-sm font-bold text-slate-800">Top Revenue Pipelines</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200/50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Heritage Foods</p>
                    <p className="text-3xs text-slate-500">Chocolate Milk Stabilization</p>
                  </div>
                  <span className="text-xs font-bold text-primary-600">₹ 4,200,000</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200/50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Mother Dairy</p>
                    <p className="text-3xs text-slate-500">Gummies Texturizer Supply</p>
                  </div>
                  <span className="text-xs font-bold text-primary-600">₹ 3,500,000</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-200/50">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Amul Cooperative</p>
                    <p className="text-3xs text-slate-500">Cheese Spread Thickening</p>
                  </div>
                  <span className="text-xs font-bold text-primary-600">₹ 4,700,000</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Trials */}
            <Card className="rounded-3xl border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-sm font-bold text-slate-800">Active Lab & Commercial Trials</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/50 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800">Trial #12 - Gummies</span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg text-3xs px-1.5 py-0.5">Viscosity Fail</Badge>
                  </div>
                  <div className="flex justify-between text-3xs text-slate-500">
                    <span>Grade: ACOS-GUM-4</span>
                    <span>Cost: ₹ 142/Kg</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/50 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800">Trial #14 - Milk Gel</span>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-3xs px-1.5 py-0.5">Success</Badge>
                  </div>
                  <div className="flex justify-between text-3xs text-slate-500">
                    <span>Grade: ACOS-MILK-9</span>
                    <span>Cost: ₹ 210/Kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 2. Interactive Knowledge Graph & Strategic Risks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Knowledge Graph Board */}
        <div className="lg:col-span-2">
          <Card className="rounded-3xl border-border shadow-sm h-full">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Link2 className="h-4.5 w-4.5 text-primary-600" />
                    <span>Interactive Knowledge Graph</span>
                  </CardTitle>
                  <CardDescription className="text-2xs">Explore nodes to map Customer ↔ Product ↔ Formulation relationships</CardDescription>
                </div>
                {selectedNode && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)} className="text-2xs text-muted-foreground">
                    Reset
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative border border-slate-200 rounded-2xl bg-slate-50/50 overflow-hidden h-[280px]">
                {/* SVG rendering the node topology */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Render connecting lines */}
                  {links.map((link, idx) => {
                    const srcNode = nodes.find(n => n.id === link.source)
                    const tgtNode = nodes.find(n => n.id === link.target)
                    if (!srcNode || !tgtNode) return null
                    return (
                      <line
                        key={idx}
                        x1={srcNode.x}
                        y1={srcNode.y}
                        x2={tgtNode.x}
                        y2={tgtNode.y}
                        stroke="#e2e8f0"
                        strokeWidth="2"
                        strokeDasharray={selectedNode?.id === srcNode.id || selectedNode?.id === tgtNode.id ? 'none' : '4 4'}
                        className="transition-all"
                      />
                    )
                  })}

                  {/* Render node circles */}
                  {nodes.map(node => {
                    const isSelected = selectedNode?.id === node.id
                    const isConnected = selectedNode && links.some(l => 
                      (l.source === selectedNode.id && l.target === node.id) ||
                      (l.target === selectedNode.id && l.source === node.id) ||
                      node.id === selectedNode.id
                    )
                    return (
                      <g 
                        key={node.id} 
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNode(node)}
                        className="cursor-pointer group"
                      >
                        <circle
                          r={isSelected ? '24' : '18'}
                          fill={
                            node.type === 'Customer' ? '#c62026' :
                            node.type === 'Formula' ? '#3b82f6' :
                            node.type === 'Product' ? '#10b981' :
                            node.type === 'Trial' ? '#f59e0b' : '#6366f1'
                          }
                          className="transition-all duration-300 opacity-90 group-hover:scale-110"
                        />
                        <text
                          y="32"
                          textAnchor="middle"
                          className={`text-3xs font-bold font-sans transition-all ${
                            isSelected ? 'fill-primary-600 scale-105' : 'fill-slate-600'
                          }`}
                        >
                          {node.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Node details overlay card */}
                {selectedNode ? (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl p-3 shadow-md space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-2xs font-bold text-slate-500 uppercase tracking-widest">{selectedNode.type} Entity</span>
                      <Badge className="bg-primary-50 text-primary-700 text-3xs rounded">{selectedNode.id}</Badge>
                    </div>
                    <p className="text-xs font-bold text-slate-800">{selectedNode.label}</p>
                    <p className="text-3xs text-slate-500 leading-relaxed">
                      This {selectedNode.type.toLowerCase()} record is linked to multiple experimental formulations.
                    </p>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-white/80 border border-slate-200/50 rounded-lg p-2 text-3xs text-slate-500">
                    ℹ️ Click any node to traverse relationship properties.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Risks & Emergency Dashboard Details */}
        <div>
          <Card className="rounded-3xl border-border shadow-sm h-full">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-primary-600" />
                <span>Strategic Risks HUD</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-start">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-700">Seaweed Crop Under-supply</h5>
                    <p className="text-3xs text-slate-500 mt-0.5">Procurement bottleneck in Southeast Asian regions.</p>
                  </div>
                  <Badge variant="destructive" className="rounded-lg text-3xs">Critical</Badge>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-start">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-700">UHT Viscosity Spec Mismatch</h5>
                    <p className="text-3xs text-slate-500 mt-0.5">Failed stabilizer blend test in batch #QC-098.</p>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-lg text-3xs">High</Badge>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-start">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-700">Patent Expiration Review</h5>
                    <p className="text-3xs text-slate-500 mt-0.5">Competing gelation technology evaluation ongoing.</p>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg text-3xs">Medium</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Ask Aqua AI Panel & Multi-Agent Orchestration Visualizer */}
      <Card className="rounded-3xl border-border shadow-sm">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary-600" />
            <span>Ask Aqua AI Command Console</span>
          </CardTitle>
          <CardDescription className="text-2xs">Interact with customized specialized agents across the organization</CardDescription>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          
          {/* Query bar */}
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Ask anything, e.g. Recommend formulation upgrades for milk stabilizers..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none focus:bg-white focus:border-slate-300 transition-all font-sans"
              onKeyDown={(e) => { if (e.key === 'Enter') askAquaAI(aiQuery) }}
            />
            <Button 
              onClick={() => askAquaAI(aiQuery)}
              disabled={isAiLoading}
              className="rounded-2xl px-6 bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 shrink-0"
            >
              {isAiLoading ? 'Orchestrating...' : 'Ask AI'}
            </Button>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { setAiQuery('Recommend application options for Kappa Carrageenan'); askAquaAI('Recommend application options for Kappa Carrageenan') }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-3xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
            >
              "Recommend applications for Kappa"
            </button>
            <button 
              onClick={() => { setAiQuery('Summarize Heritage Foods relationship stability'); askAquaAI('Summarize Heritage Foods relationship stability') }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-3xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
            >
              "Summarize Heritage Foods relationship"
            </button>
            <button 
              onClick={() => { setAiQuery('Compare experimental formulas costs vs target'); askAquaAI('Compare experimental formulas costs vs target') }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-3xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
            >
              "Compare experimental formula costs"
            </button>
          </div>

          {/* Orchestration Response & Steps Visualizer */}
          {aiOrchestration && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              
              {/* Agent Flow Header */}
              <div className="flex flex-wrap items-center gap-2 text-2xs font-bold text-slate-600">
                <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">Multi-Agent Flow:</span>
                <span>Sales Agent</span>
                <ArrowRight className="h-3 w-3" />
                <span>Technical Agent</span>
                <ArrowRight className="h-3 w-3" />
                <span>PhD Research Agent</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-emerald-600">CEO AI (Recommendation)</span>
              </div>

              {/* Progress message */}
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                {isAiLoading ? (
                  <RefreshCw className="h-4 w-4 text-primary-600 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 text-emerald-600" />
                )}
                <p className="text-xs font-semibold text-slate-700">
                  {aiOrchestration.text}
                </p>
              </div>

              {/* Final Recommendation */}
              {aiOrchestration.recommendation && (
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-900">Unified Strategic Recommendation</h4>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Confidence Score: {aiOrchestration.confidence}%
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-700">
                    {aiOrchestration.recommendation}
                  </p>
                  
                  {/* Sources & Citations */}
                  <div className="space-y-1">
                    <h5 className="text-3xs font-bold text-slate-400 uppercase tracking-widest">Confidence Sources</h5>
                    <div className="flex flex-wrap gap-2">
                      {aiOrchestration.sources.map((src: string, idx: number) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-3xs px-2 py-1 rounded border border-slate-200/50 font-semibold">
                          📄 {src}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

