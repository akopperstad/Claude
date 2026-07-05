import Link from 'next/link';

export function Logo() {
  return (
    <Link className="logo" href="/">
      v
      <span className="o">
        <span>o</span>
      </span>
      ling
    </Link>
  );
}
