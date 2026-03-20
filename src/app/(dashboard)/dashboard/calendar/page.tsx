"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_ES = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_ES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function CalendarPage() {
  const { t, locale, contracts } = useApp();
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const days = locale === "es" ? DAYS_ES : DAYS_EN;
  const months = locale === "es" ? MONTHS_ES : MONTHS_EN;

  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));

  // Map contracts to dates
  const contractDates: Record<number, number> = {};
  contracts.forEach((c) => {
    const d = new Date(c.createdAt);
    if (d.getFullYear() === year && d.getMonth() === month) {
      contractDates[d.getDate()] = (contractDates[d.getDate()] || 0) + 1;
    }
  });

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("calendar.title")}</h2>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"><ChevronLeft size={20} /></button>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{months[month]} {year}</h3>
          <button onClick={nextMonth} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"><ChevronRight size={20} /></button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            const hasContracts = contractDates[day];
            return (
              <div
                key={day}
                className={`relative text-center py-2 rounded-lg text-sm ${
                  isToday
                    ? "bg-brand-600 text-white font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {day}
                {hasContracts && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
