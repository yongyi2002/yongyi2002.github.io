import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

/** Minimal top bar for the pages that sit outside the split index. */
export function PageNav({ marker }: { marker?: string }) {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-background/90 px-6 py-4 backdrop-blur md:px-12">
      <Link
        href="/"
        className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
          ←
        </span>
        Back to Index
      </Link>
      <div className="flex items-center gap-5">
        {marker && <span className="label text-faint">{marker}</span>}
        <ThemeToggle />
      </div>
    </nav>
  );
}
