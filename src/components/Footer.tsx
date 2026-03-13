const leftLinks = ["서비스 이용약관", "커뮤니티 이용수칙", "개인정보 처리방침"];
const rightLinks = ["설문조사", "공지사항"];

export function Footer() {
  return (
    <footer className="h-[52px] bg-[var(--bg-primary)] flex items-center justify-center">
      <div className="w-full px-8 flex items-center justify-between">
        <span className="text-[13px] text-[var(--text-quaternary)]">
          © 2026 Coin Digest. All rights reserved.
        </span>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {leftLinks.map((link) => (
              <button
                key={link}
                className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-tertiary)] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {rightLinks.map((link) => (
              <button
                key={link}
                className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-tertiary)] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
