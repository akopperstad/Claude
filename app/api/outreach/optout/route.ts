import { NextRequest, NextResponse } from "next/server";
import { addSuppression, getDb, log } from "@/lib/engine/db";

export const runtime = "nodejs";

// One-click opt-out target (linked in every email). Adds the address to the
// suppression list and flags any pending drafts so they are never sent.
export async function GET(req: NextRequest) {
  const email = (req.nextUrl.searchParams.get("e") || "").toLowerCase().trim();
  if (!email) return new NextResponse("Mangler e-postadresse.", { status: 400 });
  addSuppression(email, "user opt-out");
  getDb().prepare(`UPDATE outreach SET status='optout' WHERE lower(to_email)=? AND status IN ('draft','needs_email','ready')`).run(email);
  log("info", "optout", `Opt-out registered: ${email}`);
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;max-width:520px;margin:80px auto;text-align:center;color:#111">
     <h2>Du er meldt av</h2><p>${email} vil ikke motta flere henvendelser fra oss. Beklager bryderiet.</p></body>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}
