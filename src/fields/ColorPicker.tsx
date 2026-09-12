'use client'

import type { TextFieldClientComponent } from 'payload'
import { FieldLabel, useField } from '@payloadcms/ui'
import React from 'react'

function toSwatch(value: string | null | undefined): string {
  const raw = (value || '').trim()
  if (/^#([0-9a-fA-F]{6})$/.test(raw)) return raw
  if (/^#([0-9a-fA-F]{3})$/.test(raw)) {
    return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
  }
  return '#000000'
}

export const ColorPicker: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField<string>({ path })
  const text = typeof value === 'string' ? value : ''

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} path={path} required={Boolean(field.required)} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          aria-label={`${typeof field.label === 'string' ? field.label : 'Color'} swatch`}
          onChange={(event) => setValue(event.target.value)}
          style={{
            width: 44,
            height: 38,
            padding: 2,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 4,
            background: 'transparent',
            cursor: 'pointer',
          }}
          type="color"
          value={toSwatch(text)}
        />
        <input
          className="input"
          onChange={(event) => setValue(event.target.value)}
          placeholder="#0b1c2c"
          style={{ flex: 1 }}
          type="text"
          value={text}
        />
      </div>
    </div>
  )
}
