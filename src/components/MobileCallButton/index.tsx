import { Phone, PhoneOutgoing } from 'lucide-react'
import React from 'react'

import {
  mobileCallButtonStyle,
  mobileCallIconSize,
  type ResolvedMobileCall,
} from '@/utilities/mobileCall'

function CallGlyph({ call }: { call: ResolvedMobileCall }) {
  const px = mobileCallIconSize(call.size)

  if (call.icon === 'custom' && call.iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={call.iconSrc} alt="" className="h-[1.15em] w-[1.15em] object-contain" style={{ width: px, height: px }} />
    )
  }

  const Icon = call.icon === 'phone-outgoing' ? PhoneOutgoing : Phone
  return <Icon size={px} strokeWidth={2.25} aria-hidden />
}

export function MobileCallButton({
  call,
  className = '',
}: {
  call: ResolvedMobileCall
  className?: string
}) {
  const showIcon = call.display === 'icon' || call.display === 'both'
  const showNumber = call.display === 'number' || call.display === 'both'
  const variant = showNumber ? 'pill' : 'icon'

  return (
    <a
      href={call.href}
      className={`inline-flex shrink-0 items-center justify-center gap-2 font-semibold no-underline ${className}`}
      style={mobileCallButtonStyle(call, variant)}
      aria-label={call.ariaLabel}
    >
      {showIcon ? <CallGlyph call={call} /> : null}
      {showNumber ? (
        <span className={showIcon ? 'pr-3 text-sm' : 'px-3 text-xs sm:text-sm'}>{call.label}</span>
      ) : (
        <span className="sr-only">{call.ariaLabel}</span>
      )}
    </a>
  )
}
