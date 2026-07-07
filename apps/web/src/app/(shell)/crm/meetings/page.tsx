'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Plus, Sparkles, FileText, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface Meeting {
  id: string
  company: string
  subject: string
  date: string
  duration: string
  notes: string
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([
    { id: 'meet-1', company: 'Britannia Industries Ltd', subject: 'Kappa Spec Viscosity Alignment', date: '2026-07-06 10:00 IST', duration: '45 mins', notes: 'Aligned on target ash content specs. Requested 100g sample to test suspension stability in chocolate milk batches.' },
    { id: 'meet-2', company: 'United Breweries Group', subject: 'Clarifier Trial Outcome Review', date: '2026-07-02 14:00 IST', duration: '30 mins', notes: 'Trial successful. AquaClear fining agents reduced conditioning time. Draft quote requested for 10 Tons purchase order.' }
  ])

  const handleTranscript = (id: string) => {
    toast.success('AI Meeting Summary drafted and compiled to CRM Account timeline!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900">Meeting Intelligence & Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule client meetings, track logs, and generate automated AI summaries.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Log Meeting</span>
        </Button>
      </div>

      <div className="space-y-4">
        {meetings.map(meet => (
          <Card key={meet.id} className="border-border">
            <CardHeader className="pb-2 bg-slate-50/40 border-b border-slate-100 flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">{meet.company}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {meet.date} ({meet.duration})
                </span>
              </div>
              <Badge variant="default" className="text-2xs font-display">Completed</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div>
                <h4 className="text-xs font-bold text-slate-800">Subject: {meet.subject}</h4>
                <p className="text-slate-600 mt-2 leading-relaxed bg-slate-50 border border-slate-100 p-3 rounded-lg">
                  {meet.notes}
                </p>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-50 pt-3">
                <Button 
                  onClick={() => handleTranscript(meet.id)}
                  size="sm" 
                  className="flex items-center gap-1.5 text-2xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Draft AI Summary & Timeline Notes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
