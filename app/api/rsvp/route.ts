// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from "next/server"

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

// ✅ GET: Fetch RSVPs (public)
export async function GET() {
  try {
    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_STRAPI_URL" },
        { status: 500 }
      )
    }

    const res = await fetch(`${STRAPI_URL}/api/rsvps`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // cache: "no-store",
      // next: { revalidate: 0 },
    })

    const data = await res.json()

    if (!res.ok) {
      const message =
        (data?.error?.message as string) ??
        (data?.message as string) ??
        "Failed to fetch RSVPs"
      return NextResponse.json({ error: message }, { status: res.status })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("RSVP GET error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

// ✅ POST: Create new RSVP (public)
export async function POST(req: NextRequest) {
  try {
    if (!STRAPI_URL) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_STRAPI_URL" },
        { status: 500 }
      )
    }

    const body = await req.json()
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const res = await fetch(`${STRAPI_URL}/api/rsvps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: body }), // Strapi expects { data: ... }
    })

    const data = await res.json()

    if (!res.ok) {
      const message =
        (data?.error?.message as string) ??
        (data?.message as string) ??
        "Failed to create RSVP"
      return NextResponse.json({ error: message }, { status: res.status })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("RSVP POST error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
