'use client';

import { useState } from 'react';

export function CompareSlider({
  before,
  after,
  altBefore = 'Før',
  altAfter = 'Etter',
}: {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="cmp" style={{ ['--pos' as string]: `${pos}%` }}>
      <img src={after} alt={altAfter} />
      <div className="beforeWrap">
        <img src={before} alt={altBefore} />
      </div>
      <div className="divider">
        <span className="handle" />
      </div>
      <span className="taglabel tl-l">Før</span>
      <span className="taglabel tl-r">Etter</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Sammenlign før og etter"
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  );
}
