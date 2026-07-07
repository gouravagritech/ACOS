'use client'

import { useAuth } from './useAuth'

export const usePermissions = () => {
  const { permissions, role } = useAuth()

  const hasPermission = (permission: string): boolean => {
    if (role === 'super_admin' || role === 'org_admin') return true
    if (!permissions) return false
    return permissions.includes(permission)
  }

  const hasAnyPermission = (requiredPermissions: string[]): boolean => {
    if (role === 'super_admin' || role === 'org_admin') return true
    if (!permissions) return false
    return requiredPermissions.some(perm => permissions.includes(perm))
  }

  return {
    permissions,
    role,
    hasPermission,
    hasAnyPermission,
  }
}
