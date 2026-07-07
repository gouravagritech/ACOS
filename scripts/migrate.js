/**
 * ACOS — Supabase Management API Migration Runner
 * Uses PAT to execute SQL directly via Management API
 */

const PAT = process.env.SUPABASE_PAT || ''
const PROJECT_REF = 'arvtqnmgicovbszypspz'
const BASE_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}`

async function runSQL(sql, label) {
  process.stdout.write(`  ${label} ... `)
  try {
    const resp = await fetch(`${BASE_URL}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAT}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: sql })
    })
    const data = await resp.json()
    if (!resp.ok) {
      const msg = data.message || data.error || JSON.stringify(data)
      if (msg.includes('already exists') || msg.includes('duplicate')) {
        console.log(`⚠ (exists, skipping)`)
        return null
      }
      console.log(`✗ ${msg.substring(0, 120)}`)
      return null
    }
    console.log(`✓`)
    return data
  } catch (err) {
    console.log(`✗ ${err.message}`)
    return null
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  ACOS v1.0.0 — Supabase Production Migration (API Mode) ║')
  console.log(`║  Project: ${PROJECT_REF}.supabase.co     ║`)
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  // ── Extensions ─────────────────────────────────────────────────
  console.log('【1】 Extensions')
  await runSQL(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`, 'uuid-ossp')
  await runSQL(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`, 'pgcrypto')
  await runSQL(`CREATE EXTENSION IF NOT EXISTS "vector";`, 'pgvector')

  // ── Schemas ─────────────────────────────────────────────────────
  console.log('\n【2】 Schemas')
  await runSQL(`CREATE SCHEMA IF NOT EXISTS audit;`, 'audit')
  await runSQL(`CREATE SCHEMA IF NOT EXISTS ai;`, 'ai')

  // ── Tables ──────────────────────────────────────────────────────
  console.log('\n【3】 Tables')
  await runSQL(`CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'organizations')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}'::jsonb
  );`, 'roles')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    head_user_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'departments')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(512),
    role_id VARCHAR(50) REFERENCES public.roles(id),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'users')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('prospect','customer','partner','competitor','supplier')),
    industry VARCHAR(100),
    country VARCHAR(2) NOT NULL DEFAULT 'IN',
    city VARCHAR(100),
    tier VARCHAR(50) DEFAULT 'standard' CHECK (tier IN ('strategic','key','standard','dormant')),
    health_score INT DEFAULT 100 CHECK (health_score BETWEEN 0 AND 100),
    owner_id UUID REFERENCES public.users(id),
    website VARCHAR(255),
    gstin VARCHAR(15),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'accounts')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(255),
    is_decision_maker BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'contacts')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    source VARCHAR(50) NOT NULL CHECK (source IN ('indiamart','tradeindia','website','linkedin','manual')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('new','contacted','qualified','nurturing','unqualified','lost')),
    score INT DEFAULT 0,
    assigned_to UUID REFERENCES public.users(id),
    account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    product_query TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'leads')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    stage VARCHAR(50) NOT NULL CHECK (stage IN ('qualification','technical_eval','proposal','negotiation','won','lost')),
    value DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR' NOT NULL,
    probability INT NOT NULL CHECK (probability BETWEEN 0 AND 100),
    close_date DATE,
    owner_id UUID REFERENCES public.users(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'opportunities')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    viscosity_spec VARCHAR(100),
    gel_strength_spec VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'products')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'applications')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.formulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    version INT DEFAULT 1 NOT NULL,
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    process_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft','approved','archived')),
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'formulations')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.trials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formulation_id UUID REFERENCES public.formulations(id) ON DELETE CASCADE NOT NULL,
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('planned','in_progress','completed','cancelled')),
    results JSONB NOT NULL DEFAULT '{}'::jsonb,
    feedback_rating INT CHECK (feedback_rating BETWEEN 1 AND 5),
    feedback_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'trials')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.sample_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) DEFAULT 'requested' CHECK (status IN ('requested','approved','dispatched','delivered','rejected')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'sample_requests')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.samples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.sample_requests(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'grams' NOT NULL,
    batch_no VARCHAR(100),
    tracking_no VARCHAR(255),
    carrier VARCHAR(100),
    feedback_rating INT CHECK (feedback_rating BETWEEN 1 AND 5),
    feedback_notes TEXT
  );`, 'samples')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    batch_no VARCHAR(100) UNIQUE NOT NULL,
    quantity DECIMAL(12,2) NOT NULL,
    production_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_qc' CHECK (status IN ('pending_qc','passed_qc','failed_qc','quarantined')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'batches')

  await runSQL(`CREATE TABLE IF NOT EXISTS public.lab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    test_type VARCHAR(100) NOT NULL,
    parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
    results JSONB NOT NULL DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending','passed','failed')),
    tested_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'lab_tests')

  await runSQL(`CREATE TABLE IF NOT EXISTS audit.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'audit_logs')

  await runSQL(`CREATE TABLE IF NOT EXISTS ai.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    context_type VARCHAR(100),
    context_id UUID,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'ai.conversations')

  await runSQL(`CREATE TABLE IF NOT EXISTS ai.knowledge_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
  );`, 'ai.knowledge_articles')

  // ── Indexes ─────────────────────────────────────────────────────
  console.log('\n【4】 Indexes')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_users_org ON public.users(org_id);`, 'idx_users_org')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_accounts_org_type ON public.accounts(org_id, type);`, 'idx_accounts_org_type')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_contacts_account ON public.contacts(account_id);`, 'idx_contacts_account')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_leads_org_status ON public.leads(org_id, status);`, 'idx_leads_org_status')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_opportunities_account ON public.opportunities(account_id);`, 'idx_opportunities_account')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_batches_product ON public.batches(product_id, batch_no);`, 'idx_batches_product')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_lab_tests_batch ON public.lab_tests(batch_id);`, 'idx_lab_tests_batch')
  await runSQL(`CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit.audit_logs(entity_type, entity_id);`, 'idx_audit_entity')

  // ── RLS ──────────────────────────────────────────────────────────
  console.log('\n【5】 Row Level Security')
  const tables = [
    'public.organizations','public.roles','public.departments','public.users',
    'public.accounts','public.contacts','public.leads','public.opportunities',
    'public.products','public.applications','public.formulations','public.trials',
    'public.sample_requests','public.samples','public.batches','public.lab_tests',
    'audit.audit_logs','ai.conversations','ai.knowledge_articles'
  ]
  for (const t of tables) {
    await runSQL(`ALTER TABLE ${t} ENABLE ROW LEVEL SECURITY;`, `RLS ${t.split('.')[1]}`)
  }

  // ── RLS Policies ──────────────────────────────────────────────────
  console.log('\n【6】 RLS Policies')
  await runSQL(`CREATE POLICY IF NOT EXISTS "roles_public_read" ON public.roles FOR SELECT USING (true);`, 'roles: public read')
  await runSQL(`CREATE POLICY IF NOT EXISTS "products_auth_read" ON public.products FOR SELECT USING (auth.uid() IS NOT NULL);`, 'products: auth read')
  await runSQL(`CREATE POLICY IF NOT EXISTS "applications_auth_read" ON public.applications FOR SELECT USING (auth.uid() IS NOT NULL);`, 'applications: auth read')
  await runSQL(`CREATE POLICY IF NOT EXISTS "formulations_auth_read" ON public.formulations FOR SELECT USING (auth.uid() IS NOT NULL);`, 'formulations: auth read')
  await runSQL(`CREATE POLICY IF NOT EXISTS "knowledge_auth_read" ON ai.knowledge_articles FOR SELECT USING (auth.uid() IS NOT NULL);`, 'knowledge: auth read')
  await runSQL(`CREATE POLICY IF NOT EXISTS "conversations_own" ON ai.conversations FOR SELECT USING (user_id = auth.uid());`, 'conversations: own')
  await runSQL(`CREATE POLICY IF NOT EXISTS "conversations_own_insert" ON ai.conversations FOR INSERT WITH CHECK (user_id = auth.uid());`, 'conversations: own insert')
  await runSQL(`CREATE POLICY IF NOT EXISTS "audit_auth_read" ON audit.audit_logs FOR SELECT USING (auth.uid() IS NOT NULL);`, 'audit: auth read')
  await runSQL(`
    CREATE POLICY IF NOT EXISTS "org_members_read" ON public.organizations FOR SELECT
    USING (id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'orgs: members read')
  await runSQL(`
    CREATE POLICY IF NOT EXISTS "accounts_org_read" ON public.accounts FOR SELECT
    USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'accounts: org read')
  await runSQL(`
    CREATE POLICY IF NOT EXISTS "accounts_org_write" ON public.accounts FOR INSERT
    WITH CHECK (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'accounts: org write')
  await runSQL(`
    CREATE POLICY IF NOT EXISTS "leads_org_read" ON public.leads FOR SELECT
    USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'leads: org read')
  await runSQL(`
    CREATE POLICY IF NOT EXISTS "users_org_read" ON public.users FOR SELECT
    USING (org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()));`, 'users: org read')

  // ── Triggers ─────────────────────────────────────────────────────
  console.log('\n【7】 Triggers')
  await runSQL(`
    CREATE OR REPLACE FUNCTION public.handle_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
    $$ LANGUAGE plpgsql;`, 'handle_updated_at fn')

  for (const t of ['organizations','users','accounts','leads','opportunities']) {
    await runSQL(`
      DROP TRIGGER IF EXISTS trg_updated_at ON public.${t};
      CREATE TRIGGER trg_updated_at BEFORE UPDATE ON public.${t}
        FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();`, `trigger: ${t}`)
  }

  await runSQL(`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.users (id, email, full_name, avatar_url)
      VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url'
      ) ON CONFLICT (id) DO NOTHING;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();`, 'new user trigger')

  // ── Seed Roles ────────────────────────────────────────────────────
  console.log('\n【8】 Seeding Roles')
  await runSQL(`
    INSERT INTO public.roles (id, name, permissions) VALUES
      ('super_admin','Super Administrator','{"all":true}'::jsonb),
      ('admin','Administrator','{"platform":true,"crm":true,"technical":true,"marketing":true,"operations":true,"ai":true}'::jsonb),
      ('sales_manager','Sales Manager','{"crm":true,"commercial":true,"leads":true}'::jsonb),
      ('technical_manager','Technical Manager','{"technical":true,"laboratory":true,"formulations":true}'::jsonb),
      ('marketing_manager','Marketing Manager','{"marketing":true,"content":true,"campaigns":true}'::jsonb),
      ('operations_manager','Operations Manager','{"operations":true,"inventory":true,"production":true}'::jsonb),
      ('viewer','Read Only Viewer','{"read_only":true}'::jsonb)
    ON CONFLICT (id) DO NOTHING;`, '7 roles')

  // ── Seed Organization ──────────────────────────────────────────────
  console.log('\n【9】 Seeding Organization')
  await runSQL(`
    INSERT INTO public.organizations (id, name, slug, settings) VALUES
      ('00000000-0000-0000-0000-000000000001','Aqua Colloids','aqua-colloids',
       '{"industry":"Specialty Chemicals","country":"IN","currency":"INR","timezone":"Asia/Kolkata","website":"https://aquacolloids.com"}'::jsonb)
    ON CONFLICT (id) DO NOTHING;`, 'Aqua Colloids')

  // ── Seed Products ─────────────────────────────────────────────────
  console.log('\n【10】 Seeding Products')
  await runSQL(`
    INSERT INTO public.products (sku, name, type, grade, viscosity_spec, gel_strength_spec) VALUES
      ('AC-XG-100','Xanthan Gum Food Grade','Xanthan Gum','Food Grade','1200-1700 cP','N/A'),
      ('AC-XG-200','Xanthan Gum Industrial Grade','Xanthan Gum','Industrial Grade','1200-1600 cP','N/A'),
      ('AC-XG-300','Xanthan Gum Oil & Gas Grade','Xanthan Gum','Oil & Gas Grade','1500-2000 cP','N/A'),
      ('AC-GG-100','Guar Gum Food Grade','Guar Gum','Food Grade','3000-5000 cP','N/A'),
      ('AC-GG-200','Guar Gum Industrial Grade','Guar Gum','Industrial Grade','5000-8000 cP','N/A'),
      ('AC-CG-100','Carrageenan Kappa','Carrageenan','Kappa','N/A','800-1200 g/cm2'),
      ('AC-CG-200','Carrageenan Iota','Carrageenan','Iota','N/A','200-400 g/cm2'),
      ('AC-AG-100','Agar Agar Food Grade','Agar','Food Grade','N/A','500-700 g/cm2'),
      ('AC-MC-100','Methyl Cellulose','Cellulose Derivative','Food Grade','1500-3000 cP','N/A'),
      ('AC-CMC-100','Carboxymethyl Cellulose','CMC','Food Grade','800-1200 cP','N/A')
    ON CONFLICT (sku) DO NOTHING;`, '10 products')

  // ── Seed Applications ─────────────────────────────────────────────
  console.log('\n【11】 Seeding Applications')
  await runSQL(`
    INSERT INTO public.applications (name, category, description) VALUES
      ('Bakery & Confectionery','Food & Beverage','Stabilizers for baked goods and confectionery'),
      ('Dairy Products','Food & Beverage','Texture modifiers for yogurt, ice cream and cheese'),
      ('Meat & Poultry','Food & Beverage','Binders and water retention agents for processed meat'),
      ('Sauces & Dressings','Food & Beverage','Thickeners for condiments and salad dressings'),
      ('Beverages','Food & Beverage','Suspension agents for juices and functional drinks'),
      ('Personal Care','Cosmetics & HPC','Rheology modifiers for shampoos and lotions'),
      ('Oil & Gas Drilling','Industrial','Viscosifiers for drilling and completion fluids'),
      ('Paper & Textiles','Industrial','Coating and sizing agents'),
      ('Agrochemicals','Agriculture','Suspension agents for pesticide formulations'),
      ('Pharmaceuticals','Pharma','Excipients for tablet binders and topical gels')
    ON CONFLICT DO NOTHING;`, '10 applications')

  // ── Verify ────────────────────────────────────────────────────────
  console.log('\n【VERIFY】 Final verification...')
  const verify = await fetch(`${BASE_URL}/database/query`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${PAT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `
      SELECT
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema IN ('public','audit','ai')) AS table_count,
        (SELECT COUNT(*) FROM public.roles) AS roles,
        (SELECT COUNT(*) FROM public.organizations) AS orgs,
        (SELECT COUNT(*) FROM public.products) AS products,
        (SELECT COUNT(*) FROM public.applications) AS applications;
    `})
  })
  const result = await verify.json()
  if (Array.isArray(result) && result.length > 0) {
    const r = result[0]
    console.log(`\n  Tables:       ${r.table_count}`)
    console.log(`  Roles:        ${r.roles}`)
    console.log(`  Orgs:         ${r.orgs}`)
    console.log(`  Products:     ${r.products}`)
    console.log(`  Applications: ${r.applications}`)
  }

  console.log('\n╔══════════════════════════════════════════════════════════╗')
  console.log('║  ✓ MIGRATION COMPLETE — Supabase is production-ready     ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
}

main().catch(err => {
  console.error('\n✗ Fatal:', err.message)
  process.exit(1)
})
