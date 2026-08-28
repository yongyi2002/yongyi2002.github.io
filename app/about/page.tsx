import type { Metadata } from "next";
import { profile } from "@/lib/profile";
import { PageNav } from "@/components/PageNav";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — background, publications and contact.`,
};

export default function AboutPage() {
  const contact = [
    profile.email && { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    ...profile.links.map((l) => ({ label: l.label, value: l.href.replace(/^https?:\/\//, ""), href: l.href })),
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <>
      <PageNav marker="About" />
      <div className="mx-auto max-w-5xl px-6">
      <section className="max-w-2xl py-16 sm:py-24">
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
          {profile.name}
        </h1>
        {profile.bio.map((paragraph, i) => (
          <p
            key={i}
            className="mt-4 text-[15px] leading-relaxed text-foreground/90 sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </section>

      {profile.education.length > 0 && (
        <section className="border-t border-line py-12">
          <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
            Education
          </h2>
          <ul className="mt-6 space-y-5">
            {profile.education.map((e) => (
              <li
                key={`${e.school}-${e.degree}`}
                className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
              >
                <div>
                  <p className="font-medium">{e.school}</p>
                  <p className="text-sm text-muted">{e.degree}</p>
                </div>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {contact.length > 0 && (
        <section className="border-t border-line py-12">
          <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
            Contact
          </h2>
          <dl className="mt-6 space-y-4 text-sm">
            {contact.map((c) => (
              <div key={c.label} className="flex gap-6">
                <dt className="w-20 shrink-0 font-mono text-xs text-muted">
                  {c.label}
                </dt>
                <dd>
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="underline underline-offset-4 transition-colors hover:text-muted"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="py-8" />
    </div>
    </>
  );
}
