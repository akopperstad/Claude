"use client";

import { useState } from "react";
import { DayViews } from "@/lib/sellerStats";

const W = 560;
const H = 180;
const PAD = { top: 18, right: 8, bottom: 24, left: 36 };

/** Daily-views bars; boosted projection appended in FINN+ purple. */
export default function ViewsChart({
  history,
  projection,
}: {
  history: DayViews[];
  projection?: DayViews[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const data = projection ? [...history, ...projection] : history;
  const max = Math.max(...data.map((d) => d.views)) * 1.1;

  const innerW = W - PAD.left - PAD.right;
  const slot = innerW / data.length;
  const barW = Math.min(40, slot * 0.7);
  const x = (i: number) => PAD.left + i * slot + (slot - barW) / 2;
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseLeave={() => setHover(null)}>
        {[0.5, 1].map((f) => (
          <g key={f}>
            <line
              x1={PAD.left} x2={W - PAD.right}
              y1={y((max / 1.1) * f)} y2={y((max / 1.1) * f)}
              stroke="#eeeef2" strokeWidth="1"
            />
            <text x={PAD.left - 6} y={y((max / 1.1) * f) + 4} textAnchor="end" fontSize="10" fill="#84848f">
              {Math.round((max / 1.1) * f)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const h = H - PAD.bottom - y(d.views);
          return (
            <g key={d.day + i}>
              <rect
                x={x(i)} y={y(d.views)} width={barW} height={h}
                rx="4"
                fill={d.projected ? "#7311d1" : "#0063fb"}
                opacity={d.projected ? 0.85 : hover === i ? 1 : 0.9}
                onMouseEnter={() => setHover(i)}
              />
              <text x={x(i) + barW / 2} y={H - 8} textAnchor="middle" fontSize="10" fill={d.projected ? "#7311d1" : "#84848f"} fontWeight={d.projected ? 700 : 400}>
                {d.day}
              </text>
              {hover === i && (
                <text x={x(i) + barW / 2} y={y(d.views) - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#26262d">
                  {d.views}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {projection && (
        <div className="mt-1 flex gap-4 text-xs text-finn-gray">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-finn-blue" /> Visninger siste 7 dager
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-finn-plus" /> Forventet med boost (*neste dager)
          </span>
        </div>
      )}
    </div>
  );
}
