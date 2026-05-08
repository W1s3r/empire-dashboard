import { BusinessCard } from '@/components/BusinessCard'
import { SEED_BUSINESSES } from '@/data/businesses'
import { fetchBusinesses, isSupabaseConnected } from '@/lib/supabase'
import type { Business } from '@/types'
import Link from 'next/link'

export default async function LegacyPage() {
  let businesses: Business[] = []

  if (isSupabaseConnected) {
    businesses = await fetchBusinesses('legacy')
  }

  // Legacy view: only show businesses visible to dad (visibility: 'legacy' | 'both')
  if (businesses.length === 0) {
    businesses = SEED_BUSINESSES.filter((b) =>
      ['legacy', 'both'].includes(b.visibility)
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Spencer Ventures
            </h1>
            <p className="text-xs text-zinc-500">Portfolio overview</p>
          </div>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Full Empire →
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {businesses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500 text-sm">
              No ventures visible in legacy view yet.
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              Set a business visibility to &quot;legacy&quot; or &quot;both&quot; to show it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {businesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
