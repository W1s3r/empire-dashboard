import { createClient } from '@supabase/supabase-js'
import type { Business, Task } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Returns null if env vars aren't set yet — app falls back to seed data
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isSupabaseConnected = Boolean(supabase)

// Fetch all businesses, optionally filtered by visibility
export async function fetchBusinesses(visibility?: 'empire' | 'legacy'): Promise<Business[]> {
  if (!supabase) return []

  let query = supabase.from('businesses').select('*').order('name')

  if (visibility === 'legacy') {
    query = query.in('visibility', ['legacy', 'both'])
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching businesses:', error)
    return []
  }
  return data as Business[]
}

// Fetch tasks for a specific business
export async function fetchTasks(businessId: string): Promise<Task[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('business_id', businessId)
    .order('due_date', { ascending: true })

  if (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
  return data as Task[]
}

// Subscribe to real-time task changes for a business
export function subscribeToTasks(
  businessId: string,
  callback: (tasks: Task[]) => void
) {
  if (!supabase) return () => {}

  const channel = supabase
    .channel(`tasks:${businessId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `business_id=eq.${businessId}`,
      },
      async () => {
        const tasks = await fetchTasks(businessId)
        callback(tasks)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
