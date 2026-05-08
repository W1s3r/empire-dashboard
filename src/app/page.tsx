import { BusinessCard } from '@/components/BusinessCard'
import { SEED_BUSINESSES } from '@/data/businesses'
import { fetchBusinesses, isSupabaseConnected } from '@/lib/supabase'
import type { Business } from '@/types'
import Link from 'next/link'

export default async function EmpirePage() {
  let businesses: Business[] = []

  if (isSupabaseConnected) {
    businesses = await fetchBusinesses('empire')
  }

  // Fall back to seed data if Supabase isn't configured yet
  if (businesses.length === 0) {
    businesses = SEED_BUSINESSES
  }

  const active = businesses.filter((b) =>
    ['active', 'pre-launch'].includes(b.status)
  )
  const inProgress = businesses.filter((b) =>
    ['research'].includes(b.status)
  )
  const early = businesses.filter((b) =>
    ['idea', 'paused', 'scratched'].includes(b.status)
  )

  const totalVentures = businesses.length
  const activeCount = active.length + inProgress.length

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Empire
            </h1>
            <p className="text-xs text-zinc-500">
              {activeCount} active · {totalVentures} ventures
            </p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/legacy"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Legacy View
            </Link>
            {!isSupabaseConnected && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-400 ring-1 ring-amber-500/30">
                Offline mode
              </span>
            )}
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Active & Pre-Launch */}
        {active.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Active & Pre-Launch
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </section>
        )}

        {/* Research */}
        {inProgress.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Research & Development
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgress.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </section>
        )}

        {/* Ideas & Backlog */}
        {early.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Ideas & Backlog
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {early.map((biz) => (
                <BusinessCard key={biz.id} business={biz} />
              ))}
            </div>
          </section>
        )}

        {!isSupabaseConnected && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <p className="text-sm text-amber-400 font-medium mb-1">
              Running on seed data
            </p>
            <p className="text-sm text-zinc-500">
              Connect Supabase to enable real-time sync and live task management.
              See{' '}
              <code className="text-zinc-400 bg-zinc-800 px-1 rounded">
                SUPABASE_SETUP.md
              </code>{' '}
              for instructions.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
