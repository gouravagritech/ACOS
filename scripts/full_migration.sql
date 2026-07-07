-- ============================================================
-- ACOS v1.0.0 — Full Database Migration
-- Run this in: Supabase Dashboard > SQL Editor
-- Project: arvtqnmgicovbszypspz
-- ============================================================

-- STEP 1: Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";


-- STEP 2: Schema
-- Setup Schemas
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS ai;

-- 1. IDENTITY & AUTH TABLES
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    head_user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY, -- Maps directly to auth.users.id
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(512),
    role_id VARCHAR(50) REFERENCES public.roles(id),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. CRM & COMMERCIAL TABLES
CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('prospect', 'customer', 'partner', 'competitor', 'supplier')),
    industry VARCHAR(100),
    country VARCHAR(2) NOT NULL, -- ISO 2-letter country code
    city VARCHAR(100),
    tier VARCHAR(50) DEFAULT 'standard' CHECK (tier IN ('strategic', 'key', 'standard', 'dormant')),
    health_score INT DEFAULT 100 CHECK (health_score BETWEEN 0 AND 100),
    owner_id UUID REFERENCES public.users(id),
    website VARCHAR(255),
    gstin VARCHAR(15),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(255),
    is_decision_maker BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    source VARCHAR(50) NOT NULL CHECK (source IN ('indiamart', 'tradeindia', 'website', 'linkedin', 'manual')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'nurturing', 'unqualified', 'lost')),
    score INT DEFAULT 0,
    assigned_to UUID REFERENCES public.users(id),
    account_id UUID REFERENCES public.accounts(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    product_query TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    stage VARCHAR(50) NOT NULL CHECK (stage IN ('qualification', 'technical_eval', 'proposal', 'negotiation', 'won', 'lost')),
    value DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR' NOT NULL,
    probability INT NOT NULL CHECK (probability BETWEEN 0 AND 100),
    close_date DATE,
    owner_id UUID REFERENCES public.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. PRODUCT & APPLICATION TABLES
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    viscosity_spec VARCHAR(100),
    gel_strength_spec VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.formulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    version INT DEFAULT 1 NOT NULL,
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    process_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'archived')),
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.trials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formulation_id UUID REFERENCES public.formulations(id) ON DELETE CASCADE NOT NULL,
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
    results JSONB NOT NULL DEFAULT '{}'::jsonb,
    feedback_rating INT CHECK (feedback_rating BETWEEN 1 AND 5),
    feedback_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. SAMPLES & LABORATORY TABLES
CREATE TABLE IF NOT EXISTS public.sample_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(50) DEFAULT 'requested' CHECK (status IN ('requested', 'approved', 'dispatched', 'delivered', 'rejected')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.samples (
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
);

CREATE TABLE IF NOT EXISTS public.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    batch_no VARCHAR(100) UNIQUE NOT NULL,
    quantity DECIMAL(12,2) NOT NULL,
    production_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_qc' CHECK (status IN ('pending_qc', 'passed_qc', 'failed_qc', 'quarantined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS public.lab_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE NOT NULL,
    test_type VARCHAR(100) NOT NULL,
    parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
    results JSONB NOT NULL DEFAULT '{}'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed')),
    tested_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. AUDIT TABLES
CREATE TABLE IF NOT EXISTS audit.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. AI CONVERSATIONS & KNOWLEDGE TABLES
CREATE TABLE IF NOT EXISTS ai.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    context_type VARCHAR(100),
    context_id UUID,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS ai.knowledge_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags VARCHAR(100)[] DEFAULT '{}'::VARCHAR(100)[],
    embedding vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_org ON public.users(org_id);
CREATE INDEX IF NOT EXISTS idx_accounts_org_type ON public.accounts(org_id, type);
CREATE INDEX IF NOT EXISTS idx_contacts_account ON public.contacts(account_id);
CREATE INDEX IF NOT EXISTS idx_leads_org_status ON public.leads(org_id, status);
CREATE INDEX IF NOT EXISTS idx_opportunities_account ON public.opportunities(account_id);
CREATE INDEX IF NOT EXISTS idx_batches_product_no ON public.batches(product_id, batch_no);
CREATE INDEX IF NOT EXISTS idx_lab_tests_batch ON public.lab_tests(batch_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit.audit_logs(entity_type, entity_id);


-- STEP 3: Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai.knowledge_articles ENABLE ROW LEVEL SECURITY;

-- STEP 4: RLS Policies (service_role bypasses all)
-- Organizations: only members of the org can see their org
CREATE POLICY "org_members_select" ON public.organizations FOR SELECT USING (
  id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);

-- Users: can see others in same org
CREATE POLICY "users_same_org" ON public.users FOR SELECT USING (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);

-- Accounts: same org access
CREATE POLICY "accounts_same_org" ON public.accounts FOR SELECT USING (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "accounts_same_org_insert" ON public.accounts FOR INSERT WITH CHECK (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "accounts_same_org_update" ON public.accounts FOR UPDATE USING (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);

-- Contacts: through account membership
CREATE POLICY "contacts_through_accounts" ON public.contacts FOR SELECT USING (
  account_id IN (SELECT id FROM public.accounts WHERE org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid()))
);

-- Leads: same org
CREATE POLICY "leads_same_org" ON public.leads FOR SELECT USING (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);
CREATE POLICY "leads_same_org_insert" ON public.leads FOR INSERT WITH CHECK (
  org_id IN (SELECT org_id FROM public.users WHERE id = auth.uid())
);

-- Products: all authenticated users can read
CREATE POLICY "products_authenticated_read" ON public.products FOR SELECT USING (auth.uid() IS NOT NULL);

-- Formulations: authenticated read
CREATE POLICY "formulations_authenticated_read" ON public.formulations FOR SELECT USING (auth.uid() IS NOT NULL);

-- Audit logs: authenticated read only
CREATE POLICY "audit_logs_authenticated_read" ON audit.audit_logs FOR SELECT USING (auth.uid() IS NOT NULL);

-- AI conversations: own conversations only
CREATE POLICY "conversations_own" ON ai.conversations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "conversations_own_insert" ON ai.conversations FOR INSERT WITH CHECK (user_id = auth.uid());

-- Knowledge articles: authenticated read
CREATE POLICY "knowledge_articles_read" ON ai.knowledge_articles FOR SELECT USING (auth.uid() IS NOT NULL);

-- Roles: public read
CREATE POLICY "roles_public_read" ON public.roles FOR SELECT USING (true);

-- STEP 5: Auto-update timestamps trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS \$\$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- STEP 6: New user profile trigger (auto-create user record on signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS \$\$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
\$\$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STEP 7: Seed default roles
INSERT INTO public.roles (id, name, permissions) VALUES
  ('super_admin', 'Super Administrator', '{"all": true}'::jsonb),
  ('admin', 'Administrator', '{"platform": true, "crm": true, "technical": true, "marketing": true, "operations": true, "ai": true}'::jsonb),
  ('sales_manager', 'Sales Manager', '{"crm": true, "commercial": true, "leads": true}'::jsonb),
  ('technical_manager', 'Technical Manager', '{"technical": true, "laboratory": true, "formulations": true}'::jsonb),
  ('marketing_manager', 'Marketing Manager', '{"marketing": true, "content": true, "campaigns": true}'::jsonb),
  ('operations_manager', 'Operations Manager', '{"operations": true, "inventory": true, "production": true}'::jsonb),
  ('viewer', 'Read Only Viewer', '{"read_only": true}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- STEP 8: Seed Aqua Colloids organization
INSERT INTO public.organizations (id, name, slug, settings) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Aqua Colloids', 'aqua-colloids', 
   '{"industry": "Specialty Chemicals", "country": "IN", "currency": "INR", "timezone": "Asia/Kolkata", "website": "https://aquacolloids.com"}'::jsonb)
ON CONFLICT (id) DO NOTHING;

SELECT 'Migration complete. Tables created, RLS enabled, roles seeded.' as status;
