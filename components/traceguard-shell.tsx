'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, BarChart3, Bell, BrainCircuit, CircleHelp, Database, GitBranch, LayoutDashboard, Menu, Moon, Package, Search, Settings, ShieldCheck, SlidersHorizontal, Sun, Truck, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Seller & Customer', href: '/monitoring', icon: Activity },
  { label: 'Parcels', href: '/parcels', icon: Package },
  { label: 'Alerts', href: '/alerts', icon: Bell, count: '12' },
  { label: 'Facilities', href: '/facilities', icon: Truck },
  { label: 'Routes', href: '/routes', icon: GitBranch },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Recovery', href: '/recovery', icon: ShieldCheck },
  { label: 'Predictive Insights', href: '/ai-insights', icon: BrainCircuit },
  { label: 'Simulation', href: '/simulation', icon: SlidersHorizontal },
  { label: 'Data', href: '/data', icon: Database },
]

export function TraceGuardMark({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3"><div className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"><ShieldCheck className="size-5" strokeWidth={2.5} /><span className="absolute -right-1 -top-1 size-2 rounded-full bg-cyan-400 ring-2 ring-sidebar" /></div>{!compact && <div className="leading-none"><div className="text-[15px] font-bold tracking-tight">TraceGuard</div><div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Predict. Trace. Recover.</div></div>}</div>
}

export function TraceGuardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const current = navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
  return <div className={cn('min-h-screen bg-muted/30', dark && 'dark')}>
    <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r bg-sidebar px-4 py-5 transition-transform duration-200 lg:translate-x-0', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="flex items-center justify-between px-2"><Link href="/dashboard" onClick={() => setMobileOpen(false)}><TraceGuardMark /></Link><button className="rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X className="size-4" /></button></div>
      <div className="mt-8 flex flex-1 flex-col"><div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Operations</div><nav className="flex flex-col gap-1" aria-label="Main navigation">{navigation.map((item) => { const Icon = item.icon; const active = current?.href === item.href; return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn('group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors', active ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground')}><Icon className="size-[17px]" /><span className="flex-1">{item.label}</span>{item.count && <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold', active ? 'bg-white/15' : 'bg-destructive/10 text-destructive')}>{item.count}</span>}</Link> })}</nav><div className="mt-7 px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Workspace</div><nav className="flex flex-col gap-1"><Link href="/connections" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"><Settings className="size-[17px]" /> Connections</Link><Link href="/tracking" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"><CircleHelp className="size-[17px]" /> Customer tracking</Link></nav></div><Link href="/login" className="mt-6 flex items-center gap-3 rounded-lg border border-sidebar-border/70 px-3 py-3 hover:bg-sidebar-accent"><div className="flex size-8 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">AK</div><div className="min-w-0 flex-1"><div className="truncate text-xs font-semibold">Aarav Kapoor</div><div className="truncate text-[10px] text-muted-foreground">Operations lead</div></div><UserRound className="size-3.5 text-muted-foreground" /></Link>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-black/30 lg:hidden" aria-label="Close navigation overlay" onClick={() => setMobileOpen(false)} />}
    <div className="lg:pl-[252px]"><header className="sticky top-0 z-20 flex h-[68px] items-center gap-4 border-b bg-background/95 px-5 backdrop-blur md:px-8"><button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu className="size-5" /></button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span>Workspace</span><span>/</span><span className="font-semibold text-foreground">{current?.label ?? 'Overview'}</span></div><div className="ml-auto flex items-center gap-2"><Link href="/parcels" className="hidden h-9 items-center gap-2 rounded-lg border bg-muted/30 px-3 text-xs text-muted-foreground transition-colors hover:bg-muted md:flex"><Search className="size-3.5" /> Search <kbd className="ml-5 rounded border bg-background px-1.5 py-0.5 text-[10px]">⌘ K</kbd></Link><button className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</button><Link href="/alerts" className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" /></Link><Link href="/login" className="ml-1 hidden items-center gap-2 border-l pl-3 sm:flex"><div className="flex size-8 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">AK</div><UserRound className="size-3.5 text-muted-foreground" /></Link></div></header><main className="min-h-[calc(100vh-68px)] p-5 md:p-8">{children}</main></div>
  </div>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <TraceGuardShell>{children}</TraceGuardShell> }
export const statusStyles = { critical: 'bg-destructive/10 text-destructive border-destructive/20', high: 'bg-orange-500/10 text-orange-700 border-orange-500/20', medium: 'bg-amber-500/10 text-amber-700 border-amber-500/20', watch: 'bg-blue-500/10 text-blue-700 border-blue-500/20', normal: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' }
export default TraceGuardShell
