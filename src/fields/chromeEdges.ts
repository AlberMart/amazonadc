import type { Field } from 'payload'

/** Hairlines on Header / Footer — portable chrome, not a domain toggle. */
export const headerBottomEdgeField: Field = {
  name: 'bottomEdge',
  type: 'select',
  label: 'Bottom edge',
  defaultValue: 'none',
  options: [
    { label: 'None', value: 'none' },
    { label: 'Hairline', value: 'hairline' },
    { label: 'Hairline after scroll', value: 'scrolled' },
  ],
  admin: {
    description: 'Line under the header. “After scroll” appears only once the page has moved.',
  },
}

export const footerTopEdgeField: Field = {
  name: 'topEdge',
  type: 'select',
  label: 'Top edge',
  defaultValue: 'none',
  options: [
    { label: 'None', value: 'none' },
    { label: 'Hairline', value: 'hairline' },
  ],
  admin: {
    description: 'Line above the footer, between the last page section and the footer.',
  },
}
