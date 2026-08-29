"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Bracketed } from "@/components/Bracketed";
import { LoopingCover } from "@/components/LoopingCover";
import { PaperCover } from "@/components/PaperCover";
import { DOMAINS, type Project } from "@/lib/projects";

type Props = { projects: Project[]; startIndex?: number };

export function ProjectIndex({ projects, startIndex = 1 }: Props) {
  const [active, setActive] = useState<string>("All");

  const counts = useMemo(() => {
    const map = new Map<string, number>([["All", projects.length]]);
    for (const domain of DOMAINS) {
      map.set(domain, projects.filter((p) => p.domains.includes(domain)).length);
    }
    return map;
  }, [projects]);

  const shown = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.domains.includes(active as never)),
    [projects, active],
  );

  const filters = ["All", ...DOMAINS].filter((f) => (counts.get(f) ?? 0) > 0);

  return (
    <>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line px-8 py-5 md:px-16">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`label transition-colors ${
                isActive ? "text-accent" : "text-faint hover:text-foreground"
              }`}
            >
              {filter}
              <sup className="ml-1 tracking-normal">{counts.get(filter)}</sup>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col">
        {shown.map((project) => {
          const number = String(
            projects.findIndex((p) => p.slug === project.slug) + startIndex,
          ).padStart(3, "0");

          return (
            <article
              key={project.slug}
              className="group border-b border-line transition-colors duration-500 hover:bg-subtle"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="block px-8 py-14 md:px-16 md:py-20"
              >
                <div className="relative mb-8 flex items-end justify-between gap-6">
                  <span
                    aria-hidden
                    className="absolute -left-8 top-1 h-8 w-px bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:-left-16"
                  />
                  <div>
                    <span className="label block text-accent">/{number}</span>
                    <h3 className="mt-2 text-3xl font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-foreground md:text-5xl">
                      {project.title}
                    </h3>
                  </div>
                  <div className="hidden shrink-0 items-center gap-3 font-mono text-xs text-faint sm:flex">
                    <span>{project.year}</span>
                    <span className="h-3 w-px bg-line" />
                    <span>{project.kind}</span>
                  </div>
                </div>

                <Bracketed>
                  <div className="relative aspect-[16/9]">
                    {project.cover ? (
                      <LoopingCover
                        src={project.cover.src}
                        poster={project.cover.poster}
                        label={`${project.title} — looping clip`}
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : project.hero ? (
                      <Image
                        src={project.hero}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <PaperCover project={project} />
                    )}

                    {/* viewfinder readout, revealed on hover */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4"
                    >
                      <span className="label translate-y-1 bg-background/85 px-2 py-1 text-accent backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
                        ▸ Open project
                      </span>
                      <span className="label hidden translate-y-1 bg-background/85 px-2 py-1 text-faint backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0 sm:inline-block">
                        {project.domains[0]}
                      </span>
                    </div>
                  </div>
                </Bracketed>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                  {project.subtitle}
                </p>
                <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-faint">
                  {project.tags.join(" · ")}
                </p>
              </Link>
            </article>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p className="px-8 py-20 text-sm text-muted md:px-16">
          Nothing in this category yet.
        </p>
      )}
    </>
  );
}
