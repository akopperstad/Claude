import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Validates the walkthrough request and returns success. Wiring the actual
 * delivery (email via SMTP / CRM webhook) is the remaining integration —
 * plug the destination in where marked once credentials are provided.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Name and valid email required" }, { status: 422 });
  }

  const lead = {
    name,
    email,
    company: String(body.company ?? "").trim(),
    role: String(body.role ?? "").trim(),
    fleet: String(body.fleet ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  // TODO: deliver the lead — SMTP (nodemailer), Resend, or a CRM webhook.
  // Requires destination credentials (e.g. SEAWISE_LEADS_TO + SMTP_URL).
  console.log("[seawise] new lead", lead);

  return NextResponse.json({ ok: true });
}
