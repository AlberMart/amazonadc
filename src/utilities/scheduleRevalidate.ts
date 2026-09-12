import { after } from 'next/server'

/**
 * Run cache revalidation after the current admin/API response finishes.
 * Calling revalidatePath during Payload afterChange races the still-open
 * DB pool (Home publish can take a minute) and 500s the public layout.
 */
export function scheduleRevalidate(task: () => void) {
  try {
    after(task)
  } catch {
    setTimeout(task, 0)
  }
}
