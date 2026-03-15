"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketSummary } from "@/components/MarketSummary";
import { AISummaryCard } from "@/components/AISummaryCard";
import { TopMovers } from "@/components/TopMovers";
import { NewsCard } from "@/components/NewsCard";

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
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      <main className="flex-1 pt-[100px] pb-8 px-8 max-w-[1440px] mx-auto w-full">
        <MarketSummary />
        <div className="mt-6 flex gap-3 items-start">
          <AISummaryCard />
          <TopMovers />
        </div>
        <div className="mt-3">
          <NewsCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
