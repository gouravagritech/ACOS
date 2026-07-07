'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Search, Mail, Phone, Shield } from 'lucide-react'

interface Contact {
  name: string
  company: string
  title: string
  email: string
  phone: string
  isDecisionMaker: boolean
}

export default function ContactsPage() {
  const [query, setQuery] = useState('')
  const [contacts] = useState<Contact[]>([
    { name: 'Dr. Vivek Nair', company: 'Britannia Industries Ltd', title: 'R&D Director - Dairy', email: 'v.nair@britannia.co.in', phone: '+91 98450 12345', isDecisionMaker: true },
    { name: 'Pooja Patel', company: 'Britannia Industries Ltd', title: 'Procurement Manager', email: 'p.patel@britannia.co.in', phone: '+91 98450 54321', isDecisionMaker: false },
    { name: 'Rajesh Shah', company: 'Amul Dairy Co-op', title: 'Quality Assurance Head', email: 'r.shah@amul.coop', phone: '+91 99000 98765', isDecisionMaker: true },
  ])

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900">B2B Contacts Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage B2B decision-maker listings, roles, and communication channels.</p>
      </div>

      <Card className="shadow-sm border border-border">
        <CardContent className="p-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Search className="h-4.5 w-4.5 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search contact name, company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent p-0 w-full"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Company</th>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Phone</th>
                  <th className="px-6 py-3 font-semibold">Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-slate-700">{c.company}</td>
                    <td className="px-6 py-4 text-muted-foreground">{c.title}</td>
                    <td className="px-6 py-4 font-mono text-xs flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {c.email}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground inline mr-1.5" />
                      {c.phone}
                    </td>
                    <td className="px-6 py-4">
                      {c.isDecisionMaker ? (
                        <Badge variant="success" className="h-5 flex items-center gap-1 w-fit">
                          <Shield className="h-3 w-3" />
                          <span>Decision Maker</span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="h-5">Influencer</Badge>
                      )}
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
