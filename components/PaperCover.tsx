import type { Project } from "@/lib/projects";

/**
 * Stand-in cover for a paper with no photograph of its own: a typographic card
 * rather than a borrowed figure. Rendered, not rasterised, so it stays sharp —
 * and laid out to fit a 16:9 frame at any width without clipping.
 */
export function PaperCover({ project }: { project: Project }) {
  const label = project.meta.publication ?? project.kind;
  const figures = project.stats
    ?.map((s) => `${s.value} ${s.label.toLowerCase()}`)
    .join("  ·  ");

  return (
    <div className="flex size-full flex-col justify-between overflow-hidden bg-[#0e0e10] p-5 text-[#fafafa] sm:p-8 md:p-10">
      <div className="min-h-0">
        <span className="label text-accent">{label}</span>
        <p className="mt-2 text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {project.title}
          <span className="text-accent">.</span>
        </p>
        <p className="mt-2 line-clamp-2 max-w-2xl text-[11px] leading-snug text-[#a9a9b2] sm:mt-3 sm:text-base">
          {project.subtitle}
        </p>
      </div>

      {figures && (
        <p className="label shrink-0 border-t border-[#26262a] pt-3 text-[#71717a] sm:pt-4">
          {figures}
        </p>
      )}
    </div>
  );
}
