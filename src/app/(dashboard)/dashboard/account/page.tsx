"use client";

import { useApp } from "@/context/AppContext";
import { DollarSign } from "lucide-react";

const mockTransactions = [
  { id: 1, date: "2026-03-15", description: "Kitchen Renovation - Materials", amount: -2450.0, type: "debit" },
  { id: 2, date: "2026-03-10", description: "Payment Received - Deck Project", amount: 5200.0, type: "credit" },
  { id: 3, date: "2026-03-05", description: "Electrical Panel Upgrade", amount: -1800.0, type: "debit" },
  { id: 4, date: "2026-02-28", description: "Payment Received - Roof Repair", amount: 3500.0, type: "credit" },
  { id: 5, date: "2026-02-20", description: "Plumbing Supplies", amount: -650.0, type: "debit" },
];

export default function AccountPage() {
  const { t } = useApp();
  const balance = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("account.title")}</h2>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-1">
          <DollarSign className="text-green-500" size={24} />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("account.balance")}</p>
        </div>
        <p className={`text-3xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
          ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t("account.transactions")}</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{tx.description}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
              <span className={`font-semibold text-sm ${tx.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {tx.amount >= 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
