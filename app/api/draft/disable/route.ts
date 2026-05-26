import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectTo = request.nextUrl.searchParams.get('redirect') ?? '/'

  const draft = await draftMode()
  draft.disable()

  redirect(redirectTo)
}
