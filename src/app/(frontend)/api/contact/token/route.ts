import { NextRequest, NextResponse } from 'next/server'

import { isAllowedOrigin, issueFormToken } from '@/utilities/formGuard'

export async function GET(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
