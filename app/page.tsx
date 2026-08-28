import Link from "next/link";
import { Timeline } from "@/components/Timeline";
import { SectionNav, type Section } from "@/components/SectionNav";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Publications } from "@/components/Publications";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/lib/profile";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";

const NOW = new Date().toISOString().slice(0, 7);

const SECTIONS: Section[] = [
  { id: "publications", label: "Publications", count: publications.length },
  { id: "work", label: "Selected Work", count: projects.length },
  { id: "stack", label: "System Configuration", count: profile.stack.length },
  { id: "experience", label: "Experience Log", count: profile.education.length },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Fixed panel — identity, introduction, contact */}
      <aside className="z-20 flex w-full flex-col border-b border-line bg-background p-8 md:sticky md:top-0 md:h-screen md:w-5/12 md:border-b-0 md:border-r md:p-12 lg:w-4/12 lg:p-16">
        {/* identity and bio scroll if the viewport is short; the index below stays put */}
        <div className="md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-2">
          <div className="mb-10 flex justify-end">
            <ThemeToggle />
          </div>

          <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter lg:text-6xl">
            Yongyi
            <br />
            Xiong<span className="text-accent">.</span>
          </h1>

          <div className="mt-8 border-l border-line pl-4 text-sm leading-relaxed">
            {profile.role.map((line) => (
              <span key={line} className="block text-muted">
                {line}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 shrink-0 space-y-8 md:mt-8">
          <SectionNav sections={SECTIONS} />
          <SocialLinks />
        </div>
      </aside>

      {/* Scrolling feed */}
      <main className="w-full md:w-7/12 lg:w-8/12">
        <Publications />

        <section id="work" className="scroll-mt-4">
          <span className="label block px-8 pt-16 text-accent md:px-16">
            Selected Work
          </span>
          <ProjectIndex projects={projects} />
        </section>

        {profile.stack.length > 0 && (
          <section id="stack" className="scroll-mt-4 border-b border-line px-8 py-20 md:px-16 md:py-24">
            <span className="label mb-10 block text-accent">System Configuration</span>
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
              {profile.stack.map((group) => (
                <div key={group.group}>
                  <h3 className="mb-4 border-b border-line pb-2 text-sm font-medium">
                    {group.group}
                  </h3>
                  <ul>
                    {group.items.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-center justify-between border-b border-hairline py-2.5 font-mono text-xs text-muted transition-all hover:pl-2 hover:text-accent"
                      >
                        <span>{item}</span>
                        <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.education.length > 0 && (
          <section id="experience" className="scroll-mt-4 px-8 py-20 md:px-16 md:py-24">
            <span className="label mb-10 block text-accent">Experience Log</span>
            <Timeline entries={profile.education} now={NOW} />
          </section>
        )}

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-8 py-10 md:px-16">
          <p className="label text-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <Link href="/about" className="label text-faint transition-colors hover:text-accent">
            About
          </Link>
        </footer>
      </main>
    </div>
  );
}
