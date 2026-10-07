import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Clock3, MapPin, PackageCheck, ShieldAlert, Store, UserRound } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageFrame, statusStyles } from '@/components/traceguard-shell'

const events = [
  ['14:28 IST', 'Exception detected', 'Scan sequence diverged from the expected route at Hubli Sorting Center.', 'critical'],
  ['13:46 IST', 'Facility scan', 'Parcel received and containerized for Pune transit.', 'normal'],
  ['09:12 IST', 'Linehaul departure', 'Departed Bengaluru Gateway on lane BLR-PNQ-04.', 'normal'],
  ['08:34 IST', 'Seller handoff', 'Manifest accepted from Urban Loom via Amazon.', 'normal'],
]

export default async function ParcelHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!id) notFound()
  return <PageFrame><div className="mx-auto flex max-w-[1100px] flex-col gap-6">
    <Link href="/monitoring" className="inline-flex h-8 w-fit items-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-muted"><ArrowLeft className="size-4" /> Back to monitoring</Link>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-600"><span className="size-1.5 rounded-full bg-cyan-500" />Shipment history</div><h1 className="text-2xl font-semibold tracking-tight">{id}</h1><p className="mt-1 text-sm text-muted-foreground">Complete scan history and predicted recovery path.</p></div><Badge variant="outline" className={statusStyles.critical}>Critical · 94/100</Badge></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Card className="shadow-none"><CardContent className="p-5"><Store className="size-4 text-cyan-600" /><p className="mt-3 text-xs text-muted-foreground">Seller</p><p className="font-semibold">Urban Loom</p></CardContent></Card><Card className="shadow-none"><CardContent className="p-5"><UserRound className="size-4 text-violet-600" /><p className="mt-3 text-xs text-muted-foreground">Customer</p><p className="font-semibold">Riya Sharma</p></CardContent></Card><Card className="shadow-none"><CardContent className="p-5"><MapPin className="size-4 text-orange-600" /><p className="mt-3 text-xs text-muted-foreground">Expected route</p><p className="font-semibold">Bengaluru → Pune</p></CardContent></Card><Card className="shadow-none"><CardContent className="p-5"><PackageCheck className="size-4 text-emerald-600" /><p className="mt-3 text-xs text-muted-foreground">Recovery action</p><p className="font-semibold">Reroute requested</p></CardContent></Card></div>
    <Card className="shadow-none"><CardHeader><CardTitle className="text-sm">Immutable event timeline</CardTitle><p className="text-xs text-muted-foreground">Events are ordered from the live scan stream; anomaly scoring runs at every scan.</p></CardHeader><CardContent><div className="flex flex-col">{events.map(([time, title, detail, level], index) => <div key={time} className="relative flex gap-4 pb-7 last:pb-0"><div className="flex flex-col items-center"><span className={`relative z-10 flex size-8 items-center justify-center rounded-full ${level === 'critical' ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-600'}`}>{level === 'critical' ? <ShieldAlert className="size-4" /> : <CheckCircle2 className="size-4" />}</span>{index < events.length - 1 && <span className="w-px flex-1 bg-border" />}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold">{title}</span><Badge variant="outline" className={statusStyles[level as keyof typeof statusStyles]}>{level}</Badge><span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />{time}</span></div><p className="mt-1 text-sm text-muted-foreground">{detail}</p></div></div>)}</div></CardContent></Card>
    <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm"><span className="font-semibold">Why this was caught early:</span> route deviation plus facility dwell variance crossed the operational threshold 6h 42m before the expected customer delivery window.</div>
  </div></PageFrame>
}
