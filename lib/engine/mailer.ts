import nodemailer from "nodemailer";
import { SENDER } from "./emailCompose";

// Real sending requires SMTP_* env. Without them we run in DRY-RUN: nothing
// leaves the building, drafts are marked sent_dry. This is the safe default —
// the operator opts into live sending by configuring SMTP and confirming.
export function smtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

let _tx: nodemailer.Transporter | null = null;
function transport() {
  if (_tx) return _tx;
  _tx = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "1",
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });
  return _tx;
}

export interface SendResult { ok: boolean; dryRun: boolean; error?: string }

export async function sendMail(to: string, subject: string, text: string, html: string): Promise<SendResult> {
  if (!smtpConfigured()) {
    return { ok: true, dryRun: true };
  }
  try {
    await transport().sendMail({
      from: `${SENDER.name} <${SENDER.email}>`,
      to, subject, text, html,
      replyTo: SENDER.email,
    });
    return { ok: true, dryRun: false };
  } catch (e: any) {
    return { ok: false, dryRun: false, error: e?.message?.slice(0, 200) || "send failed" };
  }
}
