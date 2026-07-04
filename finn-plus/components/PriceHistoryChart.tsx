"use client";

import { useState } from "react";
import { PricePoint } from "@/lib/priceHistory";
import { formatPrice } from "@/lib/listings";

const W = 640;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 56 };

/** 12-month market-value line with crosshair + tooltip. Asking price shown
 *  as a dashed reference line so over/under is visible at a glance. */
export default function PriceHistoryChart({
  points,
  askingPrice,
}: {
  points: PricePoint[];
  askingPrice: number;
}) {
  const [hover, setHover] = useState<number | null>(null);

  const values = points.map((p) => p.value).concat(askingPrice);
  const min = Math.min(...values) * 0.985;
  const max = Math.max(...values) * 1.015;

  const x = (i: number) =>
    PAD.left + (i / (points.length - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) =>
    PAD.top + (1 - (v - min) / (max - min)) * (H - PAD.top - PAD.bottom);

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");
  const area = `${line} L${x(points.length - 1)},${H - PAD.bottom} L${x(0)},${H - PAD.bottom} Z`;

  const gridVals = [min + (max - min) * 0.15, min + (max - min) * 0.5, min + (max - min) * 0.85];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * W;
          const i = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (points.length - 1));
          setHover(Math.max(0, Math.min(points.length - 1, i)));
        }}
      >
        {gridVals.map((v) => (
          <g key={v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="#eeeef2" strokeWidth="1" />
            <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#84848f">
              {Math.round(v / 1000).toLocaleString("nb-NO")}k
            </text>
          </g>
        ))}

        <line
          x1={PAD.left} x2={W - PAD.right} y1={y(askingPrice)} y2={y(askingPrice)}
          stroke="#84848f" strokeWidth="1.5" strokeDasharray="5 4"
        />
        <text x={W - PAD.right} y={y(askingPrice) - 6} textAnchor="end" fontSize="11" fill="#47474f" fontWeight="600">
          Prisantydning
        </text>

        <path d={area} fill="#0063fb" opacity="0.08" />
        <path d={line} fill="none" stroke="#0063fb" strokeWidth="2" strokeLinejoin="round" />

        {[0, 5, 11].map((i) => (
          <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === 11 ? "end" : "middle"} fontSize="11" fill="#84848f">
            {points[i].month}
          </text>
        ))}

        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} stroke="#c5c5cf" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(points[hover].value)} r="5" fill="#0063fb" stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </svg>

      {hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 rounded-md border border-finn-border bg-white px-3 py-1.5 text-xs shadow-card-hover"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            transform: `translateX(${hover > 7 ? "-105%" : "5%"})`,
          }}
        >
          <div className="text-finn-gray-2">{points[hover].month.replace(". ", ". 20")}</div>
          <div className="font-bold">{formatPrice(points[hover].value)}</div>
        </div>
      )}
    </div>
  );
}
