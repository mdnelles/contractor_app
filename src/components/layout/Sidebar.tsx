"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  User,
  FileText,
  Users,
  Store,
  ListTodo,
  CalendarDays,
  CreditCard,
  HelpCircle,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  key: string;
  icon: React.ReactNode;
  href: string;
  minLevel?: number;
  maxLevel?: number;
}

const navItems: NavItem[] = [
  { key: "nav.profile", icon: <User size={20} />, href: "/dashboard/profile" },
  { key: "nav.contracts", icon: <FileText size={20} />, href: "/dashboard/contracts" },
  { key: "nav.members", icon: <Users size={20} />, href: "/dashboard/members", maxLevel: 2 },
  { key: "nav.stores", icon: <Store size={20} />, href: "/dashboard/stores" },
  { key: "nav.todo", icon: <ListTodo size={20} />, href: "/dashboard/todo" },
  { key: "nav.calendar", icon: <CalendarDays size={20} />, href: "/dashboard/calendar" },
  { key: "nav.account", icon: <CreditCard size={20} />, href: "/dashboard/account" },
  { key: "nav.support", icon: <HelpCircle size={20} />, href: "/dashboard/support" },
  { key: "nav.guide", icon: <BookOpen size={20} />, href: "/dashboard/guide" },
  { key: "nav.settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const { user, t, sidebarOpen, setSidebarOpen } = useApp();
  const pathname = usePathname();
  const userLevel = user?.userLevel || 5;

  const filtered = navItems.filter((item) => {
    if (item.maxLevel && userLevel > item.maxLevel) return false;
    if (item.minLevel && userLevel < item.minLevel) return false;
    return true;
  });

  return (
    <aside
      className={`${
        sidebarOpen ? "w-56" : "w-16"
      } h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-200 shrink-0`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {sidebarOpen && (
          <span className="font-bold text-lg text-brand-700 dark:text-brand-200">DPC</span>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {filtered.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-200 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {sidebarOpen && <span>{t(item.key)}</span>}
            </Link>
          );
        })}
      </nav>

      {sidebarOpen && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center">
            {t("auth.demoNotice")}
          </p>
        </div>
      )}
    </aside>
  );
}
