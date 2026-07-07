/**
 * ACOS — Create Production Admin User
 * Uses Supabase Service Role Key to create/update the super admin user
 */

const PROJECT_REF = 'arvtqnmgicovbszypspz'
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`
const PAT = process.env.SUPABASE_PAT || ''
const realSvcKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

async function runSQL(sql) {
  const resp = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAT}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.message || data.error || JSON.stringify(data))
  return data
}

async function main() {
  console.log('=== ACOS Production Admin User Setup ===\n')

  const email = 'gouravagritech@gmail.com'
  const password = 'Satyam@8804150404'

  // Let's check if the user already exists in auth.users
  console.log(`Checking if user ${email} exists in auth.users...`)
  let userId = null

  // We can fetch user list via GoTrue Admin API
  const listResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'GET',
    headers: {
      'apikey': realSvcKey,
      'Authorization': `Bearer ${realSvcKey}`,
      'Content-Type': 'application/json'
    }
  })

  if (listResp.ok) {
    const usersData = await listResp.json()
    const existingUser = usersData.users ? usersData.users.find(u => u.email === email) : null
    if (existingUser) {
      userId = existingUser.id
      console.log(`  ✓ Found existing user with ID: ${userId}`)
    }
  }

  if (!userId) {
    // Create new user via GoTrue Admin API
    console.log(`Creating new auth user ${email}...`)
    const createResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'apikey': realSvcKey,
        'Authorization': `Bearer ${realSvcKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          full_name: 'Gourav Admin'
        }
      })
    })

    const createData = await createResp.json()
    if (!createResp.ok) {
      throw new Error(`Auth creation failed: ${createData.msg || createData.error || JSON.stringify(createData)}`)
    }
    userId = createData.id
    console.log(`  ✓ User successfully created! ID: ${userId}`)
  } else {
    // Update password for existing user
    console.log(`Updating password for existing user ${email}...`)
    const updateResp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'apikey': realSvcKey,
        'Authorization': `Bearer ${realSvcKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email_confirm: true
      })
    })
    
    if (!updateResp.ok) {
      const updateData = await updateResp.json()
      throw new Error(`Auth update failed: ${JSON.stringify(updateData)}`)
    }
    console.log(`  ✓ Password successfully updated!`)
  }

  // Ensure public.users entry is synchronized, mapped to Aqua Colloids, and assigned super_admin role
  console.log('\nSynchronizing user permissions in public.users...')
  
  // Verify/create the public.users record
  await runSQL(`
    INSERT INTO public.users (id, org_id, email, full_name, role_id)
    VALUES (
      '${userId}',
      '00000000-0000-0000-0000-000000000001',
      '${email}',
      'Gourav Admin',
      'super_admin'
    )
    ON CONFLICT (id) DO UPDATE SET
      org_id = '00000000-0000-0000-0000-000000000001',
      role_id = 'super_admin',
      full_name = 'Gourav Admin';
  `)
  
  console.log('  ✓ User permissions synchronized: super_admin role assigned!')
  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  ✓ ADMIN USER PROFILE IS NOW FULLY FUNCTIONAL AND LIVE!   ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
}

main().catch(err => {
  console.error('\n✗ Setup failed:', err.message)
  process.exit(1)
})
