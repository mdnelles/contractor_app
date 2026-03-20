"use client";

import { useApp } from "@/context/AppContext";
import { USER_LEVELS, STAGE_NAMES, STAGE_COLORS } from "@/types";

const levelColors: Record<number, string> = { 1: "bg-red-600", 2: "bg-blue-600", 3: "bg-purple-600", 4: "bg-green-600", 5: "bg-gray-600" };

export default function GuidePage() {
  const { t } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("guide.title")}</h2>

      {/* User Levels */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t("guide.levels")}</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="flex items-start gap-3">
              <span className={`${levelColors[level]} text-white text-xs font-bold px-2 py-1 rounded-full min-w-[80px] text-center mt-0.5`}>
                {USER_LEVELS[level]}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t(`guide.levelDesc${level}`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contract Stages */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t("guide.stages")}</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((stage) => (
            <div key={stage} className="flex items-start gap-3">
              <span
                className="text-white text-xs font-bold px-2 py-1 rounded-full min-w-[80px] text-center mt-0.5"
                style={{ backgroundColor: STAGE_COLORS[stage] }}
              >
                {STAGE_NAMES[stage]}
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t(`guide.stageDesc${stage}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
