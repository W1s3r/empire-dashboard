// Empire view — private/local use only. Not linked from the public Legacy dashboard.
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

  if (businesses.length === 0) {
    businesses = SEED_BUSINESSES
  }

  const active = businesses.filter((b) => ['active', 'pre-launch'].includes(b.status))
  const inProgress = businesses.filter((b) => b.status === 'research')
  const early = businesses.filter((b) => ['idea', 'paused', 'scratched'].includes(b.status))
  const totalVentures = businesses.length
  const activeCount = active.length + inProgress.length

  return (
    <>
      <header style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-raised)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: '20px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}>
              Empire
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {activeCount} active · {totalVentures} ventures
            </div>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              href="/"
              style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              ← Legacy View
            </Link>
            {!isSupabaseConnected && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                color: 'var(--accent)',
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent-border)',
              }}>
                Offline mode
              </span>
            )}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 36px 56px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {active.length > 0 && (
            <section>
              <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-faint)', marginBottom: '14px' }}>
                Active &amp; Pre-Launch
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '10px', alignItems: 'start' }}>
                {active.map((biz) => <BusinessCard key={biz.id} business={biz} />)}
              </div>
            </section>
          )}

          {inProgress.length > 0 && (
            <section>
              <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-faint)', marginBottom: '14px' }}>
                Research &amp; Development
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '10px', alignItems: 'start' }}>
                {inProgress.map((biz) => <BusinessCard key={biz.id} business={biz} />)}
              </div>
            </section>
          )}

          {early.length > 0 && (
            <section>
              <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-faint)', marginBottom: '14px' }}>
                Ideas &amp; Backlog
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '10px', alignItems: 'start' }}>
                {early.map((biz) => <BusinessCard key={biz.id} business={biz} />)}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  )
}
