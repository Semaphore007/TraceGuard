import { sql } from 'drizzle-orm'

export type CommerceProvider = 'amazon' | 'flipkart' | 'myntra' | 'meesho'

export type CommerceConnection = {
  provider: CommerceProvider
  status: 'not_connected' | 'pending' | 'connected' | 'error'
  lastSyncedAt?: string
}

export type RiskPrediction = {
  score: number
  level: 'low' | 'watch' | 'high' | 'critical'
  drivers: string[]
  action: string
}

export function predictRisk(input: { delayHours: number; scans: number; routeChanges: number; facilityLoad: number }): RiskPrediction {
  const score = Math.min(99, Math.round(input.delayHours * 4 + Math.max(0, 5 - input.scans) * 7 + input.routeChanges * 9 + input.facilityLoad * 0.22))
  const level = score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 35 ? 'watch' : 'low'
  const drivers = [
    input.delayHours > 8 ? 'Transit delay exceeds lane baseline' : null,
    input.scans < 3 ? 'Sparse scan coverage' : null,
    input.routeChanges > 0 ? 'Route changed after dispatch' : null,
    input.facilityLoad > 85 ? 'Origin facility is above capacity threshold' : null,
  ].filter(Boolean) as string[]
  return { score, level, drivers, action: level === 'critical' || level === 'high' ? 'Escalate to operations desk' : 'Continue monitoring' }
}

export const providerScopes: Record<CommerceProvider, string[]> = {
  amazon: ['orders.read', 'shipments.read', 'inventory.read'],
  flipkart: ['orders.read', 'shipments.read', 'returns.read'],
  myntra: ['orders.read', 'shipments.read'],
  meesho: ['orders.read', 'shipments.read'],
}

export function connectionTableSql() {
  return sql`select provider, status, last_synced_at from commerce_connections where user_id = current_user order by provider`
}
