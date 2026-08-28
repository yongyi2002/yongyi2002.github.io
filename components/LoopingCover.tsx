"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; className?: string };

/**
 * A silent looping clip used as a project cover. Playback is driven by an
 * IntersectionObserver rather than the `autoplay` attribute: autoplay is
 * unreliable when combined with a light `preload`, and this also keeps
 * offscreen clips from burning CPU.
 */
export function LoopingCover({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // leave the poster frame in place

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Autoplay refused — the poster frame stays, which is a fine fallback.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      className={className}
    />
  );
}
