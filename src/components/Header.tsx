import { SearchIcon, MoonIcon, SunIcon, BellIcon, UserIcon } from "./icons";

const navItems = [
  { label: "홈", active: true },
  { label: "종목 골라보기", active: false },
  { label: "커뮤니티", active: false },
];

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Header({ isDark, onThemeToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center justify-center">
      <div className="w-full px-8 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-[39px]">
          <span className="font-['Sarpanch',sans-serif] text-[22px] font-bold text-[var(--text-primary)] tracking-tight">
            CRYPTALK
          </span>
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`text-[14px] font-medium px-[2px] ${
                  item.active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Actions + Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <button className="p-3 rounded-[8px] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors">
              <SearchIcon />
            </button>
            <button
              onClick={onThemeToggle}
              className="p-3 rounded-[8px] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </button>
            <button className="p-3 rounded-[8px] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors">
              <BellIcon />
            </button>
          </div>
          <div className="size-9 rounded-full bg-[var(--bg-quaternary)] border border-[var(--border-secondary)] flex items-center justify-center overflow-hidden">
            <UserIcon className="text-[var(--fg-tertiary)]" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
