import { NextResponse } from 'next/server'

const history = [
  { event: 'exception_detected', at: '2026-10-07T14:28:00+05:30', facility: 'Hubli Sorting Center', detail: 'Scan sequence diverged from expected route', riskScore: 94 },
  { event: 'facility_scan', at: '2026-10-07T13:46:00+05:30', facility: 'Hubli Sorting Center', detail: 'Parcel received and containerized', riskScore: 61 },
  { event: 'linehaul_departure', at: '2026-10-07T09:12:00+05:30', facility: 'Bengaluru Gateway', detail: 'Departed on lane BLR-PNQ-04', riskScore: 22 },
  { event: 'seller_handoff', at: '2026-10-07T08:34:00+05:30', facility: 'Urban Loom warehouse', detail: 'Manifest accepted from marketplace channel', riskScore: 8 },
]

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return NextResponse.json({ shipmentId: id, source: 'scan_stream', anomalyDetection: 'pre_complaint', events: history })
}
