export function PersonalizeButton() {
  return (
    <button className="bg-[var(--bg-secondary)] border-[1.2px] border-[var(--border-secondary)] rounded-[var(--radius-md)] px-[14px] py-[10px] text-[length:var(--font-size-text-sm)] leading-[var(--line-height-text-sm)] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
      개인화
    </button>
  );
}

export default PersonalizeButton;
