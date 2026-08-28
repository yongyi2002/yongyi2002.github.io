import { profile } from "@/lib/profile";

const ICONS: Record<string, React.ReactNode> = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6.5 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
  ),
};

const iconClass =
  "grid size-8 place-items-center rounded-full border border-line text-faint transition-colors hover:border-accent hover:text-accent";

/** Email plus whichever profile links have a URL filled in. */
export function SocialLinks() {
  const links = profile.links.filter((l) => l.href);

  return (
    <div className="flex items-center gap-2">
      <a href={`mailto:${profile.email}`} aria-label="Email" title={profile.email} className={iconClass}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="m3 6.5 9 6.5 9-6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          title={link.label}
          className={iconClass}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            {ICONS[link.icon]}
          </svg>
        </a>
      ))}
    </div>
  );
}
