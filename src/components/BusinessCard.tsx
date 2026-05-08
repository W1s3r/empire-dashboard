'use client'

import type { Business } from '@/types'
import { STATUS_COLORS, STATUS_LABELS } from '@/data/businesses'

interface BusinessCardProps {
  business: Business
  onClick?: () => void
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const statusColor = STATUS_COLORS[business.status] ?? STATUS_COLORS.paused
  const statusLabel = STATUS_LABELS[business.status] ?? business.status

  const metricEntries = Object.entries(business.metrics).filter(
    ([key]) => !['priority', 'stage'].includes(key)
  )

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl bg-zinc-900 border border-zinc-800 p-5 transition-all duration-200 hover:border-amber-500/40 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-white text-base leading-tight truncate">
            {business.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">{business.category}</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
        {business.description}
      </p>

      {/* Metrics */}
      {metricEntries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metricEntries.slice(0, 3).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
            >
              <span className="text-zinc-600 capitalize">
                {key.replace(/_/g, ' ')}:
              </span>
              <span className="text-zinc-300 truncate max-w-[120px]">
                {String(value)}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      {business.metrics.stage && (
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <p className="text-xs text-zinc-600">
            Stage:{' '}
            <span className="text-zinc-400">{business.metrics.stage}</span>
          </p>
        </div>
      )}
    </button>
  )
}
