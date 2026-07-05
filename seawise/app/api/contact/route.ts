import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Lead capture endpoint.
 *
 * Validates the walkthrough request, then delivers it by email when SMTP is
 * configured. To activate delivery, set these environment variables:
 *   SMTP_URL   e.g. smtp://user:pass@smtp.host:587
 *   LEADS_TO   destination inbox (defaults to hello@seawise.no)
 *   LEADS_FROM from address (defaults to LEADS_TO)
 * Without SMTP_URL the lead is logged and accepted (safe no-op for previews).
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

  const smtp = process.env.SMTP_URL;
  if (!smtp) {
    console.log("[seawise] new lead (SMTP not configured — logging only)", lead);
    return NextResponse.json({ ok: true });
  }

  const to = process.env.LEADS_TO || "hello@seawise.no";
  const from = process.env.LEADS_FROM || to;
  try {
    const transport = nodemailer.createTransport(smtp);
    await transport.sendMail({
      to,
      from,
      replyTo: email,
      subject: `New walkthrough request — ${name}${lead.company ? ` (${lead.company})` : ""}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${lead.company || "—"}`,
        `Role:    ${lead.role || "—"}`,
        `Fleet:   ${lead.fleet || "—"}`,
        "",
        lead.message || "(no message)",
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[seawise] lead email failed", err);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
