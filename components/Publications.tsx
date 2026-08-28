import Link from "next/link";
import { profile } from "@/lib/profile";
import { publications, type Author } from "@/lib/publications";

function Authors({ authors }: { authors: Author[] }) {
  return (
    <p className="mt-2 text-sm text-muted">
      {authors.map((author, i) => (
        <span key={author.name}>
          <span
            className={
              author.name === profile.name ? "font-medium text-foreground" : undefined
            }
          >
            {author.name}
          </span>
          {author.first && <sup aria-hidden>*</sup>}
          {i < authors.length - 1 && ", "}
        </span>
      ))}
    </p>
  );
}

const pill =
  "label border border-line px-3 py-1.5 text-faint transition-colors hover:border-accent hover:text-accent";

export function Publications() {
  if (publications.length === 0) return null;

  return (
    <section id="publications" className="scroll-mt-4 border-b border-line px-8 py-16 md:px-16 md:py-20">
      <span className="label mb-8 block text-accent">Selected Publications</span>

      <ol className="space-y-14">
        {publications.map((p) => {
          const firstAuthors = p.authors.filter((a) => a.first).length;
          const isFirstAuthor = p.authors.find((a) => a.name === profile.name)?.first;

          return (
            <li key={p.title} className="max-w-3xl border-l border-line pl-6 transition-colors hover:border-accent">
              <div className="flex flex-wrap items-center gap-2">
                {isFirstAuthor && (
                  <span className="label border border-accent/40 px-2 py-1 text-accent">
                    {firstAuthors > 1 ? "Co-first author" : "First author"}
                  </span>
                )}
                {p.status && <span className="label text-faint">{p.status}</span>}
              </div>

              <h3 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
                {p.title}
                {p.subtitle && (
                  <span className="block text-base font-normal leading-snug text-foreground/85 sm:text-lg">
                    {p.subtitle}
                  </span>
                )}
              </h3>

              <Authors authors={p.authors} />

              {firstAuthors > 0 && (
                <p className="mt-1 text-xs text-muted">
                  {firstAuthors > 1
                    ? "* Equal contribution — co-first authors"
                    : "* First author"}
                </p>
              )}

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.venue} · {p.year}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className={pill}>
                    Paper ↗
                  </a>
                )}
                {p.pdf && (
                  <a href={p.pdf} target="_blank" rel="noreferrer" className={pill}>
                    PDF ↗
                  </a>
                )}
                {p.doi && (
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className={pill}
                  >
                    DOI ↗
                  </a>
                )}
                {p.project && (
                  <Link href={`/projects/${p.project}`} className={pill}>
                    Project →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
