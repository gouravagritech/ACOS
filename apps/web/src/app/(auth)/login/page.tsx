'use client'

import React, { useState } from 'react'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createBrowserClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMagicLink, setIsMagicLink] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email is required')
      return
    }

    setIsLoading(true)

    try {
      if (isMagicLink) {
        // Sign in with magic link
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        toast.success('Magic Link sent! Check your inbox.')
      } else {
        // Sign in with password
        if (!password) {
          toast.error('Password is required')
          setIsLoading(false)
          return
        }
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        toast.success('Signed in successfully!')
        router.push('/intelligence/executive')
        router.refresh()
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-glass-lg border border-white/20">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white font-display">Welcome back</h2>
        <p className="mt-1 text-sm text-sky-200">Sign in to your ACOS workspace</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sky-100 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-sky-300" />
            <input 
              type="email"
              placeholder="name@aquacolloids.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-sky-300/50 outline-none focus:border-primary-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Password Input (Hidden for Magic Link) */}
        {!isMagicLink && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sky-100 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4.5 w-4.5 text-sky-300" />
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-sky-300/50 outline-none focus:border-primary-500 transition-colors"
                required
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-ocean"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>{isMagicLink ? 'Send Magic Link' : 'Sign In'}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch auth method toggler */}
      <div className="mt-5 flex justify-between items-center text-xs">
        <button 
          onClick={() => setIsMagicLink(!isMagicLink)}
          className="text-sky-300 hover:text-white transition-colors"
        >
          {isMagicLink ? 'Sign in with Password' : 'Send a Magic Link'}
        </button>

        <a href="/forgot-password" className="text-sky-300 hover:text-white transition-colors">
          Forgot password?
        </a>
      </div>
    </div>
  )
}

