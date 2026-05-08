'use client'

import { useState } from 'react'
import type { Business } from '@/types'

interface BusinessCardProps {
  business: Business
}

const STAGE_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  active:       { color: 'var(--stage-launched)',   bg: 'var(--stage-launched-bg)',   label: 'Active' },
  'pre-launch': { color: 'var(--stage-pre-launch)', bg: 'var(--stage-pre-launch-bg)', label: 'Pre-Launch' },
  research:     { color: 'var(--stage-research)',   bg: 'var(--stage-research-bg)',   label: 'Research' },
  idea:         { color: 'var(--stage-idea)',        bg: 'var(--stage-idea-bg)',        label: 'Idea' },
  paused:       { color: 'var(--stage-paused)',      bg: 'var(--stage-paused-bg)',      label: 'Paused' },
  scratched:    { color: 'var(--stage-shelved)',     bg: 'var(--stage-shelved-bg)',     label: 'Scratched' },
}

const PRIORITY_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  high:   { color: 'var(--priority-high)',   bg: 'oklch(50% 0.18 25 / 0.10)',  label: 'High' },
  medium: { color: 'var(--priority-medium)', bg: 'oklch(52% 0.14 72 / 0.10)',  label: 'Mid' },
  low:    { color: 'var(--priority-low)',    bg: 'oklch(52% 0.010 60 / 0.10)', label: 'Low' },
  asap:   { color: 'var(--priority-high)',   bg: 'oklch(50% 0.18 25 / 0.10)',  label: 'ASAP' },
}

export function BusinessCard({ business }: BusinessCardProps) {
  const [expanded, setExpanded] = useState(false)

  const stage = STAGE_STYLE[business.status] ?? STAGE_STYLE['idea']
  const priorityKey = String(business.metrics?.priority ?? 'medium')
  const priority = PRIORITY_STYLE[priorityKey] ?? PRIORITY_STYLE['medium']

  const metricEntries = Object.entries(business.metrics).filter(
    ([key]) => !['priority', 'stage'].includes(key)
  )

  const entity = business.metrics?.entity as string | undefined
  const website = business.metrics?.website as string | undefined

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${expanded ? 'var(--accent-border)' : 'var(--border)'}`,
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 1px 4px oklch(40% 0.012 60 / 0.06), 0 3px 10px oklch(40% 0.012 60 / 0.05)',
        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.25s, transform 0.25s',
      }}
      onClick={() => setExpanded((e) => !e)}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'var(--bg-card-hover)'
        el.style.boxShadow = '0 6px 24px oklch(40% 0.015 60 / 0.10), 0 2px 6px oklch(40% 0.015 60 / 0.07)'
        el.style.transform = 'translateY(-2px)'
        if (!expanded) el.style.borderColor = 'var(--border-focus)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = 'var(--bg-card)'
        el.style.boxShadow = '0 1px 4px oklch(40% 0.012 60 / 0.06), 0 3px 10px oklch(40% 0.012 60 / 0.05)'
        el.style.transform = 'translateY(0)'
        el.style.borderColor = expanded ? 'var(--accent-border)' : 'var(--border)'
      }}
    >
      {/* Card Header */}
      <div style={{ padding: '16px 18px 14px' }}>
        {/* Top row: priority · name · stage badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '2px 6px',
            borderRadius: '3px',
            flexShrink: 0,
            color: priority.color,
            background: priority.bg,
          }}>
            {priority.label}
          </span>
          <span style={{
            fontSize: '14.5px',
            fontWeight: 500,
            letterSpacing: '-0.15px',
            flex: 1,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            {business.name}
          </span>
          <span style={{
            fontSize: '9.5px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '4px',
            flexShrink: 0,
            color: stage.color,
            background: stage.bg,
          }}>
            {stage.label}
          </span>
        </div>

        {/* Entity line */}
        {entity && (
          <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '8px', fontStyle: 'italic' }}>
            {entity}
          </div>
        )}

        {/* Description / one-liner */}
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px', maxWidth: '65ch' }}>
          {business.description}
        </div>

        {/* Category chip */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          fontSize: '12px',
          color: 'var(--text-muted)',
          padding: '6px 10px',
          background: 'oklch(93% 0.014 68 / 0.75)',
          borderRadius: '6px',
        }}>
          <span style={{ color: 'var(--accent)', fontSize: '11px', opacity: 0.8 }}>→</span>
          <span>{business.category}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div style={{
        padding: '9px 18px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
          {metricEntries.slice(0, 3).map(([key, value]) => (
            <span key={key} style={{
              fontSize: '10px',
              color: 'var(--text-faint)',
              background: 'oklch(92% 0.012 65 / 0.75)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 7px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
            }}>
              {key.replace(/_/g, ' ')}: {String(value)}
            </span>
          ))}
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {new Date(business.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Expand toggle */}
      <button
        style={{
          display: 'flex',
          width: '100%',
          padding: '5px 0',
          background: 'none',
          border: 'none',
          borderTop: '1px solid var(--border-subtle)',
          cursor: 'pointer',
          color: expanded ? 'var(--accent)' : 'var(--text-faint)',
          fontSize: '11px',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          fontFamily: 'inherit',
          fontWeight: 400,
          letterSpacing: '0.04em',
          transition: 'color 0.15s, background 0.15s',
        }}
        onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
      >
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.22s',
          fontSize: '10px',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>▾</span>
        <span>{expanded ? 'Collapse' : 'Details'}</span>
      </button>

      {/* Expanded Detail */}
      {expanded && (
        <div style={{
          background: 'var(--bg-detail)',
          borderTop: '1px solid var(--border-subtle)',
          animation: 'revealDetail 0.28s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          <style>{`@keyframes revealDetail { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:translateY(0) } }`}</style>
          <div style={{ padding: '18px 18px 20px' }}>
            {/* Metrics */}
            {metricEntries.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-faint)', marginBottom: '8px' }}>
                  Metrics
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {metricEntries.map(([key, value]) => (
                    <div key={key} style={{
                      background: 'var(--bg-chip)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '7px 12px',
                      minWidth: '80px',
                    }}>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: '3px' }}>
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Website link */}
            {website && (
              <div>
                <div style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-faint)', marginBottom: '8px' }}>
                  Website
                </div>
                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    padding: '5px 11px',
                    background: 'var(--accent-dim)',
                    borderRadius: '5px',
                    border: '1px solid var(--accent-border)',
                    fontWeight: 500,
                  }}
                >
                  ↗ {website}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
