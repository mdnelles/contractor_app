"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { seedUsers } from "@/data/seed";
import { USER_LEVELS } from "@/types";
import { Moon, Sun, Globe, LogIn } from "lucide-react";

export default function LoginPage() {
   const {
      login,
      t,
      darkMode,
      toggleDarkMode,
      locale,
      setLocale,
      showSnackbar,
   } = useApp();
   const router = useRouter();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 500));

      const user = seedUsers.find(
         (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password &&
            !u.isDeleted,
      );

      if (user) {
         const token = `demo-token-${user.id}-${Date.now()}`;
         login(token, user);
         showSnackbar(`${t("profile.welcome")}, ${user.firstName}!`, "success");
         router.push("/dashboard/profile");
      } else {
         showSnackbar("Invalid email or password", "error");
      }
      setLoading(false);
   };

   const handleDemoLogin = (userId: string) => {
      const user = seedUsers.find((u) => u.id === userId);
      if (user) {
         const token = `demo-token-${user.id}-${Date.now()}`;
         login(token, user);
         showSnackbar(`${t("profile.welcome")}, ${user.firstName}!`, "success");
         router.push("/dashboard/profile");
      }
   };

   const demoUsers = seedUsers
      .filter((u) => !u.isDeleted && !u.isDisabled)
      .slice(0, 5);

   return (
      <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
         {/* Top controls */}
         <div className='flex justify-end gap-2 p-4'>
            <button
               onClick={() => setLocale(locale === "en" ? "es" : "en")}
               className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
            >
               <Globe size={16} />
               <span className='text-xs font-medium uppercase'>{locale}</span>
            </button>
            <button
               onClick={toggleDarkMode}
               className='p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'
            >
               {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
         </div>

         <div className='flex-1 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
               {/* Logo / Title */}
               <div className='text-center mb-8'>
                  <h1 className='text-3xl font-bold text-brand-700 dark:text-brand-200 mb-2'>
                     Direct Property Care
                  </h1>
                  <p className='text-gray-500 dark:text-gray-400'>
                     {t("auth.signInContinue")}
                  </p>
               </div>

               {/* Login form */}
               <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6'>
                  <h2 className='text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200'>
                     {t("auth.login")}
                  </h2>
                  <form onSubmit={handleLogin} className='space-y-4'>
                     <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                           {t("auth.email")}
                        </label>
                        <input
                           type='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className='w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition'
                           placeholder='admin@dpcnotreal.zx'
                           required
                        />
                     </div>
                     <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                           {t("auth.password")}
                        </label>
                        <input
                           type='password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className='w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition'
                           placeholder='admin123'
                           required
                        />
                     </div>
                     <button
                        type='submit'
                        disabled={loading}
                        className='w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors disabled:opacity-50'
                     >
                        <LogIn size={18} />
                        {loading ? t("common.loading") : t("auth.login")}
                     </button>
                  </form>

                  <div className='mt-4 flex items-center justify-between text-sm'>
                     <Link
                        href='/forgot'
                        className='text-brand-600 dark:text-brand-400 hover:underline'
                     >
                        {t("auth.forgot")}
                     </Link>
                     <Link
                        href='/signup'
                        className='text-brand-600 dark:text-brand-400 hover:underline'
                     >
                        {t("auth.noAccount")}
                     </Link>
                  </div>
               </div>

               {/* Demo accounts */}
               <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
                  <h3 className='text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1'>
                     {t("auth.demoAccounts")}
                  </h3>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mb-3'>
                     {t("auth.selectDemo")}
                  </p>
                  <div className='space-y-2'>
                     {demoUsers.map((u) => (
                        <button
                           key={u.id}
                           onClick={() => handleDemoLogin(u.id)}
                           className='w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left'
                        >
                           <div>
                              <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>
                                 {u.firstName} {u.lastName}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-400'>
                                 {u.email}
                              </p>
                           </div>
                           <span className='text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'>
                              {USER_LEVELS[u.userLevel]}
                           </span>
                        </button>
                     ))}
                  </div>
               </div>

               <p className='text-center text-xs text-gray-400 dark:text-gray-600 mt-4'>
                  {t("auth.demoNotice")}
               </p>
            </div>
         </div>
      </div>
   );
}
