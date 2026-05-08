'use client'

import { useEffect, useState } from 'react'
import type { Task } from '@/types'
import { fetchTasks, subscribeToTasks } from '@/lib/supabase'

interface TaskListProps {
  businessId: string
  seedTasks?: Task[]
}

const PRIORITY_COLORS: Record<string, string> = {
  asap: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-amber-400',
  low: 'text-zinc-500',
}

const STATUS_ICONS: Record<string, string> = {
  pending: '○',
  in_progress: '◑',
  complete: '●',
}

export function TaskList({ businessId, seedTasks = [] }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchTasks(businessId).then((fetched) => {
      if (!cancelled) {
        setTasks(fetched.length > 0 ? fetched : seedTasks)
        setLoading(false)
      }
    })

    const unsubscribe = subscribeToTasks(businessId, (updated) => {
      if (!cancelled) setTasks(updated)
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId])

  const pending = tasks.filter((t) => t.status !== 'complete')
  const done = tasks.filter((t) => t.status === 'complete')

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 rounded-lg bg-zinc-800 animate-pulse" />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-zinc-600 italic">No tasks yet.</p>
    )
  }

  return (
    <div className="space-y-1">
      {pending.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-2.5 rounded-lg px-3 py-2 hover:bg-zinc-800/60 transition-colors group"
        >
          <span className="mt-0.5 text-zinc-600 group-hover:text-zinc-500 font-mono text-xs">
            {STATUS_ICONS[task.status]}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-zinc-300 leading-snug">{task.title}</p>
            {task.due_date && (
              <p className="text-xs text-zinc-600 mt-0.5">
                Due {new Date(task.due_date).toLocaleDateString()}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 text-xs font-medium uppercase tracking-wide ${PRIORITY_COLORS[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      ))}

      {done.length > 0 && (
        <details className="mt-2">
          <summary className="text-xs text-zinc-600 cursor-pointer hover:text-zinc-500 px-3 py-1">
            {done.length} completed
          </summary>
          <div className="mt-1 space-y-1">
            {done.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-2.5 rounded-lg px-3 py-2 opacity-50"
              >
                <span className="mt-0.5 text-zinc-500 font-mono text-xs">●</span>
                <p className="text-sm text-zinc-500 line-through leading-snug">
                  {task.title}
                </p>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
