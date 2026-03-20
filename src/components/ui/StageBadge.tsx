"use client";

import { STAGE_COLORS, STAGE_NAMES } from "@/types";

export default function StageBadge({ stage }: { stage: number }) {
  const color = STAGE_COLORS[stage] || "#999";
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {STAGE_NAMES[stage] || `Stage ${stage}`}
    </span>
  );
}
