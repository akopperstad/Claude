# Deploying Vøling to Fly.io (public beta)

Everything below runs in **Windows PowerShell** — the one built into Windows.
Press Start, type `PowerShell`, press Enter. Do **not** use `pwsh` (that is
the separate PowerShell 7 and is not installed by default). Paste one block at
a time.

## 1. Install flyctl (once)

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

Now **close this PowerShell window and open a new one.** The installer puts
`fly` on your PATH, but only windows opened *after* the install can see it.
In the new window, confirm it worked:

```powershell
fly version
```

If `fly` is still "not recognized", close and reopen PowerShell once more
(the installer placed it in `C:\Users\<you>\.fly\bin`).

## 2. Create your Fly account

```powershell
fly auth signup
```

A browser window opens. A credit card is required (this app costs roughly
5 USD/month at beta size). If you already have an account, use `fly auth login`
instead.

## 3. Create the app and its data volume (first time only)

The app name must be globally unique. If `voling` is taken, choose another
name, use it in every command below, and change `app = "..."` in
`fasade\web\fly.toml` to match.

```powershell
fly apps create voling
fly volumes create voling_data --region arn --size 3 --yes -a voling
```

(If `fly apps create` asks which organization to use, pick your personal one.)

## 4. Set the API keys (secrets — never commit these)

```powershell
fly secrets set -a voling GEMINI_API_KEY=AIza... ANTHROPIC_API_KEY=sk-ant-...
```

Replace the placeholders with your real keys. Do **not** set
`VOLING_UNLIMITED`: that switch is for the founder machine only and would turn
off the free-quota bill guard in production.

## 5. Deploy

Always deploy from the repo root so `fasade\pipeline` is in the build context.

```powershell
cd C:\Claude
fly deploy . -c fasade\web\fly.toml --ha=false
```

`--ha=false` keeps Fly to a single machine, matching the single data volume —
without it the first deploy tries to start a second, volume-less machine and
fails. For every later update, just repeat:

```powershell
cd C:\Claude
fly deploy . -c fasade\web\fly.toml
```

The app answers at https://voling.fly.dev.

## 6. Custom domain (later, once Norid registration is done)

```powershell
fly certs add voling.no -a voling
fly certs add www.voling.no -a voling
```

Then add the A/AAAA records Fly prints into your DNS panel.

## Operations

- Logs: `fly logs -a voling`
- Status / machines: `fly status -a voling`
- Leads & telemetry live on the volume. Run `fly ssh console -a voling`, then
  `cat /app/fasade/web/data/leads.jsonl` (or `telemetry.jsonl`).
- The free quota (10 poeng/dag per visitor) is the bill guard. Watch Google
  AI Studio usage the first few days.

## What is intentionally NOT in prod

- `VOLING_UNLIMITED` — founder machine only (it removes the quota guard).
- Payment — deferred until org.nr (A18).
- finn.no import runs behind the private-use confirmation (A27); full legal
  review still pending before it can be promoted loudly.
