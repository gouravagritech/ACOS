/**
 * ACOS — RLS Policy Runner (separate script, no IF NOT EXISTS)
const PAT = process.env.SUPABASE_PAT || ''
const PROJECT_REF = 'arvtqnmgicovbszypspz'

async function runSQL(sql, label) {
  process.stdout.write(`  ${label} ... `)
  try {
    const resp = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${PAT}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sql })
    })
    const data = await resp.json()
    if (!resp.ok) {
      const msg = (data.message || data.error || '').substring(0, 100)
      if (msg.includes('already exists')) { console.log(`⚠ (exists)`); return }
      console.log(`✗ ${msg}`)
      return
    }
    console.log(`✓`)
  } catch (err) { console.log(`✗ ${err.message}`) }
}

async function main() {
  console.log('=== ACOS RLS Policy Setup ===\n')

  // Drop existing then recreate (idempotent approach)
  const drops = [
    `DROP POLICY IF EXISTS "roles_public_read" ON public.roles;`,
    `DROP POLICY IF EXISTS "products_auth_read" ON public.products;`,
    `DROP POLICY IF EXISTS "applications_auth_read" ON public.applications;`,
    `DROP POLICY IF EXISTS "formulations_auth_read" ON public.formulations;`,
    `DROP POLICY IF EXISTS "knowledge_auth_read" ON ai.knowledge_articles;`,
    `DROP POLICY IF EXISTS "conversations_own" ON ai.conversations;`,
    `DROP POLICY IF EXISTS "conversations_own_insert" ON ai.conversations;`,
    `DROP POLICY IF EXISTS "audit_auth_read" ON audit.audit_logs;`,
    `DROP POLICY IF EXISTS "org_members_read" ON public.organizations;`,
    `DROP POLICY IF EXISTS "accounts_org_read" ON public.accounts;`,
    `DROP POLICY IF EXISTS "accounts_org_write" ON public.accounts;`,
    `DROP POLICY IF EXISTS "leads_org_read" ON public.leads;`,
    `DROP POLICY IF EXISTS "users_org_read" ON public.users;`,
    `DROP POLICY IF EXISTS "contacts_org_read" ON public.contacts;`,
    `DROP POLICY IF EXISTS "opportunities_org_read" ON public.opportunities;`,
  ]

  // Run all drops in one statement
  await runSQL(drops.join('\n'), 'Drop existing policies')

  // Create policies
  await runSQL(`CREATE POLICY "roles_public_read" ON public.roles FOR SELECT USING (true);`, 'roles: public read')
  await runSQL(`CREATE POLICY "products_auth_read" ON public.products FOR SELECT USING (auth.uid() IS NOT NULL);`, 'products: auth read')
  await runSQL(`CREATE POLICY "applications_auth_read" ON public.applications FOR SELECT USING (auth.uid() IS NOT NULL);`, 'applications: auth read')
  await runSQL(`CREATE POLICY "formulations_auth_read" ON public.formulations FOR SELECT USING (auth.uid() IS NOT NULL);`, 'formulations: auth read')
  await runSQL(`CREATE POLICY "batches_auth_read" ON public.batches FOR SELECT USING (auth.uid() IS NOT NULL);`, 'batches: auth read')
  await runSQL(`CREATE POLICY "lab_tests_auth_read" ON public.lab_tests FOR SELECT USING (auth.uid() IS NOT NULL);`, 'lab_tests: auth read')
  await runSQL(`CREATE POLICY "knowledge_auth_read" ON ai.knowledge_articles FOR SELECT USING (auth.uid() IS NOT NULL);`, 'knowledge: auth read')
  await runSQL(`CREATE POLICY "conversations_own" ON ai.conversations FOR SELECT USING (user_id = auth.uid());`, 'conversations: own read')
  await runSQL(`CREATE POLICY "conversations_own_insert" ON ai.conversations FOR INSERT WITH CHECK (user_id = auth.uid());`, 'conversations: own insert')
  await runSQL(`CREATE POLICY "audit_auth_read" ON audit.audit_logs FOR SELECT USING (auth.uid() IS NOT NULL);`, 'audit: auth read')
  await runSQL(`CREATE POLICY "org_members_read" ON public.organizations FOR SELECT USING (id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'orgs: members read')
  await runSQL(`CREATE POLICY "users_org_read" ON public.users FOR SELECT USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'users: org read')
  await runSQL(`CREATE POLICY "accounts_org_read" ON public.accounts FOR SELECT USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'accounts: org read')
  await runSQL(`CREATE POLICY "accounts_org_insert" ON public.accounts FOR INSERT WITH CHECK (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'accounts: org insert')
  await runSQL(`CREATE POLICY "accounts_org_update" ON public.accounts FOR UPDATE USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'accounts: org update')
  await runSQL(`CREATE POLICY "contacts_org_read" ON public.contacts FOR SELECT USING (account_id IN (SELECT id FROM public.accounts WHERE org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())));`, 'contacts: org read')
  await runSQL(`CREATE POLICY "leads_org_read" ON public.leads FOR SELECT USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'leads: org read')
  await runSQL(`CREATE POLICY "leads_org_insert" ON public.leads FOR INSERT WITH CHECK (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'leads: org insert')
  await runSQL(`CREATE POLICY "opportunities_org_read" ON public.opportunities FOR SELECT USING (account_id IN (SELECT id FROM public.accounts WHERE org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())));`, 'opportunities: org read')
  await runSQL(`CREATE POLICY "samples_auth_read" ON public.samples FOR SELECT USING (auth.uid() IS NOT NULL);`, 'samples: auth read')
  await runSQL(`CREATE POLICY "sample_requests_auth_read" ON public.sample_requests FOR SELECT USING (auth.uid() IS NOT NULL);`, 'sample_requests: auth read')
  await runSQL(`CREATE POLICY "trials_auth_read" ON public.trials FOR SELECT USING (auth.uid() IS NOT NULL);`, 'trials: auth read')
  await runSQL(`CREATE POLICY "departments_org_read" ON public.departments FOR SELECT USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'departments: org read')

  // Create storage buckets via API
  console.log('\n=== Storage Buckets ===')
  const svcKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFydnRxbm1naWNvdmJzenlwc3B6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzQwMDc4MiwiZXhwIjoyMDk4OTc2NzgyfQ.O13jZzFnOumrde0j353VmcVnIVfJ6jjPB3GubgMGRKY'
  const supabaseUrl = 'https://arvtqnmgicovbszypspz.supabase.co'
  
  const buckets = [
    { id: 'avatars', name: 'avatars', public: true },
    { id: 'documents', name: 'documents', public: false },
    { id: 'product-assets', name: 'product-assets', public: true },
    { id: 'samples', name: 'samples', public: false },
    { id: 'reports', name: 'reports', public: false },
    { id: 'brand-assets', name: 'brand-assets', public: true },
  ]

  for (const bucket of buckets) {
    process.stdout.write(`  Bucket: ${bucket.id} ... `)
    try {
      const resp = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
        method: 'POST',
        headers: {
          'apikey': svcKey,
          'Authorization': `Bearer ${svcKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bucket)
      })
      const data = await resp.json()
      if (resp.ok) console.log(`✓ created`)
      else if ((data.error || '').includes('already exists')) console.log(`⚠ (exists)`)
      else console.log(`✗ ${data.error}`)
    } catch (err) { console.log(`✗ ${err.message}`) }
  }

  console.log('\n✓ RLS policies and storage buckets configured!')
}

main().catch(console.error)
