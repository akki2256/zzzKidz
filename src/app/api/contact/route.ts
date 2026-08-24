import { z } from "zod";
import { NextResponse } from "next/server";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  school: z.string().min(2).max(200),
  phone: z.string().max(40).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid enquiry payload." },
        { status: 400 },
      );
    }

    // Intentionally no secrets / third-party wiring yet.
    // Hook email/CRM delivery here via server-only env vars.
    console.info("[contact-enquiry]", {
      name: parsed.data.name,
      email: parsed.data.email,
      school: parsed.data.school,
      hasPhone: Boolean(parsed.data.phone),
      messageLength: parsed.data.message.length,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process enquiry." },
      { status: 500 },
    );
  }
}
