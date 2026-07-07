# ACOS — Aqua Colloids Operating System

> **AI-native Commercial Intelligence Platform** for Aquagri Processing Pvt Ltd — India's premier hydrocolloid (carrageenan) manufacturer.

[![Build](https://github.com/aquagri/acos/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/aquagri/acos/actions)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)]()
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-EF4444.svg)](https://turbo.build/)

---

## 🌊 Overview

ACOS is a unified, AI-native commercial intelligence platform purpose-built for Aqua Colloids' B2B hydrocolloid business. It integrates CRM, GTM intelligence, technical product management, laboratory operations, marketing automation, and executive BI into a single coherent system — replacing fragmented spreadsheets, disparate SaaS tools, and manual processes.

**Company:** Aquagri Processing Pvt Ltd  
**Brand:** Aqua Colloids  
**Products:** Kappa Carrageenan, Iota Carrageenan, Hydrocolloid Biopolymer Solutions  
**Markets:** Dairy · Meat · Beer/Brewing · Confectionery · Pet Food · Personal Care · Pharma  
**Manufacturing:** Manamadurai, Tamil Nadu  
**Corporate:** New Delhi  
**Website:** [aquacolloids.com](https://aquacolloids.com)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript 5.x |
| **Styling** | Tailwind CSS 4, shadcn/ui, Framer Motion |
| **Data Fetching** | TanStack Query v5, TanStack Table v8 |
| **Charts** | Recharts 2.x |
| **Workflow Viz** | React Flow |
| **Database** | Supabase (PostgreSQL 16 + pgvector) |
| **Auth** | Supabase Auth (JWT + RLS) |
| **Storage** | Supabase Storage |
| **Edge Functions** | Supabase Edge Functions (Deno) |
| **AI / LLMs** | OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash |
| **AI SDK** | Vercel AI SDK 4.x |
| **Automation** | n8n (self-hosted) |
| **Deployment** | Vercel (web), Supabase Cloud |
| **CI/CD** | GitHub Actions, Turborepo |
| **Package Manager** | pnpm 9.x |

---

## 📁 Repository Structure

```
acos/
├── apps/
│   └── web/                  # Next.js 16 application (main UI)
├── packages/
│   ├── ui/                   # Shared React component library (@acos/ui)
│   ├── db/                   # Database schema & migrations (@acos/db)
│   ├── types/                # Shared TypeScript types (@acos/types)
│   ├── config/               # Shared ESLint/TS configs (@acos/config)
│   ├── ai/                   # AI client utilities (@acos/ai)
│   ├── hooks/                # Shared React hooks (@acos/hooks)
│   ├── utils/                # Shared utility functions (@acos/utils)
│   ├── validators/           # Zod validation schemas (@acos/validators)
│   ├── notifications/        # Notification service (@acos/notifications)
│   └── audit/                # Audit trail utilities (@acos/audit)
├── services/
│   ├── migration-tool/       # ETL tool for legacy data migration
│   └── ai-workers/           # Background AI processing workers
├── supabase/
│   ├── migrations/           # SQL migration files (00001–00020)
│   ├── functions/            # Supabase Edge Functions
│   └── seed.sql              # Initial seed data
├── n8n/
│   ├── workflows/            # n8n workflow JSON exports
│   └── docker-compose.yml    # Local n8n setup
├── docs/
│   ├── architecture/         # Architecture Decision Records (ADRs)
│   ├── api/                  # OpenAPI specification
│   ├── modules/              # Module documentation
│   └── guides/               # Developer guides
└── .github/
    └── workflows/            # GitHub Actions CI/CD pipelines
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 20.x | [nodejs.org](https://nodejs.org) |
| pnpm | ≥ 9.x | `npm i -g pnpm@9` |
| Docker Desktop | Latest | [docker.com](https://docker.com) |
| Supabase CLI | Latest | `brew install supabase/tap/supabase` |
| Git | ≥ 2.40 | [git-scm.com](https://git-scm.com) |

### 1. Clone the repository

```bash
git clone https://github.com/aquagri/acos.git
cd acos
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

```bash
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local and fill in all required values
```

### 4. Start Supabase locally

```bash
supabase start
# This starts PostgreSQL, Auth, Storage, Edge Functions locally via Docker
```

### 5. Run database migrations

```bash
supabase db push
# Or via Turbo:
pnpm db:migrate
```

### 6. Seed the database

```bash
supabase db reset
# This runs migrations + seed.sql automatically
```

### 7. Start development server

```bash
pnpm dev
# Opens http://localhost:3000
```

### 8. (Optional) Start n8n automation

```bash
cd n8n
docker compose up -d
# Opens http://localhost:5678
```

---

## 🧩 Module Overview

| Module | Path | Description |
|---|---|---|
| **Executive Intelligence** | `/intelligence/executive` | Board-level KPIs, revenue analytics, market share |
| **BI Dashboard** | `/intelligence/bi` | Business intelligence with drill-down charts |
| **Market Intelligence** | `/intelligence/market` | Trade data, import/export, market sizing |
| **Competitive Intelligence** | `/intelligence/competitive` | Competitor profiles, pricing, SWOT |
| **GTM Engine** | `/gtm/*` | ICP, personas, segments, playbooks, pipeline, pricing |
| **CRM** | `/crm/*` | Accounts, contacts, activities, meetings |
| **Lead Management** | `/leads/*` | Inbox, scoring, qualification, source tracking |
| **Commercial** | `/commercial/*` | Proposals, quotations, orders, Customer 360 |
| **Technical Products** | `/technical/products` | Product catalog, specifications, grades |
| **Application Library** | `/technical/applications` | Industry × application × carrageenan mapping |
| **Formulation Studio** | `/technical/formulations` | Formulation builder, version control |
| **Laboratory** | `/technical/lab` | Batches, QC tests, CoA generation, NCR |
| **Sample Management** | `/technical/samples` | Sample requests, dispatch, feedback loop |
| **Marketing** | `/marketing/*` | Campaigns, content calendar, email, SEO |
| **Brand** | `/brand/*` | Brand assets, guidelines, templates |
| **LinkedIn Intelligence** | `/linkedin/*` | Post management, analytics |
| **Events** | `/events/*` | Trade show and webinar management |
| **CMS** | `/cms/*` | Website content management |
| **Customer Success** | `/success/*` | Account health, success plans |
| **Operations** | `/operations/*` | Manufacturing orders, inventory, procurement |
| **Platform** | `/platform/*` | Documents, knowledge base, AI assistant, workflows |
| **Settings** | `/settings/*` | Org config, users, roles, integrations, billing |

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ACOS Web Application                  │
│              (Next.js 16 + React 19 + TypeScript)        │
├─────────────────────┬───────────────────────────────────┤
│   App Router Pages  │      React Server Components      │
│   (22 modules)      │      + Client Islands             │
├─────────────────────┴───────────────────────────────────┤
│              Shared Component Library (@acos/ui)         │
│         shadcn/ui · Tailwind · Framer Motion             │
├──────────────┬──────────────────┬───────────────────────┤
│  TanStack    │   Vercel AI SDK  │    React Hook Form     │
│  Query/Table │  GPT-4o / Claude │    + Zod Validation   │
├──────────────┴──────────────────┴───────────────────────┤
│                   Supabase Platform                      │
│  PostgreSQL 16 · pgvector · Auth · Storage · Edge Fns   │
├──────────────┬──────────────────┬───────────────────────┤
│   n8n        │  OpenAI GPT-4o   │   Resend Email        │
│  Automation  │  Claude 3.5      │   Analytics           │
│  Workflows   │  Gemini 2.0      │   Monitoring          │
└──────────────┴──────────────────┴───────────────────────┘
```

---

## 🔄 Development Workflow

### Branch Strategy

| Branch | Purpose | Deploy |
|---|---|---|
| `main` | Production-ready code | Production (Vercel) |
| `staging` | Integration testing | Staging (Vercel) |
| `develop` | Active development | Preview (Vercel) |
| `feature/*` | Feature branches | PR Preview |
| `fix/*` | Bug fix branches | PR Preview |
| `chore/*` | Maintenance tasks | PR Preview |

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(crm): add account health score widget
fix(leads): correct scoring algorithm weight normalization
docs(api): update OpenAPI spec for quotation endpoints
chore(deps): bump next from 16.0.0 to 16.1.0
```

### Available Scripts

```bash
pnpm dev           # Start all development servers
pnpm build         # Build all packages and apps
pnpm lint          # Lint all workspaces
pnpm typecheck     # Type-check all workspaces
pnpm test          # Run unit tests
pnpm test:e2e      # Run Playwright end-to-end tests
pnpm format        # Format all files with Prettier
pnpm clean         # Remove all build artifacts and node_modules
pnpm db:generate   # Generate Drizzle ORM types
pnpm db:migrate    # Run pending migrations
pnpm db:studio     # Open Drizzle Studio
```

---

## 🚢 Deployment

### Production

Production deployments are triggered automatically on merge to `main` via GitHub Actions. The workflow:

1. Runs lint, typecheck, and unit tests
2. Builds the Next.js application
3. Deploys to Vercel Production
4. Runs Supabase migrations against the production database
5. Runs smoke tests against the production URL

### Staging

Staging deployments trigger on merge to `staging`. The workflow mirrors production but targets the staging Vercel environment and staging Supabase project.

### Environment Variables

All secrets are managed via:
- **Vercel Dashboard** → Environment Variables (for `apps/web`)
- **GitHub Secrets** → For CI/CD workflows
- **Supabase Vault** → For Edge Function secrets

See [docs/guides/deployment.md](docs/guides/deployment.md) for detailed deployment documentation.

---

## 🤝 Contributing

1. Fork or branch from `develop`
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the code style guide
4. Write/update tests as needed
5. Run `pnpm lint && pnpm typecheck && pnpm test`
6. Commit using Conventional Commits format
7. Push and open a Pull Request against `develop`
8. Fill in the PR template completely
9. Request review from at least one CODEOWNER

See [docs/guides/contributing.md](docs/guides/contributing.md) for the full contributing guide.

---

## 📜 License

**Proprietary and Confidential**

Copyright © 2024–2025 Aquagri Processing Pvt Ltd. All rights reserved.

This software and its source code are the exclusive property of Aquagri Processing Pvt Ltd. Unauthorized copying, distribution, modification, or use of any part of this software, via any medium, is strictly prohibited without the express written permission of Aquagri Processing Pvt Ltd.

---

## 📞 Contact

| Role | Contact |
|---|---|
| **CTO / Platform Owner** | [tech@aquacolloids.com](mailto:tech@aquacolloids.com) |
| **Commercial Lead** | [commercial@aquacolloids.com](mailto:commercial@aquacolloids.com) |
| **Website** | [aquacolloids.com](https://aquacolloids.com) |
