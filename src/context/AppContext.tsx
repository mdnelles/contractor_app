"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { User, Contract, Store, TodoItem } from "@/types";
import { Locale, t as translate } from "@/lib/translations";
import { seedUsers, seedContracts, seedStores, seedTodos } from "@/data/seed";

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;

  // Data (in-memory, demo mode)
  users: User[];
  contracts: Contract[];
  stores: Store[];
  todos: TodoItem[];
  setUsers: (users: User[]) => void;
  setContracts: (contracts: Contract[]) => void;
  setStores: (stores: Store[]) => void;
  setTodos: (todos: TodoItem[]) => void;
  updateContract: (id: string, data: Partial<Contract>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;

  // UI
  darkMode: boolean;
  toggleDarkMode: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Snackbar
  snackbar: { message: string; type: "success" | "error" | "info" | "warning" } | null;
  showSnackbar: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  clearSnackbar: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Data state (seeded)
  const [users, setUsersState] = useState<User[]>(seedUsers);
  const [contracts, setContractsState] = useState<Contract[]>(seedContracts);
  const [stores, setStoresState] = useState<Store[]>(seedStores);
  const [todos, setTodosState] = useState<TodoItem[]>(seedTodos);

  // UI state
  const [darkMode, setDarkMode] = useState(false);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [snackbar, setSnackbar] = useState<AppState["snackbar"]>(null);

  // Restore session from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("dpc-session");
      if (saved) {
        const { token: t, user: u } = JSON.parse(saved);
        if (t && u) {
          setToken(t);
          setUser(u);
        }
      }
      const dm = sessionStorage.getItem("dpc-darkmode");
      if (dm === "true") setDarkMode(true);
      const lang = sessionStorage.getItem("dpc-locale") as Locale;
      if (lang === "en" || lang === "es") setLocaleState(lang);
    } catch {}
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    sessionStorage.setItem("dpc-darkmode", String(darkMode));
  }, [darkMode]);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    sessionStorage.setItem("dpc-session", JSON.stringify({ token: newToken, user: newUser }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("dpc-session");
    // Reset data to seed on logout
    setUsersState(seedUsers);
    setContractsState(seedContracts);
    setStoresState(seedStores);
    setTodosState(seedTodos);
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    sessionStorage.setItem("dpc-locale", l);
  }, []);

  const tFn = useCallback((key: string) => translate(key, locale), [locale]);

  const updateContract = useCallback((id: string, data: Partial<Contract>) => {
    setContractsState((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  }, []);

  const updateUser = useCallback((id: string, data: Partial<User>) => {
    setUsersState((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  }, []);

  const addTodo = useCallback((todo: TodoItem) => {
    setTodosState((prev) => [todo, ...prev]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodosState((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSnackbar = useCallback((message: string, type: AppState["snackbar"] extends null ? never : NonNullable<AppState["snackbar"]>["type"] = "info") => {
    setSnackbar({ message, type });
    setTimeout(() => setSnackbar(null), 4000);
  }, []);

  const clearSnackbar = useCallback(() => setSnackbar(null), []);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        users,
        contracts,
        stores,
        todos,
        setUsers: setUsersState,
        setContracts: setContractsState,
        setStores: setStoresState,
        setTodos: setTodosState,
        updateContract,
        updateUser,
        addTodo,
        deleteTodo,
        darkMode,
        toggleDarkMode,
        locale,
        setLocale,
        t: tFn,
        sidebarOpen,
        setSidebarOpen,
        snackbar,
        showSnackbar,
        clearSnackbar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
