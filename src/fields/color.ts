import type { TextField } from 'payload'

export const colorField = (
  name: string,
  label: string,
  options?: { defaultValue?: string; description?: string },
): TextField => ({
  name,
  type: 'text',
  label,
  defaultValue: options?.defaultValue,
  admin: {
    description: options?.description,
    components: {
      Field: '@/fields/ColorPicker#ColorPicker',
    },
  },
})
