# Empire Dashboard

A Next.js + Supabase PWA for managing a portfolio of AI-operated businesses — installable on iPhone, real-time task sync, dual views (full empire + family-friendly legacy view).

> Built for micro-conglomerate operators running multiple AI-assisted ventures.

![Screenshot placeholder](docs/screenshot.png)

## Quick Start

```bash
git clone https://github.com/your-username/empire-dashboard
cd empire-dashboard
npm install
cp .env.local.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app works immediately without Supabase — it shows seed data so you can see the UI. The "Offline mode" badge disappears once you connect Supabase.

## Supabase Setup

See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for full instructions including SQL schema and seed data.

Create a free Supabase project at [supabase.com](https://supabase.com), run the schema, and add two env vars.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fempire-dashboard&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Get%20these%20from%20your%20Supabase%20project%20Settings%20%3E%20API&envLink=https%3A%2F%2Fsupabase.com)

After deploying, add your Supabase env vars in **Vercel > Settings > Environment Variables**.

## Features

- **Empire view** — full portfolio with all ventures, grouped by status
- **Legacy view** — filtered view for sharing with family (set `visibility: 'both'` on a business)
- **Business cards** — status badge, category, description, key metrics
- **Task lists** — per-business tasks with real-time Supabase updates
- **PWA** — installable on iPhone from Safari (amber theme)
- **Offline seed data** — works without Supabase, falls back to static data

## Stack

- [Next.js 15](https://nextjs.org) — App Router, server components
- [Supabase](https://supabase.com) — Postgres + real-time subscriptions
- [Tailwind CSS](https://tailwindcss.com) — dark zinc theme
- [TypeScript](https://typescriptlang.org)

## Business Data Model

```ts
interface Business {
  id: string
  name: string
  slug: string
  description: string
  status: 'active' | 'pre-launch' | 'research' | 'idea' | 'paused' | 'scratched'
  category: string
  visibility: 'empire' | 'legacy' | 'both'
  metrics: Record<string, string | number>
}
```

## Roadmap

- [ ] Business detail pages with full task management
- [ ] Task creation / completion from the dashboard
- [ ] Weekly digest email via Resend
- [ ] Metrics widgets (MRR, pipeline, next action)
- [ ] Auth (Supabase Auth) for multi-user access
- [ ] Obsidian vault sync via GitHub Actions

---

Built with Claude Code.
