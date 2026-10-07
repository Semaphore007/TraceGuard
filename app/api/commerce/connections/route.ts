import { NextResponse } from 'next/server'
import { providerScopes, type CommerceProvider } from '@/lib/commerce-schema'

const providers: CommerceProvider[] = ['amazon', 'flipkart', 'myntra', 'meesho']

export async function GET() {
  return NextResponse.json({
    providers: providers.map((provider) => ({ provider, status: 'not_connected', scopes: providerScopes[provider] })),
    message: 'Provider adapters are ready. Connect a commerce account to begin sync.',
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const provider = body.provider as CommerceProvider
  if (!providers.includes(provider)) return NextResponse.json({ error: 'Unsupported commerce provider' }, { status: 400 })
  return NextResponse.json({ provider, status: 'pending', scopes: providerScopes[provider], message: 'Provider authorization requires a Vercel Connect connector.' }, { status: 202 })
}
