'use client';

import { useState } from 'react';

/** Launch-notification capture (A18: paid tiers show "kommer snart"). */
export function Waitlist() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="ventetakk">Takk. Du hører fra oss når det åpner.</p>;
  }
  return (
    <form
      className="venteliste"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch('/api/interesse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) setSent(true);
      }}
    >
      <input
        className="felt"
        type="email"
        required
        placeholder="din@epost.no"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn" type="submit">
        Hold meg oppdatert
      </button>
    </form>
  );
}
