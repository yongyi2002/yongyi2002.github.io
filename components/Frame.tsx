/**
 * Image frame for the project index. Nothing is drawn at rest — the picture
 * stands on its own; on hover a hairline traces the edge, which reads as a
 * focus state without leaving marks on the page when idle.
 * Expects a `group` ancestor.
 */
export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-subtle">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 border border-transparent transition-colors duration-500 ease-out group-hover:border-accent/55"
      />
    </div>
  );
}
