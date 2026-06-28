import type { ShowcaseLead } from "./showcase";

// Sender identity — set these in env for real sends. Defaults are placeholders
// so drafts are reviewable; markedsføringsloven requires clear sender identity.
export const SENDER = {
  name: process.env.PILHAMMER_SENDER_NAME || "Pilhammer",
  email: process.env.PILHAMMER_SENDER_EMAIL || "post@pilhammer.no",
  person: process.env.PILHAMMER_SENDER_PERSON || "",
  phone: process.env.PILHAMMER_SENDER_PHONE || "",
};

export function publicBase(): string {
  return process.env.PILHAMMER_PUBLIC_URL || "http://localhost:3000";
}

function hook(lead: ShowcaseLead): string {
  if (!lead.has_website) return `Jeg la merke til at ${lead.navn} ikke har en nettside i dag`;
  if (!lead.audit_viewport) return `Jeg så at nettsiden til ${lead.navn} ikke er mobiltilpasset`;
  if (!lead.audit_https) return `Jeg så at nettsiden til ${lead.navn} mangler sikker tilkobling (HTTPS)`;
  return `Jeg tok en titt på nettsiden til ${lead.navn}`;
}

export interface ComposedEmail {
  subject: string;
  text: string;
  html: string;
}

// Compose a personalized Norwegian B2B cold email. Includes the showcase link,
// clear sender identity, and a one-click opt-out (both required for compliant
// electronic marketing). Kept short and specific — not spammy.
export function composeEmail(lead: ShowcaseLead, showcaseId: number, toEmail: string): ComposedEmail {
  const base = publicBase();
  const previewUrl = `${base}/api/showcase/${showcaseId}`;
  const optoutUrl = `${base}/api/outreach/optout?e=${encodeURIComponent(toEmail)}`;
  const subject = `Forslag til ny nettside for ${lead.navn}`;
  const signoff = [SENDER.person || SENDER.name, SENDER.name, SENDER.phone, SENDER.email].filter(Boolean).join(" · ");

  const text = `Hei,

${hook(lead)}, og tok meg friheten å lage et lite utkast til hvordan en ny, moderne nettside kunne sett ut for dere:

${previewUrl}

Vi i Pilhammer lager raske, mobilvennlige nettsider som er enkle å finne på Google. Utkastet er helt uforpliktende — vi tilpasser tekst, bilder og farger til ${lead.navn}.

Har dere 15 minutter til en uforpliktende prat?

Med vennlig hilsen,
${signoff}

—
Du mottar denne e-posten fordi ${lead.navn} er en relevant bedrift for våre tjenester. Ønsker du ikke flere henvendelser, klikk her: ${optoutUrl}`;

  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
  <p>Hei,</p>
  <p>${esc(hook(lead))}, og tok meg friheten å lage et lite utkast til hvordan en ny, moderne nettside kunne sett ut for dere:</p>
  <p><a href="${previewUrl}" style="display:inline-block;background:linear-gradient(90deg,#6c8cff,#9b6cff);color:#fff;padding:12px 22px;border-radius:999px;font-weight:600;text-decoration:none">Se forslaget →</a></p>
  <p>Vi i <strong>Pilhammer</strong> lager raske, mobilvennlige nettsider som er enkle å finne på Google. Utkastet er helt uforpliktende — vi tilpasser tekst, bilder og farger til ${esc(lead.navn)}.</p>
  <p>Har dere 15 minutter til en uforpliktende prat?</p>
  <p>Med vennlig hilsen,<br>${esc(signoff)}</p>
  <hr style="border:0;border-top:1px solid #eee;margin:20px 0">
  <p style="font-size:12px;color:#888">Du mottar denne e-posten fordi ${esc(lead.navn)} er en relevant bedrift for våre tjenester. Ønsker du ikke flere henvendelser, <a href="${optoutUrl}" style="color:#888">meld deg av her</a>.</p>
</div>`;

  return { subject, text, html };
}

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
