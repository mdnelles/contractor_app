"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Moon, Sun, Globe, LogOut } from "lucide-react";
import LevelBadge from "@/components/ui/LevelBadge";

export default function Topbar() {
  const { user, t, logout, darkMode, toggleDarkMode, locale, setLocale } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t("nav.dashboard")}
        </h1>
        {user && <LevelBadge level={user.userLevel} />}
        {user && (
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
            {t("stores.number")} {user.homeStore}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Language toggle */}
        <button
          onClick={() => setLocale(locale === "en" ? "es" : "en")}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={t("settings.language")}
        >
          <Globe size={16} />
          <span className="text-xs font-medium uppercase">{locale}</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={t("settings.darkMode")}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User info & logout */}
        {user && (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
              {user.firstName}
            </span>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
              title={t("auth.logout")}
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
