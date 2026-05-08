export type BusinessStatus = 'active' | 'paused' | 'scratched' | 'research' | 'pre-launch' | 'idea'
export type BusinessVisibility = 'empire' | 'legacy' | 'both'
export type TaskStatus = 'pending' | 'in_progress' | 'complete'
export type TaskPriority = 'low' | 'medium' | 'high' | 'asap'

export interface Business {
  id: string
  name: string
  slug: string
  description: string
  status: BusinessStatus
  category: string
  visibility: BusinessVisibility
  metrics: Record<string, string | number>
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  business_id: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface BusinessWithTasks extends Business {
  tasks?: Task[]
}
