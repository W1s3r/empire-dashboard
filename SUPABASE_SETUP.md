# Supabase Setup

## Step 1: Create a Free Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New project**
3. Choose your organization, name it `empire-dashboard`, pick a region (US East recommended), set a database password, and click **Create new project**
4. Wait ~2 minutes for provisioning

## Step 2: Create the Tables

Go to **SQL Editor** in the left sidebar and run:

```sql
-- Enable UUID extension (usually already enabled)
create extension if not exists "pgcrypto";

-- Businesses table
create table businesses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  status text default 'active', -- active | paused | scratched | research | pre-launch | idea
  category text,
  visibility text default 'empire', -- empire | legacy | both
  metrics jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references businesses(id) on delete cascade,
  title text not null,
  status text default 'pending', -- pending | in_progress | complete
  priority text default 'medium', -- low | medium | high | asap
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger businesses_updated_at
  before update on businesses
  for each row execute function update_updated_at();

create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();
```

## Step 3: Enable Realtime

Go to **Database > Replication** and enable replication for the `tasks` table (so the TaskList component gets live updates).

## Step 4: Seed Your Businesses

Run this in the SQL Editor to import the seed data (or import manually):

```sql
insert into businesses (name, slug, description, status, category, visibility, metrics) values
  ('Smart Strap', 'smart-strap', 'Aftermarket gesture-sensing smartwatch band using EMG + IMU sensors.', 'research', 'Hardware / Wearables', 'empire', '{"stage": "Concept Design", "priority": "medium"}'),
  ('Patent Launch', 'patent-launch', 'Affordable AI-powered patent drafting and filing service.', 'pre-launch', 'Legal Tech / SaaS', 'empire', '{"entity": "Patent Launch LLC (VA)", "website": "patentlaun.ch"}'),
  ('Bitter Litter', 'bitter-litter', 'Cat litter pre-infused with quassia extract to deter dogs from eating litter box contents.', 'research', 'CPG / Pet Products', 'empire', '{"stage": "Phase 0 — Validation", "priority": "high"}'),
  ('MXAI', 'mxai', 'AI-powered live mixing assistant for the Behringer X32.', 'active', 'Audio Tech / AI', 'empire', '{"stack": "FastAPI + Claude API + OSC"}'),
  ('SMART TECH', 'smart-tech', 'Spatial smart home control company. Parent entity for Smart Strap hardware line.', 'pre-launch', 'Hardware / Smart Home', 'empire', '{"entity": "Smart Home Tech, LLC (VA)"}'),
  ('LaunchAI', 'launch-ai', 'AI-powered business launch assistance — iOS/watchOS app concept.', 'idea', 'SaaS / Mobile', 'empire', '{"stage": "On hold"}'),
  ('Cedar Mountain Farm', 'cedar-mountain-farm', 'Premium wedding venue on 300-acre property in Culpeper County, VA.', 'research', 'Real Estate / Events', 'both', '{"listing": "MLS #VACU2010668", "asking_price": "$3M"}'),
  ('LocalWebDev', 'local-web-dev', 'Freelance website redesign service targeting small-to-mid businesses in Old Town Alexandria, VA.', 'idea', 'Freelance / Web Dev', 'empire', '{"stage": "Pre-outreach"}');
```

## Step 5: Get Your API Keys

Go to **Settings > API** in the Supabase dashboard:

- **Project URL** — looks like `https://xyzxyzxyz.supabase.co`
- **Project API Keys > anon/public** — the public key

## Step 6: Add to Your Project

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Restart the dev server (`npm run dev`) — the "Offline mode" banner will disappear and data will load from Supabase.

## Step 7: Deploy to Vercel

Add the same two env vars in your Vercel project's **Settings > Environment Variables** before deploying.
