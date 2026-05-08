import { BusinessCard } from '@/components/BusinessCard'
import { SEED_BUSINESSES } from '@/data/businesses'
import { fetchBusinesses, isSupabaseConnected } from '@/lib/supabase'
import type { Business } from '@/types'

// Root route = Legacy (public) view — shows ventures visible to Ethan's dad.
// Empire (private) view is at /empire — local use only.

export default async function LegacyPage() {
  let businesses: Business[] = []

  if (isSupabaseConnected) {
    businesses = await fetchBusinesses('legacy')
  }

  // Fall back to seed data filtered to legacy-visible businesses
  if (businesses.length === 0) {
    businesses = SEED_BUSINESSES.filter((b) =>
      ['legacy', 'both'].includes(b.visibility)
    )
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const totalVentures = businesses.length
  const stageCounts: Record<string, number> = {}
  businesses.forEach((b) => {
    stageCounts[b.status] = (stageCounts[b.status] ?? 0) + 1
  })

  const stageOrder = ['active', 'pre-launch', 'research', 'idea', 'paused', 'scratched']
  const stageLabels: Record<string, string> = {
    active: 'Active',
    'pre-launch': 'Pre-Launch',
    research: 'Research',
    idea: 'Idea',
    paused: 'Paused',
    scratched: 'Scratched',
  }
  const stageColors: Record<string, string> = {
    active:       'var(--stage-launched)',
    'pre-launch': 'var(--stage-pre-launch)',
    research:     'var(--stage-research)',
    idea:         'var(--stage-idea)',
    paused:       'var(--stage-paused)',
    scratched:    'var(--stage-shelved)',
  }

  const stageBreakdown = stageOrder.filter((s) => stageCounts[s])

  return (
    <>
      {/* Google Fonts — DM Sans + Instrument Serif */}
      {/* (loaded via layout.tsx next/font; keeping style below as fallback) */}

      <header style={{ padding: '36px 36px 0', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '6px',
          opacity: 0.85,
        }}>
          Shared Portfolio
        </div>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '4px' }}>
          <h1 style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: '28px',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.3px',
            color: 'var(--text-primary)',
            lineHeight: 1,
            margin: 0,
          }}>
            Spencer Ventures
          </h1>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>
            {today}
          </span>
        </div>

        {/* Summary strip */}
        <div style={{
          display: 'flex',
          marginTop: '18px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          {/* Total */}
          <div style={{ flex: 1, padding: '14px 20px', borderRight: '1px solid var(--border-subtle)', minWidth: 0 }}>
            <div style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '4px' }}>
              {totalVentures}
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500 }}>
              Ventures
            </div>
          </div>

          {/* By Stage */}
          <div style={{ flex: 2.5, padding: '14px 20px', borderRight: '1px solid var(--border-subtle)', minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {stageBreakdown.map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: '4px', fontSize: '12px', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: stageColors[s] }}>{stageCounts[s]}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{stageLabels[s]}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, marginTop: '4px' }}>
              By Stage
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '20px 36px 56px', maxWidth: '1440px', margin: '0 auto' }}>
        {businesses.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '72px 0', fontSize: '14px' }}>
            No ventures visible yet.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '10px',
            alignItems: 'start',
          }}>
            {businesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
