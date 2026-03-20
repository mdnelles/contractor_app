"use client";

import { useApp } from "@/context/AppContext";
import { USER_LEVELS, STAGE_NAMES, STAGE_COLORS } from "@/types";
import LevelBadge from "@/components/ui/LevelBadge";
import { Users, FileText, Store, RefreshCw } from "lucide-react";

export default function ProfilePage() {
  const { user, t, users, contracts, stores } = useApp();
  if (!user) return null;

  const stageBreakdown = [1, 2, 3, 4, 5].map((s) => ({
    stage: s,
    name: STAGE_NAMES[s],
    color: STAGE_COLORS[s],
    count: contracts.filter((c) => c.stage === s).length,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {t("profile.welcome")}, {user.firstName}!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
          </div>
          <LevelBadge level={user.userLevel} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("profile.yourLevel")}</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{USER_LEVELS[user.userLevel]}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("profile.homeStore")}</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">#{user.homeStore}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("profile.lastLogin")}</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{user.lastLogin}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("members.status")}</p>
            <p className="font-medium text-green-600">{t("members.active")}</p>
          </div>
        </div>
      </div>

      {/* Data overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          {t("profile.dataOverview")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{users.filter((u) => !u.isDeleted).length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("profile.totalUsers")}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <FileText className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{contracts.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("profile.totalContracts")}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <Store className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stores.length}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("profile.totalStores")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage breakdown */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {t("contracts.title")} — {t("contracts.stage")}
        </h3>
        <div className="flex gap-3 flex-wrap">
          {stageBreakdown.map((s) => (
            <div key={s.stage} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{s.name}</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
