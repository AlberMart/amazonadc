'use client'

import React, { useEffect, useId, useState } from 'react'

type A11yState = {
  text: 'default' | 'large' | 'xl'
  contrast: boolean
  underline: boolean
  motion: boolean
}

const STORAGE_KEY = 'site-a11y'
const defaultState: A11yState = {
  text: 'default',
  contrast: false,
  underline: false,
  motion: false,
}

function readState(): A11yState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<A11yState>
    return {
      text: parsed.text === 'large' || parsed.text === 'xl' ? parsed.text : 'default',
      contrast: Boolean(parsed.contrast),
      underline: Boolean(parsed.underline),
      motion: Boolean(parsed.motion),
    }
  } catch {
    return defaultState
  }
}

function applyState(state: A11yState) {
  const root = document.documentElement
  root.setAttribute('data-a11y-text', state.text)
  root.toggleAttribute('data-a11y-contrast', state.contrast)
  root.toggleAttribute('data-a11y-underline', state.underline)
  root.toggleAttribute('data-a11y-motion', state.motion)
}

export function AccessibilityWidget() {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<A11yState>(defaultState)

  useEffect(() => {
    const next = readState()
    setState(next)
    applyState(next)
  }, [])

  function update(patch: Partial<A11yState>) {
    setState((prev) => {
      const next = { ...prev, ...patch }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      applyState(next)
      return next
    })
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY)
    setState(defaultState)
    applyState(defaultState)
  }

  return (
    <div className="site-a11y">
      <button
        type="button"
        className="site-a11y-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        Accessibility
      </button>
      {open ? (
        <div id={panelId} className="site-a11y-panel" role="dialog" aria-label="Accessibility options">
          <p className="site-a11y-title">Accessibility</p>
          <div className="site-a11y-row">
            <span>Text size</span>
            <div className="site-a11y-btns">
              <button type="button" aria-pressed={state.text === 'default'} onClick={() => update({ text: 'default' })}>
                A
              </button>
              <button type="button" aria-pressed={state.text === 'large'} onClick={() => update({ text: 'large' })}>
                A+
              </button>
              <button type="button" aria-pressed={state.text === 'xl'} onClick={() => update({ text: 'xl' })}>
                A++
              </button>
            </div>
          </div>
          <label className="site-a11y-check">
            <input
              type="checkbox"
              checked={state.contrast}
              onChange={(e) => update({ contrast: e.target.checked })}
            />
            High contrast
          </label>
          <label className="site-a11y-check">
            <input
              type="checkbox"
              checked={state.underline}
              onChange={(e) => update({ underline: e.target.checked })}
            />
            Underline links
          </label>
          <label className="site-a11y-check">
            <input
              type="checkbox"
              checked={state.motion}
              onChange={(e) => update({ motion: e.target.checked })}
            />
            Reduce motion
          </label>
          <button type="button" className="site-a11y-reset" onClick={reset}>
            Reset
          </button>
        </div>
      ) : null}
    </div>
  )
}
