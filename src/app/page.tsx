"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarketSummary } from "@/components/MarketSummary";
import { AISummaryCard } from "@/components/AISummaryCard";
import { TopMovers } from "@/components/TopMovers";
import { NewsCard } from "@/components/NewsCard";
import { KolAttentionCard } from "@/components/KolAttentionCard";
import { PriceTable } from "@/components/PriceTable";
import { CommunitySentimentCard } from "@/components/CommunitySentimentCard";
import { TechnicalIndicatorCard } from "@/components/TechnicalIndicatorCard";

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
        {/* 시장 현황 */}
        <MarketSummary />
        <div className="mt-6 flex gap-3 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-3 basis-[65%] shrink-0">
            <TopMovers />
            <PriceTable />
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <AISummaryCard />
            <NewsCard />
          </div>
        </div>

        {/* 소셜 데이터 */}
        <section className="mt-16 flex flex-col gap-3">
          <h2 className="text-[16px] leading-[24px] font-semibold text-[var(--text-secondary)]">
            소셜 데이터
          </h2>
          <div className="flex gap-3 items-stretch">
            <div className="basis-[65%] shrink-0 flex">
              <KolAttentionCard />
            </div>
            <div className="basis-[35%] min-w-0 flex">
              <CommunitySentimentCard />
            </div>
          </div>
        </section>

        {/* 보조지표 */}
        <section className="mt-16 flex flex-col gap-3">
          <h2 className="text-[16px] leading-[24px] font-semibold text-[var(--text-secondary)]">
            보조지표
          </h2>
          <TechnicalIndicatorCard />
        </section>
      </main>
      <Footer />
    </div>
  );
}
