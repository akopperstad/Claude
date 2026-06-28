import fs from "node:fs";
import { ProxyAgent, type Dispatcher } from "undici";

// Some sandboxed/CI environments only allow outbound traffic through an HTTP(S)
// proxy that re-terminates TLS with its own CA. Browsers struggle with that
// (their proxy TLS stack rejects the MITM cert), so instead of pointing Chromium
// at the proxy we intercept every request and fetch it here in Node, where we
// can both proxy and trust the CA explicitly.
let cached: Dispatcher | undefined;
let resolved = false;

export function getProxyDispatcher(): Dispatcher | undefined {
  if (resolved) return cached;
  resolved = true;

  const uri =
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy;
  if (!uri) {
    cached = undefined;
    return cached;
  }

  // Trust the proxy's CA so the tunneled TLS verifies. Falls back to the known
  // agent-proxy bundle path used in this environment.
  const caPath =
    process.env.REFACE_PROXY_CA ||
    process.env.NODE_EXTRA_CA_CERTS ||
    "/root/.ccr/ca-bundle.crt";
  let ca: Buffer | undefined;
  try {
    if (caPath && fs.existsSync(caPath)) ca = fs.readFileSync(caPath);
  } catch {
    /* best effort */
  }

  cached = new ProxyAgent({ uri, requestTls: ca ? { ca } : undefined });
  return cached;
}

export function hasProxy(): boolean {
  return !!(
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy
  );
}
