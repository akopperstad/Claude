# Deploying Vøling to Fly.io (public beta)

One-time setup from your PC (PowerShell, one line at a time):

```powershell
# 1. Install flyctl (once)
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"

# 2. Log in / create account (credit card required, ~5 USD/mo at this size)
fly auth signup   # or: fly auth login

# 3. From the repo root
cd C:\Claude

# 4. Create the app + volume (first time only; app name must be unique)
fly apps create voling
fly volumes create voling_data --region arn --size 3 -a voling

# 5. Secrets — NEVER commit these. VOLING_UNLIMITED must NOT be set in prod.
fly secrets set -a voling GEMINI_API_KEY=AIza... ANTHROPIC_API_KEY=sk-ant-...

# 6. Deploy (repeat this step for every update)
fly deploy . -c fasade/web/fly.toml
```

The app answers on https://voling.fly.dev. Custom domain when Norid
registration is done:

```powershell
fly certs add voling.no -a voling
fly certs add www.voling.no -a voling
# then add the A/AAAA records fly prints to the DNS panel
```

## Operations

- Logs: `fly logs -a voling`
- Status/machines: `fly status -a voling`
- Leads/telemetry live on the volume: `fly ssh console -a voling` then
  `cat /app/fasade/web/data/leads.jsonl` / `telemetry.jsonl`
- The free quota (10 poeng/dag per visitor) is the bill guard. Watch
  Google AI Studio usage the first days.

## What is intentionally NOT in prod

- `VOLING_UNLIMITED` — founder-machine only.
- Payment — deferred until org.nr (A18).
- finn.no import runs behind the private-use confirmation (A27); full
  legal review still pending before it can be promoted loudly.
