import { NextRequest, NextResponse } from "next/server";
import { sendDraft } from "@/lib/engine/outreach";
import { listOutreach } from "@/lib/engine/db";

export const runtime = "nodejs";
export const maxDuration = 300;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch {}

  // Single draft.
  if (body.id) {
    const res = await sendDraft(Number(body.id), { force: !!body.force });
    return NextResponse.json(res);
  }

  // Batch: every draft that has an email. Throttled to be a good citizen.
  if (body.all) {
    const drafts = (listOutreach("draft") as any[]).filter((d) => d.to_email);
    const results: any[] = [];
    for (const d of drafts) {
      results.push({ id: d.id, navn: d.navn, ...(await sendDraft(d.id)) });
      await sleep(800);
    }
    return NextResponse.json({ sent: results.length, results });
  }

  return NextResponse.json({ error: "provide id or all:true" }, { status: 400 });
}
