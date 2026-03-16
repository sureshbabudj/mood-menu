"use client";

import Header from "@/components/header";
import { BottomNavBar } from "./bottom-nav-bar";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div className="sticky top-0 z-40 border-b border-primary/10 bg-background/80 backdrop-blur-md">
        <Header />
      </div>
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 sm:pb-10 lg:px-10">
        {children}
      </main>
      <div className="hidden sm:block">
        <Footer />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <BottomNavBar />
      </div>
    </div>
  );
}
