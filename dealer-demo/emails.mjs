// Visits each prospect's registered website and hunts for a contact email
// (front page + /kontakt). Prefers generic company addresses (post@, salg@,
// kontakt@) — Norwegian marketing law allows unsolicited B2B email to
// company addresses, not personal ones. Output: data/prospects-emails.json
import { readFileSync, writeFileSync } from "fs";

const prospects = JSON.parse(readFileSync("data/prospects.json", "utf8"));
const withSite = prospects.filter((p) => p.website);

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:no|com|net|org)/g;
const GENERIC = /^(post|kontakt|salg|mail|info|firmapost|hei)@/i;

const norm = (u) => (u.startsWith("http") ? u : `https://${u}`);

async function grab(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
      headers: { "user-agent": "Mozilla/5.0 (contact-lookup)" },
    });
    return (await res.text()).replace(/&#64;|%40/g, "@");
  } catch {
    return "";
  }
}

const out = [];
for (const p of withSite) {
  const base = norm(p.website);
  let emails = new Set();
  for (const path of ["", "/kontakt", "/kontakt-oss", "/om-oss"]) {
    if (emails.size) break;
    const html = await grab(base + path);
    for (const m of html.match(EMAIL_RE) || []) {
      const e = m.toLowerCase();
      if (!/\.(png|jpg|webp|svg)$/.test(e) && !e.includes("example")) emails.add(e);
    }
  }
  const list = [...emails];
  const best = list.find((e) => GENERIC.test(e)) || list[0] || null;
  out.push({ ...p, email: best, allEmails: list.slice(0, 5) });
  console.log(p.name, "→", best || "(none)");
}

writeFileSync("data/prospects-emails.json", JSON.stringify(out, null, 1));
console.log(`\n${out.filter((p) => p.email).length}/${out.length} with email`);
