type Entry = {
  school: string;
  degree: string;
  period: string;
  start: string;
  end?: string;
  expected?: boolean;
  kind: "education" | "work";
};

/** "YYYY-MM" → a decimal year, so bars can be positioned by simple arithmetic. */
function toYear(value: string) {
  const [y, m] = value.split("-").map(Number);
  return y + ((m ?? 1) - 1) / 12;
}

/**
 * Experience drawn as parallel bars on one shared axis. A single stacked list
 * would imply these ran in sequence; several of them overlap — a fellowship
 * inside a master's, an exchange inside a bachelor's — so they are shown as
 * concurrent tracks instead.
 */
export function Timeline({ entries, now }: { entries: Entry[]; now: string }) {
  const nowYear = toYear(now);

  const rows = entries
    .map((e) => ({ ...e, from: toYear(e.start), to: e.end ? toYear(e.end) : nowYear }))
    .sort((a, b) => a.from - b.from);

  // The axis ends at the last date rather than the next whole year, so no dead
  // space trails the final bar; ticks are still whole years.
  const min = Math.floor(Math.min(...rows.map((r) => r.from)));
  const max = Math.max(...rows.map((r) => r.to));
  const span = max - min;
  const pct = (year: number) => ((year - min) / span) * 100;

  const ticks = Array.from(
    { length: Math.floor(max) - min + 1 },
    (_, i) => min + i,
  );

  return (
    <div className="max-w-3xl">
      {/* axis */}
      <div className="relative mb-3 hidden h-4 sm:ml-48 sm:block">
        {ticks.map((year) => (
          <span
            key={year}
            className="absolute top-0 -translate-x-1/2 font-mono text-[10px] text-faint"
            style={{ left: `${pct(year)}%` }}
          >
            {year}
          </span>
        ))}
        <span
          className="label absolute top-0 -translate-x-1/2 text-accent"
          style={{ left: `${pct(nowYear)}%` }}
        >
          Now
        </span>
      </div>

      <ol className="space-y-5">
        {rows.map((row) => {
          return (
            <li
              key={`${row.school}-${row.start}`}
              className="group grid gap-y-1 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-x-4"
            >
              <div className="sm:text-right">
                <h3 className="text-sm font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                  {row.school}
                </h3>
                <p className="text-xs leading-snug text-muted">{row.degree}</p>
              </div>

              {/* track */}
              <div className="relative h-7">
                {/* today */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-px bg-accent/40"
                  style={{ left: `${pct(nowYear)}%` }}
                />

                {/* year gridlines */}
                {ticks.map((year) => (
                  <span
                    key={year}
                    aria-hidden
                    className="absolute inset-y-0 w-px bg-hairline"
                    style={{ left: `${pct(year)}%` }}
                  />
                ))}

                {/* elapsed stretch */}
                <span
                  className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[1px] transition-colors ${
                    row.kind === "work"
                      ? "bg-accent/70 group-hover:bg-accent"
                      : "border border-foreground/30 bg-foreground/5 group-hover:border-accent"
                  }`}
                  style={{
                    left: `${pct(row.from)}%`,
                    width: `${Math.max(pct(Math.min(row.to, nowYear)) - pct(row.from), 1.2)}%`,
                  }}
                  title={row.period}
                />

                {/* still to come — drawn as a dashed projection */}
                {row.to > nowYear && (
                  <span
                    aria-hidden
                    className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[1px] border border-dashed border-foreground/25"
                    style={{
                      left: `${pct(nowYear)}%`,
                      width: `${pct(row.to) - pct(nowYear)}%`,
                    }}
                  />
                )}

                <span className="absolute left-0 top-full mt-0.5 font-mono text-[10px] text-faint sm:hidden">
                  {row.period}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {/* legend */}
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 sm:ml-48">
        <span className="flex items-center gap-2 font-mono text-[10px] text-faint">
          <span className="h-2.5 w-5 rounded-[1px] border border-foreground/30 bg-foreground/5" />
          Education
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] text-faint">
          <span className="h-2.5 w-5 rounded-[1px] bg-accent/70" />
          Work &amp; Research
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] text-faint">
          <span className="h-2.5 w-5 rounded-[1px] border border-dashed border-foreground/25" />
          Projected
        </span>
      </div>
    </div>
  );
}
