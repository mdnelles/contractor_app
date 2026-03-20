"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { USER_LEVELS } from "@/types";
import LevelBadge from "@/components/ui/LevelBadge";
import { Search, Eye, Pencil, X } from "lucide-react";

export default function MembersPage() {
  const { user, t, users, updateUser, showSnackbar } = useApp();
  const [search, setSearch] = useState("");
  const [viewMember, setViewMember] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<string | null>(null);

  if (!user) return null;

  let filtered = users.filter((u) => !u.isDeleted);
  if (user.userLevel === 2) filtered = filtered.filter((u) => u.homeStore === user.homeStore);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (u) => u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  const viewing = viewMember ? users.find((u) => u.id === viewMember) : null;
  const editing = editMember ? users.find((u) => u.id === editMember) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("members.title")}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("members.search")}
            className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 w-64"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.name")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.email")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.level")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.store")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.status")}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("members.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                  <td className="px-4 py-3"><LevelBadge level={u.userLevel} /></td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">#{u.homeStore}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${u.isDisabled ? "text-red-500" : "text-green-500"}`}>
                      {u.isDisabled ? t("members.disabled") : t("members.active")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => setViewMember(u.id)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><Eye size={16} /></button>
                      {user.userLevel <= 2 && (
                        <button onClick={() => setEditMember(u.id)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><Pencil size={16} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">{t("common.noData")}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setViewMember(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{viewing.firstName} {viewing.lastName}</h3>
              <button onClick={() => setViewMember(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">{t("members.email")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("members.level")}</span><LevelBadge level={viewing.userLevel} /></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("members.store")}</span><span className="text-gray-800 dark:text-gray-200">#{viewing.homeStore}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("members.status")}</span><span className={viewing.isDisabled ? "text-red-500" : "text-green-500"}>{viewing.isDisabled ? t("members.disabled") : t("members.active")}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.created")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.createdAt}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditMember(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("common.edit")}: {editing.firstName}</h3>
              <button onClick={() => setEditMember(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("members.status")}</label>
                <button
                  onClick={() => { updateUser(editing.id, { isDisabled: !editing.isDisabled }); showSnackbar(`User ${editing.isDisabled ? "enabled" : "disabled"} (session only)`, "success"); }}
                  className={`px-4 py-2 rounded-lg text-white font-medium text-sm ${editing.isDisabled ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {editing.isDisabled ? t("members.enable") : t("members.disable")}
                </button>
              </div>
              <button onClick={() => setEditMember(null)} className="w-full px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
