'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { UserPlus, Mail } from 'lucide-react'
import { toast } from 'sonner'

interface OrgUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'invited'
}

export default function UsersPage() {
  const [users, setUsers] = useState<OrgUser[]>([
    { id: 'usr-1', name: 'Gourav Sharma', email: 'g.sharma@aquacolloids.com', role: 'quality_manager', status: 'active' },
    { id: 'usr-2', name: 'Pooja Patel', email: 'p.patel@aquacolloids.com', role: 'sales_rep', status: 'active' }
  ])

  const handleInvite = () => {
    toast.success('User invitation magic link dispatched!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">User Provisioning & Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">Invite team members, assign RBAC roles, and manage active sessions credentials.</p>
        </div>
        <Button onClick={handleInvite} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Invite Member</span>
        </Button>
      </div>

      <Card className="shadow-sm border border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-700 uppercase border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{u.name}</td>
                    <td className="px-6 py-4 font-mono text-xs flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {u.email}
                    </td>
                    <td className="px-6 py-4 font-mono text-2xs text-muted-foreground capitalize">{u.role}</td>
                    <td className="px-6 py-4">
                      <Badge variant={u.status === 'active' ? 'success' : 'secondary'} className="capitalize text-3xs font-display">
                        {u.status}
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
