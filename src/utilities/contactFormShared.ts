export type PublicFormField = {
  blockType: string
  name?: string
  label?: string
  required?: boolean
  width?: number
  defaultValue?: string | number | boolean
  placeholder?: string
  options?: { label: string; value: string }[]
  message?: string
}

export type PublicForm = {
  id: number
  title: string
  submitButtonLabel: string
  confirmationType: 'message' | 'redirect'
  confirmationMessage: string
  redirectUrl?: string
  fields: PublicFormField[]
}

export const FALLBACK_CONTACT_FIELDS: PublicFormField[] = [
  { blockType: 'text', name: 'name', label: 'Full name', required: true, width: 50 },
  { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
  { blockType: 'text', name: 'phone', label: 'Phone', required: true, width: 100 },
  { blockType: 'text', name: 'address', label: 'Address', required: false, width: 100 },
  { blockType: 'textarea', name: 'message', label: 'Message', required: true, width: 100 },
]

export function fieldColClass(width?: number) {
  const value = width || 100
  if (value <= 25) return 'sm:col-span-3'
  if (value <= 33) return 'sm:col-span-4'
  if (value <= 50) return 'sm:col-span-6'
  if (value <= 66) return 'sm:col-span-8'
  return 'sm:col-span-12'
}

export function pickFieldValue(
  values: Record<string, string>,
  names: string[],
): string | undefined {
  for (const name of names) {
    const value = values[name]?.trim()
    if (value) return value
  }
  return undefined
}
