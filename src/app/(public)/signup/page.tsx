"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Moon, Sun, Globe, UserPlus } from "lucide-react";

export default function SignupPage() {
  const { t, darkMode, toggleDarkMode, locale, setLocale, showSnackbar } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSnackbar("Demo mode: Registration simulated. Please use a demo account.", "info");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <div className="flex justify-end gap-2 p-4">
        <button
          onClick={() => setLocale(locale === "en" ? "es" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Globe size={16} />
          <span className="text-xs font-medium uppercase">{locale}</span>
        </button>
        <button onClick={toggleDarkMode} className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-700 dark:text-brand-200 mb-2">Direct Property Care</h1>
            <p className="text-gray-500 dark:text-gray-400">{t("auth.joinPlatform")}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t("auth.createAccount")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("auth.firstName")}</label>
                  <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("auth.lastName")}</label>
                  <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("auth.email")}</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("auth.password")}</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 outline-none" required />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors">
                <UserPlus size={18} />
                {t("auth.createAccount")}
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
              {t("auth.haveAccount")}{" "}
              <Link href="/login" className="text-brand-600 dark:text-brand-400 hover:underline">{t("auth.login")}</Link>
            </p>
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">{t("auth.demoNotice")}</p>
        </div>
      </div>
    </div>
  );
}
