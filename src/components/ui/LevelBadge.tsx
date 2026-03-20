"use client";

import { USER_LEVELS } from "@/types";

const levelColors: Record<number, string> = {
  1: "bg-red-600",
  2: "bg-blue-600",
  3: "bg-purple-600",
  4: "bg-green-600",
  5: "bg-gray-600",
};

export default function LevelBadge({ level }: { level: number }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white ${levelColors[level] || "bg-gray-500"}`}>
      {USER_LEVELS[level] || `Level ${level}`}
    </span>
  );
}
