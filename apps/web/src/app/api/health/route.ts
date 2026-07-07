import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0',
    app: process.env.NEXT_PUBLIC_APP_NAME ?? 'ACOS',
    environment: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
    timestamp: new Date().toISOString(),
    services: {
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'unconfigured',
      ai: {
        openai: process.env.OPENAI_API_KEY ? 'configured' : 'unconfigured',
        anthropic: process.env.ANTHROPIC_API_KEY ? 'configured' : 'unconfigured',
        google: process.env.GOOGLE_AI_API_KEY ? 'configured' : 'unconfigured',
      },
      automation: {
        n8n: process.env.N8N_WEBHOOK_URL ? 'configured' : 'unconfigured',
      },
      notifications: {
        email: process.env.RESEND_API_KEY ? 'configured' : 'unconfigured',
      },
    },
  })
}
