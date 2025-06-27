import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  let rsvpData;
  try {
    rsvpData = await request.json();
  } catch (_) {
    return NextResponse.json(
      { message: "Invalid request body. Expected JSON." },
      { status: 400 }
    );
  }

  const { name, email, attending, guests, message } = rsvpData;

  // --- Validate incoming data ---
  if (!name || !email || !attending) {
    return NextResponse.json(
      { message: "Missing required fields: name, email, attending." },
      { status: 400 }
    );
  }

  // --- Shape data for the database ---
  const rsvpRow = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    attending: String(attending).toLowerCase(),
    guests:
      attending === "yes"
        ? Math.max(1, Number.parseInt(String(guests ?? "1"), 10) || 1)
        : 0,
    message: message ? String(message).trim() : null,
  };

  // --- Insert into Supabase ---
  try {
    const { error: supabaseError } = await supabase
      .from("rsvps")
      .insert(rsvpRow);

    if (supabaseError) {
      console.error("Supabase DB Error:", supabaseError);
      return NextResponse.json(
        { message: "Database error.", details: supabaseError.message },
        { status: 500 }
      );
    }

    const successMsg =
      rsvpRow.attending === "yes"
        ? "Thank you! We’re thrilled you’ll be joining us."
        : "Thank you for letting us know. We’ll miss you!";

    return NextResponse.json({ message: successMsg }, { status: 200 });
  } catch (err: unknown) {
    console.error("Caught an unexpected error during Supabase operation:", err);

    if (err instanceof SyntaxError) {
      console.error(
        "This is a JSON parsing error. The response from Supabase was likely not JSON. Please check that the project is active and the API URL is correct in your .env.local file."
      );
      return NextResponse.json(
        {
          message:
            "Configuration Error: Could not communicate with the database correctly. Please check API URL and keys.",
        },
        { status: 500 }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json(
        { message: "An unexpected server error occurred.", details: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// Optional: Reject non-POST requests with 405
export const GET = () =>
  NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
