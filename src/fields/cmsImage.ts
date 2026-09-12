import type { Field } from 'payload'

type ImageFieldOptions = {
  uploadName?: string
  pathName?: string
  altName?: string
  condition?: (data: unknown, siblingData: Record<string, unknown>) => boolean
  requiredPath?: boolean
  pathDescription?: string
}

export function cmsImageFields(options: ImageFieldOptions = {}): Field[] {
  const uploadName = options.uploadName || 'imageUpload'
  const pathName = options.pathName || 'image'
  const altName = options.altName || 'imageAlt'
  const condition = options.condition as Field['admin'] extends { condition?: infer C }
    ? C
    : undefined

  return [
    {
      name: uploadName,
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload (preferred). You can crop/focal-point the file in Media.',
        condition,
      },
    },
    {
      name: pathName,
      type: 'text',
      required: options.requiredPath,
      admin: {
        description: options.pathDescription || 'Or public path, e.g. /img/… (used if no upload)',
        condition,
      },
    },
    {
      name: altName,
      type: 'text',
      admin: {
        description: 'Alt text. Falls back to the Media alt if empty.',
        condition,
      },
    },
  ]
}
