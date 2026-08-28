/**
 * Corner brackets that expand to trace the whole frame on hover — the marker
 * that a still is a captured, measured thing rather than just a picture.
 * Expects a `group` ancestor.
 */
export function Bracketed({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 size-4 border-l border-t border-faint transition-all duration-700 ease-out group-hover:size-full group-hover:border-accent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-10 size-4 border-b border-r border-faint transition-all duration-700 ease-out group-hover:size-full group-hover:border-accent"
      />
      <div className="overflow-hidden bg-subtle">{children}</div>
    </div>
  );
}
