"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Plus, Trash2, ListTodo } from "lucide-react";

export default function TodoPage() {
  const { t, todos, addTodo, deleteTodo, showSnackbar } = useApp();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [due, setDue] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({
      id: `t-${Date.now()}`,
      title: title.trim(),
      details: details.trim(),
      createdAt: new Date().toISOString().split("T")[0],
      due: due || "",
    });
    setTitle("");
    setDetails("");
    setDue("");
    showSnackbar("Note added (session only)", "success");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t("todo.title")}</h2>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("todo.taskTitle")}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          required
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={t("todo.details")}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm resize-none"
        />
        <div className="flex gap-3 items-center">
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
          />
          <button type="submit" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
            <Plus size={16} />{t("todo.addNew")}
          </button>
        </div>
      </form>

      {/* Todo list */}
      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <ListTodo size={40} className="mx-auto mb-2 opacity-50" />
          <p>{t("todo.noItems")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{item.title}</h4>
                {item.details && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.details}</p>}
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>{t("contracts.created")}: {item.createdAt}</span>
                  {item.due && <span>{t("todo.due")}: {item.due}</span>}
                </div>
              </div>
              <button
                onClick={() => { deleteTodo(item.id); showSnackbar("Note deleted (session only)", "info"); }}
                className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
