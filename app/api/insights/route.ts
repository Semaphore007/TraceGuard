import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { predictRisk } from '@/lib/commerce-schema'

export const runtime = 'nodejs'

const model = 'anthropic/claude-haiku-4.5'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const metrics = {
    delayHours: Number(body.delayHours ?? 0),
    scans: Number(body.scans ?? 4),
    routeChanges: Number(body.routeChanges ?? 0),
    facilityLoad: Number(body.facilityLoad ?? 50),
  }

  if (Object.values(metrics).some((value) => !Number.isFinite(value) || value < 0)) {
    return NextResponse.json({ error: 'Insight inputs must be non-negative numbers' }, { status: 400 })
  }

  const prediction = predictRisk(metrics)
  const prompt = [
    'You are TraceGuard operations intelligence. Write a concise operational recommendation.',
    `Risk score: ${prediction.score}/99 (${prediction.level}).`,
    `Drivers: ${prediction.drivers.join('; ') || 'No elevated drivers detected'}.`,
    'Return exactly three short bullets: finding, next action, and metric to watch. Do not mention AI or model names.',
  ].join(' ')

  try {
    const result = await generateText({ model, prompt, maxOutputTokens: 180 })
    return NextResponse.json({ prediction, recommendation: result.text, generatedAt: new Date().toISOString() })
  } catch {
    return NextResponse.json({ prediction, recommendation: `${prediction.action}. Monitor the next scan event and facility load.`, generatedAt: new Date().toISOString(), degraded: true })
  }
}
