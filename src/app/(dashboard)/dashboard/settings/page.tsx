"use client";

import { useApp } from "@/context/AppContext";
import { Moon, Sun, Globe } from "lucide-react";

export default function SettingsPage() {
  const { t, darkMode, toggleDarkMode, locale, setLocale } = useApp();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("settings.title")}</h2>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{t("settings.appearance")}</h3>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-gray-600 dark:text-gray-400" /> : <Sun size={20} className="text-gray-600 dark:text-gray-400" />}
            <span className="text-sm text-gray-700 dark:text-gray-300">{t("settings.darkMode")}</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? "bg-brand-600" : "bg-gray-300 dark:bg-gray-600"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-5" : ""}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-gray-600 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t("settings.language")}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                locale === "en" ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("es")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                locale === "es" ? "bg-brand-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600">
        {t("auth.demoNotice")}
      </p>
    </div>
  );
}
