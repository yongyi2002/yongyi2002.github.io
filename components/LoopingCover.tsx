"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; label: string; className?: string };

/**
 * A silent looping clip used as a project cover.
 *
 * `autoPlay` + `muted` + `playsInline` is the combination mobile browsers
 * recognise as inline muted autoplay — driving playback from script alone is
 * refused on iOS (outright in Low Power Mode). The observer is kept on top of
 * that, purely to pause clips that have scrolled out of view.
 */
export function LoopingCover({ src, poster, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Safari honours the property rather than the attribute in some versions.
    video.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return; // leave the poster frame in place
    }

    const play = () => {
      void video.play().catch(() => {
        // Refused (Low Power Mode, data saver): the poster stays, which is fine.
      });
    };

    play();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : video.pause()),
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      className={className}
    />
  );
}
