"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketSummary } from "@/components/MarketSummary";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      <main className="pt-[105px] pb-[68px] px-8 max-w-[1512px] mx-auto">
        <MarketSummary />
      </main>
      <Footer />
    </div>
  );
}
