import type { Business } from '@/types'

// Seed data — used as fallback before Supabase is connected.
// Reflects Ethan's current venture portfolio as of May 2026.
export const SEED_BUSINESSES: Business[] = [
  {
    id: 'seed-1',
    name: 'Smart Strap',
    slug: 'smart-strap',
    description:
      'Aftermarket gesture-sensing smartwatch band using EMG + IMU sensors. Adds gesture-based smart home control to existing Apple Watch / Galaxy Watch.',
    status: 'research',
    category: 'Hardware / Wearables',
    visibility: 'both',
    metrics: {
      stage: 'Concept Design',
      priority: 'medium',
    },
    created_at: '2026-04-30T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-2',
    name: 'Patent Launch',
    slug: 'patent-launch',
    description:
      'Affordable AI-powered patent drafting and filing service for independent inventors, startups, and small businesses.',
    status: 'pre-launch',
    category: 'Legal Tech / SaaS',
    visibility: 'both',
    metrics: {
      entity: 'Patent Launch LLC (VA)',
      website: 'patentlaun.ch',
      ein: '42-2218518',
    },
    created_at: '2026-03-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-3',
    name: 'Bitter Litter',
    slug: 'bitter-litter',
    description:
      'Cat litter pre-infused with quassia extract to deter dogs from eating litter box contents. Natural, passive solution for ~22M US households with both dogs and cats.',
    status: 'research',
    category: 'CPG / Pet Products',
    visibility: 'empire',
    metrics: {
      stage: 'Phase 0 — Validation',
      priority: 'high',
    },
    created_at: '2026-04-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-4',
    name: 'MXAI',
    slug: 'mxai',
    description:
      'AI-powered live mixing assistant for the Behringer X32. Uses Claude to analyze audio in real-time and make intelligent mixing decisions via OSC.',
    status: 'active',
    category: 'Audio Tech / AI',
    visibility: 'empire',
    metrics: {
      stack: 'FastAPI + Claude API + OSC',
      priority: 'medium',
    },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-5',
    name: 'SMART TECH',
    slug: 'smart-tech',
    description:
      'Spatial smart home control company — AR/spatial interfaces for controlling smart home devices. Virginia LLC. Parent entity for Smart Strap hardware line.',
    status: 'pre-launch',
    category: 'Hardware / Smart Home',
    visibility: 'both',
    metrics: {
      entity: 'Smart Home Tech, LLC (VA)',
      priority: 'medium',
    },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-6',
    name: 'LaunchAI',
    slug: 'launch-ai',
    description:
      'AI-powered business launch assistance — iOS/watchOS app concept. Explores AI-driven startup guidance for early-stage founders.',
    status: 'idea',
    category: 'SaaS / Mobile',
    visibility: 'both',
    metrics: {
      priority: 'low',
      stage: 'On hold',
    },
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-7',
    name: 'Cedar Mountain Farm',
    slug: 'cedar-mountain-farm',
    description:
      'Premium wedding venue on 300-acre property in Culpeper County, VA (~1.25 hrs from DC). $3M acquisition target with Cate as in-house coordinator.',
    status: 'research',
    category: 'Real Estate / Events',
    visibility: 'empire',
    metrics: {
      listing: 'MLS #VACU2010668',
      asking_price: '$3M',
      priority: 'medium',
    },
    created_at: '2026-04-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
  {
    id: 'seed-8',
    name: 'LocalWebDev',
    slug: 'local-web-dev',
    description:
      'Freelance website redesign service targeting small-to-mid businesses in Old Town Alexandria, VA. AI-assisted design workflow for rapid delivery.',
    status: 'idea',
    category: 'Freelance / Web Dev',
    visibility: 'empire',
    metrics: {
      priority: 'medium',
      stage: 'Pre-outreach',
    },
    created_at: '2026-03-01T00:00:00Z',
    updated_at: '2026-05-05T00:00:00Z',
  },
]

export const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  'pre-launch': 'Pre-Launch',
  research: 'Research',
  idea: 'Idea',
  paused: 'Paused',
  scratched: 'Scratched',
}

export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30',
  'pre-launch': 'bg-amber-500/20 text-amber-300 ring-amber-500/30',
  research: 'bg-blue-500/20 text-blue-300 ring-blue-500/30',
  idea: 'bg-purple-500/20 text-purple-300 ring-purple-500/30',
  paused: 'bg-zinc-500/20 text-zinc-400 ring-zinc-500/30',
  scratched: 'bg-red-500/20 text-red-400 ring-red-500/30',
}
