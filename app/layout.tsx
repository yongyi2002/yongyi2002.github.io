import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_NAME = profile.name;

export const metadata: Metadata = {
  metadataBase: new URL("https://yongyixiong.com"),
  title: {
    default: `${SITE_NAME} — Computational Design & Machine Learning`,
    template: `%s — ${SITE_NAME}`,
  },
  description: profile.statement.join(" "),
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong background. Light is the default; the system preference is only used
 * when the visitor has not chosen for themselves.
 */
const THEME_BOOT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
