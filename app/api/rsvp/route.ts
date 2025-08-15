// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server"

// ✅ GET: Fetch RSVPs (public)
export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rsvps`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: res.status })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

// ✅ POST: Create new RSVP (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rsvps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: body }), // Strapi requires { data: {...} }
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || "Failed to create RSVP" }, { status: res.status })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
