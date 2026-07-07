'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  role: string | null;
  permissions: string[] | null;
  orgId: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  role: null,
  permissions: null,
  orgId: null,
  signOut: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const [orgId, setOrgId] = useState<string | null>(null)
  const [permissions, setPermissions] = useState<string[] | null>(null)
  const supabase = createBrowserClient()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Fetch user metadata & organization details
        const { data: profile } = await supabase
          .from('users')
          .select('role_id, org_id, roles(permissions)')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setRole(profile.role_id)
          setOrgId(profile.org_id)
          setPermissions(Object.keys((profile.roles as any)?.permissions ?? {}))
        }
      }
      setIsLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role_id, org_id, roles(permissions)')
          .eq('id', session.user.id)
          .single()

        if (profile) {
          setRole(profile.role_id)
          setOrgId(profile.org_id)
          setPermissions(Object.keys((profile.roles as any)?.permissions ?? {}))
        }
      } else {
        setRole(null)
        setOrgId(null)
        setPermissions(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    setIsLoading(true)
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, role, permissions, orgId, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
