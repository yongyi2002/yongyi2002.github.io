import Link from "next/link";
import { DOMAINS, projects } from "@/lib/projects";

/**
 * Every selected project against the domains it works in.
 *
 * An incidence matrix rather than a Venn diagram: four sets is one more than a
 * Venn draws legibly, and at ten rows a matrix is read at a glance. Rows are
 * ordered by the span of domains they touch, so the marks fall into a diagonal
 * and the reach from machine learning through fabrication to computational
 * design becomes the shape of the table itself rather than a claim about it.
 *
 * Presence is the only thing encoded, so it takes one colour, not four. A
 * categorical palette here would add no meaning and would fight a page built on
 * ink and a single accent.
 *
 * It is a real table, so the row and column headers carry the meaning for a
 * screen reader and the marks are decoration over text.
 */
export function DomainMatrix() {
  const rows = projects
    .filter((project) => project.category === "selected")
    .map((project) => {
      const columns = DOMAINS.map((domain) => project.domains.includes(domain));
      const hits = columns.flatMap((on, i) => (on ? [i] : []));
      return {
        project,
        columns,
        first: hits.length ? hits[0] : DOMAINS.length,
        last: hits.length ? hits[hits.length - 1] : DOMAINS.length,
      };
    })
    .sort(
      (a, b) =>
        a.first - b.first ||
        a.last - b.last ||
        a.project.year.localeCompare(b.project.year),
    );

  return (
    <div className="mt-6 overflow-x-auto">
      {/* Wide enough that no header or project name wraps; below that the wrapper
          scrolls, because a wrapped row label breaks the alignment the matrix is
          read by. */}
      <table className="w-full min-w-[56rem] border-collapse">
        <thead>
          <tr>
            <th scope="col" className="label whitespace-nowrap pb-3 pr-6 text-left font-normal text-faint">
              Project
            </th>
            {DOMAINS.map((domain) => (
              <th
                key={domain}
                scope="col"
                className="label whitespace-nowrap px-3 pb-3 text-left font-normal text-faint"
              >
                {domain}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ project, columns }) => (
            <tr
              key={project.slug}
              className="group border-t border-hairline transition-colors hover:bg-subtle"
            >
              <th
                scope="row"
                className="whitespace-nowrap py-2.5 pr-6 text-left text-sm font-normal"
              >
                <Link
                  href={`/projects/${project.slug}/`}
                  className="text-muted transition-colors group-hover:text-accent"
                >
                  {project.title}
                </Link>
              </th>
              {columns.map((on, i) => (
                <td key={DOMAINS[i]} className="px-3 py-2.5">
                  <span className="sr-only">{on ? "yes" : "no"}</span>
                  <span
                    aria-hidden
                    className={`block size-2.5 rounded-full ${on ? "bg-accent" : "bg-line"}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
