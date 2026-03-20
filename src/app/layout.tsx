import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Snackbar from "@/components/ui/Snackbar";

export const metadata: Metadata = {
  title: "Direct Property Care",
  description: "Contractor management platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>
          {children}
          <Snackbar />
        </AppProvider>
      </body>
    </html>
  );
}
