"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { STAGE_NAMES, USER_LEVELS } from "@/types";
import StageBadge from "@/components/ui/StageBadge";
import { Eye, Pencil, X } from "lucide-react";

export default function ContractsPage() {
  const { user, t, contracts, stores, users, updateContract, showSnackbar } = useApp();
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [viewContract, setViewContract] = useState<string | null>(null);
  const [editContract, setEditContract] = useState<string | null>(null);

  if (!user) return null;

  // Filter contracts based on user level
  let filtered = contracts;
  if (user.userLevel === 2) filtered = contracts.filter((c) => c.homeStore === user.homeStore);
  if (user.userLevel === 3) filtered = contracts.filter((c) => c.orderPickedBy === user.id || (c.homeStore === user.homeStore && c.stage === 1));
  if (user.userLevel === 4) filtered = contracts.filter((c) => c.contractorId === user.id);
  if (user.userLevel === 5) filtered = contracts.filter((c) => c.clientId === user.id);

  if (storeFilter !== "all") filtered = filtered.filter((c) => c.homeStore === Number(storeFilter));
  if (stageFilter !== "all") filtered = filtered.filter((c) => c.stage === Number(stageFilter));

  const getUserName = (id: string) => {
    const u = users.find((u) => u.id === id);
    return u ? `${u.firstName} ${u.lastName}` : "—";
  };

  const viewing = viewContract ? contracts.find((c) => c.id === viewContract) : null;
  const editing = editContract ? contracts.find((c) => c.id === editContract) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("contracts.title")}</h2>
        <div className="flex gap-2">
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
          >
            <option value="all">{t("contracts.filterByStore")}: {t("contracts.all")}</option>
            {stores.map((s) => (
              <option key={s.id} value={s.number}>#{s.number} — {s.city}</option>
            ))}
          </select>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
          >
            <option value="all">{t("contracts.filterByStage")}: {t("contracts.all")}</option>
            {[1, 2, 3, 4, 5].map((s) => (
              <option key={s} value={s}>{STAGE_NAMES[s]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contracts table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.jobTitle")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.task")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.store")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.stage")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.client")}</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.created")}</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{t("contracts.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{c.jobTitle}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.task}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">#{c.homeStore}</td>
                  <td className="px-4 py-3"><StageBadge stage={c.stage} /></td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{getUserName(c.clientId)}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500">{c.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => setViewContract(c.id)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                        <Eye size={16} />
                      </button>
                      {user.userLevel <= 2 && (
                        <button onClick={() => setEditContract(c.id)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                          <Pencil size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">{t("common.noData")}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setViewContract(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{viewing.jobTitle}</h3>
              <button onClick={() => setViewContract(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.task")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.task}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.room")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.room}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.stage")}</span><StageBadge stage={viewing.stage} /></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.client")}</span><span className="text-gray-800 dark:text-gray-200">{getUserName(viewing.clientId)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.picker")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.orderPickedBy ? getUserName(viewing.orderPickedBy) : "—"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">{t("contracts.contractor")}</span><span className="text-gray-800 dark:text-gray-200">{viewing.contractorId ? getUserName(viewing.contractorId) : "—"}</span></div>
              <div><span className="text-gray-500">{t("contracts.description")}</span><p className="mt-1 text-gray-800 dark:text-gray-200">{viewing.description}</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setEditContract(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t("contracts.edit")}: {editing.jobTitle}</h3>
              <button onClick={() => setEditContract(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contracts.stage")}</label>
                <select
                  value={editing.stage}
                  onChange={(e) => { updateContract(editing.id, { stage: Number(e.target.value) }); showSnackbar("Stage updated (session only)", "success"); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {[1, 2, 3, 4, 5].map((s) => <option key={s} value={s}>{STAGE_NAMES[s]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contracts.picker")}</label>
                <select
                  value={editing.orderPickedBy}
                  onChange={(e) => { updateContract(editing.id, { orderPickedBy: e.target.value }); showSnackbar("Picker updated (session only)", "success"); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">—</option>
                  {users.filter((u) => u.userLevel === 3).map((u) => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("contracts.contractor")}</label>
                <select
                  value={editing.contractorId}
                  onChange={(e) => { updateContract(editing.id, { contractorId: e.target.value }); showSnackbar("Contractor updated (session only)", "success"); }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">—</option>
                  {users.filter((u) => u.userLevel === 4).map((u) => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
                </select>
              </div>
              <button onClick={() => setEditContract(null)} className="w-full px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors">
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
