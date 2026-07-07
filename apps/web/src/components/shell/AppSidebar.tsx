'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, Database, HelpCircle, Settings, Users, FileText, Bell, 
  ChevronRight, Sparkles, Sliders, Menu, X, BarChart3, TrendingUp, 
  Map, Target, ShieldAlert, Award, FileCode, Workflow, Brain, Ship, Share2
} from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<any>
}

interface SidebarGroup {
  title: string
  icon: React.ComponentType<any>
  items: SidebarItem[]
}

export function AppSidebar() {
  const pathname = usePathname()
  const { role } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navGroups: SidebarGroup[] = [
    {
      title: 'Intelligence HQ',
      icon: BarChart3,
      items: [
        { name: 'Executive Dashboard', href: '/intelligence/executive', icon: LayoutDashboard },
        { name: 'BI Analytics', href: '/intelligence/bi', icon: TrendingUp },
        { name: 'Market Intel', href: '/intelligence/market', icon: Map },
        { name: 'Competitive Intel', href: '/intelligence/competitive', icon: Target },
        { name: 'Engineering (AEMS)', href: '/platform/aems', icon: Settings },
      ]
    },
    {
      title: 'GTM Engine',
      icon: Sliders,
      items: [
        { name: 'ICP Builder', href: '/gtm/icp', icon: Award },
        { name: 'Buyer Personas', href: '/gtm/personas', icon: Users },
        { name: 'Accounts', href: '/crm/accounts', icon: Database },
        { name: 'Lead Inbox', href: '/leads/inbox', icon: Bell },
        { name: 'Sales Pipeline', href: '/gtm/pipeline', icon: Workflow },
      ]
    },
    {
      title: 'Technical',
      icon: Sparkles,
      items: [
        { name: 'Carrageenan Grades', href: '/technical/products', icon: FileCode },
        { name: 'Application Library', href: '/technical/applications', icon: HelpCircle },
        { name: 'Formulation Studio', href: '/technical/formulations', icon: Sliders },
        { name: 'Sample Pipeline', href: '/technical/samples/requests', icon: Workflow },
      ]
    },
    {
      title: 'Operations',
      icon: Database,
      items: [
        { name: 'Production', href: '/operations/production', icon: Sliders },
        { name: 'Procurement POs', href: '/operations/procurement', icon: FileText },
        { name: 'Inventory stocks', href: '/operations/inventory', icon: Database },
        { name: 'Quality QC', href: '/operations/quality', icon: ShieldAlert },
      ]
    },
    {
      title: 'AI Brain',
      icon: Brain,
      items: [
        { name: 'Semantic Search', href: '/ai/search', icon: Sparkles },
        { name: 'Knowledge Graph', href: '/ai/graph', icon: Workflow },
        { name: 'AI Agents', href: '/ai/agents', icon: Brain },
        { name: 'AI Governance', href: '/ai/governance', icon: ShieldAlert },
      ]
    },
    {
      title: 'External Portals',
      icon: Users,
      items: [
        { name: 'Customer Portal', href: '/portals/customer', icon: Users },
        { name: 'Distributor Portal', href: '/portals/distributor', icon: Map },
        { name: 'Supplier Portal', href: '/portals/supplier', icon: Ship },
        { name: 'Developer API', href: '/portals/developer', icon: FileCode },
      ]
    },
    {
      title: 'Integrations',
      icon: Share2,
      items: [
        { name: 'Connectors', href: '/integrations/connectors', icon: Share2 },
        { name: 'Hyperautomation', href: '/integrations/workflows', icon: Workflow },
        { name: 'Event Bus', href: '/integrations/events', icon: Database },
        { name: 'Gateway Stats', href: '/integrations/analytics', icon: BarChart3 },
      ]
    }
  ]

  return (
    <aside 
      className={`border-r border-border bg-sidebar h-full flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0 shadow-ocean">
            <span className="text-xs font-bold text-white font-display">AC</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-foreground font-display text-sm whitespace-nowrap">ACOS</span>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed ? (
              <span className="text-xs font-semibold text-muted-foreground px-3 uppercase tracking-wider block font-display">
                {group.title}
              </span>
            ) : (
              <div className="border-b border-border/50 my-2 mx-2" />
            )}
            
            <div className="space-y-0.5">
              {group.items.map((item, iIdx) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link 
                    key={iIdx}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-primary-600' : ''}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Settings */}
      <div className="p-3 border-t border-border bg-sidebar-background/50">
        <Link 
          href="/settings/organization"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Settings className="h-4.5 w-4.5" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  )
}
