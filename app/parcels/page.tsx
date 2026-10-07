'use client'

import Link from 'next/link'
import { ArrowUpRight, Download, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageFrame } from '@/components/traceguard-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const rows = [
  ['P-100234', 'Bengaluru', 'Mumbai', 'Hubli Sorting', '12m ago', '3h 18m', '94', 'Critical'],
  ['P-100879', 'Goa', 'Pune', 'Pune Transit', '28m ago', '2h 04m', '87', 'High'],
  ['P-100442', 'Bengaluru', 'Pune', 'Bengaluru Gateway', '41m ago', '1h 32m', '76', 'High'],
  ['P-100198', 'Mumbai', 'Bengaluru', 'Pune Transit', '1h ago', '48m', '64', 'Watch'],
  ['P-100771', 'Pune', 'Goa', 'Mumbai Gateway', '1h ago', 'On time', '22', 'Normal'],
]

const badgeVariant = (level: string) => level === 'Critical' ? 'destructive' : level === 'Normal' ? 'secondary' : 'outline'

export default function ParcelsPage() {
  const [query, setQuery] = useState('')
  const filteredRows = useMemo(() => rows.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())), [query])

  function exportView() {
    const csv = ['Parcel ID,Origin,Destination,Facility,Last scan,Expected next,Risk,Level', ...filteredRows.map((row) => row.join(','))].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'traceguard-parcels.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return <PageFrame><div className="mx-auto flex max-w-[1500px] flex-col gap-6"><div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Link href="/dashboard" className="hover:text-foreground">Overview</Link><span>/</span><span>Parcels</span></div><div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="text-2xl font-semibold tracking-tight">Parcel intelligence</h1><p className="mt-1 text-sm text-muted-foreground">52,431 parcels in the network · 843 require attention</p></div><Button onClick={exportView}><Download data-icon="inline-start" /> Export view</Button></div></div><Card className="shadow-none"><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="text-sm">All parcels</CardTitle><p className="mt-1 text-xs text-muted-foreground">Live risk scores and predicted failure points</p></div><div className="flex items-center gap-2 rounded-md border px-3"><Search className="size-3.5 text-muted-foreground" /><input aria-label="Search parcel ID" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search parcel ID..." className="w-40 bg-transparent py-2 text-xs outline-none" /></div></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="border-y bg-muted/30 text-[10px] uppercase tracking-wider text-muted-foreground"><tr>{['Parcel ID','Origin','Destination','Current facility','Last scan','Expected next','Risk','Level',''].map((heading) => <th key={heading} className="whitespace-nowrap px-5 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y">{filteredRows.map((row) => <tr key={row[0]} className="transition-colors hover:bg-muted/30">{row.slice(0, 7).map((value, index) => <td key={index} className="whitespace-nowrap px-5 py-4">{index === 0 ? <Link href={`/parcels/${value}`} className="font-semibold hover:text-cyan-700">{value}</Link> : index === 6 ? <span className="font-semibold">{value}<span className="font-normal text-muted-foreground">/100</span></span> : value}</td>)}<td className="px-5"><Badge variant={badgeVariant(row[7])}>{row[7]}</Badge></td><td className="px-5"><Link href={`/parcels/${row[0]}`} aria-label={`Open ${row[0]}`}><ArrowUpRight className="size-4 text-muted-foreground" /></Link></td></tr>)}{filteredRows.length === 0 && <tr><td colSpan={9} className="px-5 py-10 text-center text-sm text-muted-foreground">No parcels match “{query}”.</td></tr>}</tbody></table></div></CardContent></Card></div></PageFrame>
}

