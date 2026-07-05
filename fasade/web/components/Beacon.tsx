'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Cookieless pageview beacon (A27) — fires once per client-side route. */
export function Beacon() {
  const pathname = usePathname();
  useEffect(() => {
    void fetch('/api/hendelse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
  return null;
}
