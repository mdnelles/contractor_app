"use client";

import { useApp } from "@/context/AppContext";
import { MapPin, Phone } from "lucide-react";

export default function StoresPage() {
  const { t, stores, user } = useApp();
  if (!user) return null;

  const filtered = user.userLevel === 1 ? stores : stores.filter((s) => s.number === user.homeStore);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("stores.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {t("stores.number")} {s.number}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                {s.city}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div>
                  <p>{s.address}</p>
                  <p>{s.city}, {s.province} {s.postalCode}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone size={16} className="shrink-0" />
                <p>{s.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
