// app/api/auth/token/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies(); // await ở đây
  const token = cookieStore.get('token')?.value ?? null;
  return NextResponse.json({ token });
}
