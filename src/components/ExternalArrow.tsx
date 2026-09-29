/**
 * Yeni sekmede açılan bağlantılar için çapraz ok. "↗" karakteri bazı
 * sistemlerde (ör. Windows) emoji olarak çizildiği için SVG kullanılıyor.
 */
export default function ExternalArrow({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
