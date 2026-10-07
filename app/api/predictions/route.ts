import { NextResponse } from 'next/server'
import { predictRisk } from '@/lib/commerce-schema'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const input = {
    delayHours: Number(body.delayHours ?? 0),
    scans: Number(body.scans ?? 4),
    routeChanges: Number(body.routeChanges ?? 0),
    facilityLoad: Number(body.facilityLoad ?? 50),
  }
  if (Object.values(input).some((value) => !Number.isFinite(value) || value < 0)) return NextResponse.json({ error: 'Prediction inputs must be non-negative numbers' }, { status: 400 })
  return NextResponse.json({ prediction: predictRisk(input), generatedAt: new Date().toISOString() })
}
