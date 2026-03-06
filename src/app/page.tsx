"use client";

import { useState } from "react";
import { MetricItem } from "@/components/MetricItem";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/icons";

// Theme toggle switch component
function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full px-4 py-2 cursor-pointer transition-colors hover:bg-[var(--bg-tertiary)]"
    >
      <span className="text-[14px] font-medium text-[var(--text-secondary)]">
        {isDark ? "Dark" : "Light"}
      </span>
      <div className="relative w-[44px] h-[24px] bg-[var(--bg-tertiary)] rounded-full">
        <div
          className={`absolute top-[2px] w-[20px] h-[20px] rounded-full bg-[var(--fg-primary)] transition-transform ${
            isDark ? "left-[22px]" : "left-[2px]"
          }`}
        />
      </div>
    </button>
  );
}

// Mock data for related coins
const relatedCoins = [
  { name: "헤데라", ticker: "HBAR", price: "$4.23", change: -2.42, color: "#6366f1" },
  { name: "테더", ticker: "AAVE", price: "$0.4312", change: -0.12, color: "#f97316" },
  { name: "델리시움", ticker: "DEL", price: "$51.33", change: 5.15, color: "#eab308" },
  { name: "에테나", ticker: "ENA", price: "$0.023", change: -0.43, color: "#06b6d4" },
  { name: "카이토", ticker: "KAT", price: "$17.03", change: 5.82, color: "#8b5cf6" },
];

// Mock data for real-time gainers
const realtimeGainers = [
  { name: "헤데라", ticker: "HBAR", price: "$4.23", change: -2.42, color: "#6366f1" },
  { name: "테더", ticker: "AAVE", price: "$0.4312", change: -0.12, color: "#f97316" },
  { name: "델리시움", ticker: "DEL", price: "$51.33", change: 5.15, color: "#eab308" },
];

// Change indicator component
function ChangeIndicator({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <div className="flex items-center gap-[2px]">
      <span className="size-5 flex items-center justify-center">
        {isPositive ? (
          <ArrowUpIcon className="text-[var(--fg-success-primary)]" />
        ) : (
          <ArrowDownIcon className="text-[var(--fg-error-primary)]" />
        )}
      </span>
      <span
        className={`text-[14px] leading-[20px] font-medium ${
          isPositive ? "text-[var(--fg-success-primary)]" : "text-[var(--fg-error-primary)]"
        }`}
      >
        {isPositive ? "+" : ""}{value}%
      </span>
    </div>
  );
}

// Crypto icon placeholder
function CryptoIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: color }}
    />
  );
}

// Divider component
function Divider() {
  return <div className="w-full h-px bg-[var(--border-secondary)]" />;
}

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-8"
    >
      <div className="flex flex-col gap-[20px]">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[12px]">
            <h1 className="text-[20px] leading-[30px] font-medium text-[var(--text-primary)]">
              코인 현황
            </h1>
            <Chip color="success" size="sm">
              실시간
            </Chip>
          </div>
          <Button variant="outline" size="small">
            개인화 설정
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex gap-[20px]">
          {/* Left Column - Coin Detail Card */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[12px] px-[20px] py-[24px] flex flex-col gap-[30px] w-[326px]">
            {/* Coin Header */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[8px]">
                <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">E</span>
                </div>
                <div className="flex items-center gap-[4px] text-[var(--text-tertiary)]">
                  <span className="text-[18px] leading-[28px] font-semibold">이더리움</span>
                  <span className="text-[16px] leading-[24px] font-normal">(ETH)</span>
                </div>
              </div>
              <p className="text-[30px] leading-[38px] font-semibold text-[var(--text-primary)]">
                $3,614.49
              </p>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-col gap-[30px]">
              <Divider />

              <div className="flex flex-col gap-[30px]">
                {/* Row 1 */}
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px] leading-[20px] font-medium text-[var(--text-tertiary)]">
                      전일 대비 가격
                    </p>
                    <ChangeIndicator value={1.02} />
                  </div>
                  <div className="flex flex-col gap-[4px] items-end">
                    <p className="text-[14px] leading-[20px] font-medium text-[var(--text-tertiary)]">
                      전일 고가 대비
                    </p>
                    <ChangeIndicator value={1.02} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[14px] leading-[20px] font-medium text-[var(--text-tertiary)]">
                      전일 대비 거래량
                    </p>
                    <ChangeIndicator value={13.02} />
                  </div>
                  <div className="flex flex-col gap-[4px] items-end">
                    <p className="text-[14px] leading-[20px] font-medium text-[var(--text-tertiary)]">
                      전일 저가 대비
                    </p>
                    <ChangeIndicator value={1.42} />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Market Info */}
              <div className="flex flex-col gap-[14px] text-[14px] leading-[20px] font-medium">
                <div className="flex justify-between">
                  <span className="text-[var(--text-tertiary)]">시가총액</span>
                  <span className="text-[var(--text-secondary)]">$1,609백만</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-tertiary)]">완전희석가치 (FDV)</span>
                  <span className="text-[var(--text-secondary)]">$572백만</span>
                </div>
              </div>
            </div>

            <Divider />

            {/* Related Coins */}
            <div className="flex flex-col gap-[16px]">
              <p className="text-[14px] leading-[20px] font-medium text-[var(--text-tertiary)]">
                관련 종목
              </p>
              <div className="flex flex-col gap-[10px]">
                {relatedCoins.map((coin, index) => (
                  <div key={coin.ticker}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[12px]">
                        <CryptoIcon color={coin.color} />
                        <div className="flex flex-col w-[104px]">
                          <span className="text-[14px] leading-[20px] font-medium text-[var(--text-primary)]">
                            {coin.name}
                          </span>
                          <span className="text-[12px] leading-[18px] font-medium text-[var(--text-tertiary)]">
                            {coin.ticker}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[14px] leading-[20px] font-medium text-[var(--text-secondary)]">
                          {coin.price}
                        </span>
                        <ChangeIndicator value={coin.change} />
                      </div>
                    </div>
                    {index < relatedCoins.length - 1 && (
                      <div className="mt-[10px]">
                        <Divider />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-[20px] w-[388px]">
            {/* Real-time Gainers */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[12px] px-[20px] py-[24px] flex flex-col gap-[16px] h-[261px] overflow-hidden">
              <p className="text-[16px] leading-[24px] font-semibold text-[var(--text-secondary)]">
                실시간 상승 종목
              </p>
              <div className="flex flex-col gap-[20px]">
                {realtimeGainers.map((coin) => (
                  <div key={coin.ticker} className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <CryptoIcon color={coin.color} />
                      <div className="flex flex-col w-[104px]">
                        <span className="text-[14px] leading-[20px] font-medium text-[var(--text-primary)]">
                          {coin.name}
                        </span>
                        <span className="text-[12px] leading-[18px] font-medium text-[var(--text-tertiary)]">
                          {coin.ticker}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[14px] leading-[20px] font-medium text-[var(--text-secondary)]">
                        {coin.price}
                      </span>
                      <ChangeIndicator value={coin.change} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Items */}
            <MetricItem
              label="이더리움"
              value="1,394.12원"
              changePercent={102}
              trend="up"
            />
            <MetricItem
              label="비트코인"
              value="1,394.12원"
              changePercent={2.46}
              trend="down"
            />
            <MetricItem
              label="환율"
              value="1,394.12원"
              changePercent={102}
              trend="up"
            />
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
    </div>
  );
}
