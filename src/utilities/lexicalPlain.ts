type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

export function lexicalPlainText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as { root?: LexicalNode }).root
  const parts: string[] = []

  const walk = (node: LexicalNode | undefined) => {
    if (!node) return
    if (typeof node.text === 'string' && node.text) parts.push(node.text)
    node.children?.forEach(walk)
  }

  walk(root)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

export function lexicalParagraphs(texts: string[]) {
  return {
    root: {
      type: 'root',
      children: texts.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
