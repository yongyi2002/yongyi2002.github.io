"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; label: string; count?: number };

/**
 * Index of the feed, pinned in the sidebar. The left rail runs continuously
 * through the items and only the current segment is lit, so the panel reads as
 * a position indicator rather than a plain list of links.
 */
export function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    // A plain scroll read rather than an observer: the active section is simply
    // the last one whose top has passed the playhead line. Four rect reads per
    // event is cheap, and React bails out when the id has not changed.
    const update = () => {
      // The final section is shorter than a viewport, so its top can never
      // reach the playhead line — at the end of the page, light it explicitly.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(nodes[nodes.length - 1].id);
        return;
      }

      const line = window.innerHeight * 0.2;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node;
      }
      setActive(current.id);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  const activeIndex = Math.max(
    sections.findIndex((s) => s.id === active),
    0,
  );

  return (
    <nav aria-label="Sections" className="hidden md:block">
      <div className="flex items-baseline justify-between border-b border-line pb-2">
        <span className="label text-faint">Index</span>
        <span className="font-mono text-[10px] text-faint">
          <span className="text-accent">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="mx-px">/</span>
          {String(sections.length).padStart(2, "0")}
        </span>
      </div>

      <ol>
        {sections.map((section, i) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3 border-l-2 py-2 pl-3 text-sm transition-all ${
                  isActive
                    ? "border-accent bg-subtle text-foreground"
                    : "border-line text-muted hover:border-foreground/40 hover:pl-4 hover:text-foreground"
                }`}
              >
                <span
                  className={`font-mono text-[10px] transition-colors ${
                    isActive ? "text-accent" : "text-faint"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate">{section.label}</span>
                {section.count !== undefined && (
                  <span className="font-mono text-[10px] text-faint">
                    {section.count}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
