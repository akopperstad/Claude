/**
 * Seawise wordmark with a wave monogram.
 * Placeholder mark — drop the official S-mark at /logo.svg and swap the <svg>
 * for <img src="/logo.svg" /> to use the real brand asset.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-lg tracking-tight ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <path
          d="M4 20c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 7-5"
          stroke="#3DE0D0"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M4 13c3.5 0 3.5-5 7-5s3.5 5 7 5 3.5-5 7-5"
          stroke="#3DE0D0"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
      Seawise
    </span>
  );
}
