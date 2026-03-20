"use client";

import { useApp } from "@/context/AppContext";
import { X } from "lucide-react";

const colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-amber-600",
};

export default function Snackbar() {
  const { snackbar, clearSnackbar } = useApp();
  if (!snackbar) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${colors[snackbar.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px]`}>
        <span className="flex-1 text-sm">{snackbar.message}</span>
        <button onClick={clearSnackbar} className="hover:opacity-70">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
