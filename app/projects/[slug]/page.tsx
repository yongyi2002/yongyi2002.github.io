import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/lib/projects";
import { sizeOf } from "@/lib/image-sizes";
import { PageNav } from "@/components/PageNav";
import { PaperCover } from "@/components/PaperCover";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.blurb,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.blurb,
      images: project.hero ? [{ url: project.hero }] : undefined,
    },
  };
}

const META_LABELS: Record<string, string> = {
  type: "Type",
  instructor: "Instructor",
  collaborators: "Collaborators",
  role: "Role",
  publication: "Publication",
};

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  // Only the selected works carry an index number; other works are unnumbered.
  const number =
    project.category === "selected"
      ? String(
          projects.filter((p) => p.category === "selected").indexOf(project) + 1,
        ).padStart(2, "0")
      : null;

  const metaEntries = Object.entries(project.meta).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );

  return (
    <>
      <PageNav marker={number ? `Project ${number}` : "Other work"} />
      <article className="mx-auto max-w-5xl px-6">
      <header className="py-12 sm:py-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          {project.subtitle}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6 font-mono text-sm text-muted">
          <div>
            <dt className="label mb-1 text-faint">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="label mb-1 text-faint">Type</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt className="label mb-1 text-faint">Domain</dt>
            <dd>{project.domains.join(" / ")}</dd>
          </div>
        </dl>
      </header>

      <figure className="relative aspect-[16/9] overflow-hidden bg-line">
        {project.hero ? (
          <Image
            src={project.hero}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        ) : (
          <PaperCover project={project} />
        )}
      </figure>

      {project.stats && project.stats.length > 0 && (
        <dl className="grid gap-8 border-b border-line py-10 sm:grid-cols-3 sm:gap-6">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-2xl font-medium tracking-tight tabular-nums sm:text-3xl">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm font-medium">{stat.label}</dt>
              {stat.detail && (
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {stat.detail}
                </p>
              )}
            </div>
          ))}
        </dl>
      )}

      <div className="grid gap-10 py-12 sm:py-16 md:grid-cols-[1fr_2fr] md:gap-12">
        <aside className="md:sticky md:top-10 md:self-start">
          {metaEntries.length > 0 && (
            <dl className="space-y-4 text-sm">
              {metaEntries.map(([key, value]) => (
                <div key={key}>
                  <dt className="font-mono text-xs uppercase tracking-wide text-muted">
                    {META_LABELS[key] ?? key}
                  </dt>
                  <dd className="mt-1 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {project.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-line px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {project.links && project.links.length > 0 && (
            <ul className="mt-8 space-y-2 text-sm">
              {project.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 transition-colors hover:text-muted"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div>
          {project.description.map((paragraph, i) => (
            <p
              key={i}
              className="mb-5 text-[15px] leading-relaxed text-foreground/90 last:mb-0 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
          {project.note && (
            <p className="mt-8 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              {project.note}
            </p>
          )}
        </div>
      </div>

      {project.table && (
        <section className="border-t border-line pt-12 sm:pt-16">
          {project.table.caption && (
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
              {project.table.caption}
            </h2>
          )}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-foreground/25">
                  {project.table.columns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={`py-2 pr-4 font-mono text-xs font-normal uppercase tracking-wide text-muted ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {project.table.rows.map((row) => (
                  <tr
                    key={row.cells[0]}
                    className={`border-b border-line ${
                      row.highlight ? "font-medium" : ""
                    }`}
                  >
                    {row.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-2.5 pr-4 ${
                          i === 0
                            ? "text-left"
                            : "text-right tabular-nums"
                        } ${row.highlight ? "" : "text-foreground/80"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {project.table.note && (
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
              {project.table.note}
            </p>
          )}
        </section>
      )}

      {project.video && (
        <section className="border-t border-line pt-12 sm:pt-16">
          <figure>
            {/* preload="none" so the clip costs nothing until the viewer asks for it */}
            <video
              src={project.video.src}
              poster={project.video.poster}
              controls
              preload="none"
              playsInline
              className="w-full bg-line"
            />
            {project.video.caption && (
              <figcaption className="mt-3 font-mono text-xs text-muted">
                Video — {project.video.caption}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      <section className="space-y-12 border-t border-line pt-12 sm:space-y-16 sm:pt-16">
        {project.gallery.map((image, i) => {
          const { width, height } = sizeOf(image.src);
          return (
          <figure key={image.src}>
            <Image
              src={image.src}
              alt={image.caption ?? `${project.title} — image ${i + 1}`}
              width={width}
              height={height}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="mx-auto h-auto max-h-[85vh] w-auto max-w-full"
            />
            {image.caption && (
              <figcaption className="mt-3 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")} — {image.caption}
              </figcaption>
            )}
          </figure>
          );
        })}
      </section>

      <nav className="mt-16 grid gap-px border-t border-line sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group border-b border-line py-6 sm:border-b-0 sm:border-r sm:pr-6"
          >
            <span className="font-mono text-xs text-muted">← Previous</span>
            <p className="mt-1 text-lg font-medium tracking-tight transition-colors group-hover:text-muted">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}

        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group border-b border-line py-6 sm:border-b-0 sm:text-right"
          >
            <span className="font-mono text-xs text-muted">Next →</span>
            <p className="mt-1 text-lg font-medium tracking-tight transition-colors group-hover:text-muted">
              {next.title}
            </p>
          </Link>
        )}
      </nav>

      <div className="border-t border-line py-8">
        <Link
          href="/"
          className="label text-faint transition-colors hover:text-foreground"
        >
          ← All works
        </Link>
      </div>
      </article>
    </>
  );
}
