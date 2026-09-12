"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  /** The pixel this speck was sampled from, and the point it returns to. */
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
  /** Which value step this speck is drawn at. */
  tone: number;
  /** Radius at rest; the drawn radius breathes around it. */
  radius: number;
  /** Radius actually drawn this frame. */
  r: number;
  /** Own rate for the idle wander, so the field never pulses as one. */
  speed: number;
  /** Offsets the idle drift, so no two specks breathe in unison. */
  phase: number;
  /** Per-speck spring rate — the letters regather raggedly, not as a block. */
  ease: number;
};

/** Sampling grid, in CSS pixels. Smaller is denser and costs more per frame. */
const STEP = 2;

/**
 * Half-width of a speck sitting on a fully covered pixel. Deliberately under
 * half the grid step: the gaps between specks never close, which is what keeps
 * a dense field granular instead of letting it silt up into solid type.
 */
const DOT = 0.95;

/**
 * The specks are drawn at three strengths of the same ink rather than all at
 * full. Scattering the values is what does most of the work: a field at one
 * value reads as a texture, and a field with a spread of them reads as grain.
 * Kept to steps rather than a value per speck so the whole field is still three
 * batched fills a frame.
 */
const TONES = [1, 0.62, 0.34];

/** Share of specks landing in each of the steps above. */
const TONE_SPLIT = [0.5, 0.31, 0.19];

/**
 * Range of the per-speck size jitter. The variation in weight is what stops the
 * grid from announcing itself as a grid. The floor is kept high enough that no
 * speck shrinks to nothing — that was thinning the strokes — and the ceiling at
 * 1 keeps a full-size speck just inside the grid step, so the gaps never close.
 */
const JITTER_MIN = 0.6;
const JITTER_RANGE = 0.4;

/**
 * How little coverage still earns a speck. Low, on purpose: the part-covered
 * pixels along the edge of a glyph become the small specks that give the
 * letterforms a smooth outline instead of a stepped one.
 */
const MIN_COVERAGE = 40;

/**
 * Three slow motions the field carries at rest, all in CSS pixels. They are
 * layered rather than summed into one because a single oscillation, however
 * gentle, reads as a mechanism: DRIFT is each speck wandering at its own rate,
 * SWELL is a long wave crossing the words so neighbours move together, and
 * PULSE breathes the specks' size without moving them at all. Together they
 * total less than one speck's radius, so the letterforms stay crisp.
 */
const DRIFT = 0.55;
const SWELL = 0.4;
const PULSE = 0.16;

/** How far the pointer's push carries, and how hard it pushes at the centre. */
const REACH = 94;
const PUSH = 0.85;

/** A slack spring under heavy damping: the shape drifts home, it never snaps. */
const SPRING = 0.011;
const DAMP = 0.9;

/**
 * Slack around the heading's line boxes, in CSS pixels. Two things need the
 * room: tight leading puts descenders below the last line box, and specks
 * pushed by the pointer travel outside the text entirely. Without it both get
 * clipped at the canvas edge.
 */
const PAD = 40;

/**
 * The heading, rendered as a field of dust rather than as type. The real <h1>
 * stays in the document — search engines and screen readers still meet plain
 * text, and if the canvas never starts, the plain text is simply what you see.
 *
 * The particles are sampled from the heading's own computed typography, so the
 * dust carries the actual face, weight and tracking rather than a lookalike.
 */
export function ParticleTitle({ lines }: { lines: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const key = lines.join("\n");

  useEffect(() => {
    const wrap = wrapRef.current;
    const source = sourceRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !source || !canvas) return;

    // Anyone who has asked for less motion keeps the ordinary heading.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let cancelled = false;
    const pointer = { x: -9999, y: -9999 };

    let palette = readPalette();

    function readPalette() {
      const style = getComputedStyle(document.documentElement);
      return {
        text: style.getPropertyValue("--foreground").trim() || "#111113",
        accent: style.getPropertyValue("--accent").trim() || "#16a34a",
      };
    }

    /**
     * Draws the heading once into a scratch canvas and reads back which pixels
     * it covered. The trailing full stop is painted in a marker colour first,
     * which is how the sampler knows those specks carry the accent.
     */
    function build() {
      if (!source || !canvas || !ctx) return;
      const box = source.getBoundingClientRect();
      width = Math.ceil(box.width);
      height = Math.ceil(box.height);
      if (width < 2 || height < 2) return;

      // The canvas is larger than the heading and hangs off it on every side.
      const full = { w: width + PAD * 2, h: height + PAD * 2 };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(full.w * dpr);
      canvas.height = Math.round(full.h * dpr);
      canvas.style.width = `${full.w}px`;
      canvas.style.height = `${full.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const style = getComputedStyle(source);
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 0.9;

      const scratch = document.createElement("canvas");
      scratch.width = full.w;
      scratch.height = full.h;
      const sctx = scratch.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;

      sctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      sctx.textBaseline = "alphabetic";
      // Not every engine exposes letterSpacing on the 2D context yet.
      if ("letterSpacing" in sctx) {
        (sctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
      }

      // Place the baselines the way CSS does: each line box is `lineHeight`
      // tall, the font's own ascent and descent are centred in it, and the
      // baseline falls one ascent below the top of that box. Reading the
      // metrics from the font rather than from the drawn glyphs is what keeps
      // the dust sitting exactly where the real heading sits, whatever the
      // line happens to spell.
      const metrics = sctx.measureText(lines[0] ?? "X");
      const ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent || fontSize * 0.21;
      const halfLeading = (lineHeight - (ascent + descent)) / 2;

      for (let i = 0; i < lines.length; i++) {
        const baseline = PAD + halfLeading + ascent + i * lineHeight;
        const line = lines[i];
        const stem = line.endsWith(".") ? line.slice(0, -1) : line;
        sctx.fillStyle = "#ffffff";
        sctx.fillText(stem, PAD, baseline);
        if (stem !== line) {
          sctx.fillStyle = "#ff0000";
          sctx.fillText(".", PAD + sctx.measureText(stem).width, baseline);
        }
      }

      const data = sctx.getImageData(0, 0, full.w, full.h).data;
      const next: Particle[] = [];
      for (let y = 0; y < full.h; y += STEP) {
        for (let x = 0; x < full.w; x += STEP) {
          const i = (y * full.w + x) * 4;
          const coverage = data[i + 3];
          if (coverage < MIN_COVERAGE) continue;
          // White pixels keep the green channel; the marked full stop does not.
          const accent = data[i + 1] < 128;
          const size =
            DOT *
            Math.sqrt(coverage / 255) *
            (JITTER_MIN + Math.random() * JITTER_RANGE);
          const carried = next.length < particles.length ? particles[next.length] : null;
          next.push({
            hx: x,
            hy: y,
            // First run: the heading condenses out of a cloud. On a later
            // rebuild the specks keep where they were, so a resize is not a
            // reason to replay the entrance.
            x: carried ? carried.x : Math.random() * full.w,
            y: carried ? carried.y : Math.random() * full.h,
            vx: 0,
            vy: 0,
            accent,
            tone: pickTone(),
            // Area tracks coverage, so an edge speck is small and a speck
            // inside a stem is full size; the jitter then varies the weight.
            radius: size,
            r: size,
            speed: 0.72 + Math.random() * 0.56,
            phase: Math.random() * Math.PI * 2,
            ease: 0.7 + Math.random() * 0.6,
          });
        }
      }
      particles = next;
    }

    /** Weighted pick over TONE_SPLIT. */
    function pickTone() {
      const roll = Math.random();
      let carried = 0;
      for (let i = 0; i < TONE_SPLIT.length; i++) {
        carried += TONE_SPLIT[i];
        if (roll < carried) return i;
      }
      return TONE_SPLIT.length - 1;
    }

    function step(particle: Particle, seconds: number) {
      // Each speck wanders at its own rate, on a figure the two axes trace at
      // slightly different speeds so it never closes into a circle.
      const breath = seconds * 0.42 * particle.speed + particle.phase;
      // A long wave travelling left to right through the words. Because it is
      // keyed to position rather than to the speck, neighbours rise and fall
      // together and the whole field reads as one breathing thing.
      const swell = Math.sin(seconds * 0.33 - particle.hx * 0.018) * SWELL;

      const tx = particle.hx + Math.sin(breath) * DRIFT;
      const ty = particle.hy + Math.cos(breath * 0.83) * DRIFT + swell;

      // Size breathes too. This one moves nothing, so it adds life without
      // costing any sharpness.
      particle.r = particle.radius * (1 + PULSE * Math.sin(breath * 0.61));

      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance2 = dx * dx + dy * dy;
      if (distance2 < REACH * REACH) {
        const distance = Math.sqrt(distance2) || 1;
        // Squared falloff, so the edge of the pointer's reach is soft and the
        // dust thins out instead of stopping at a rim.
        const falloff = 1 - distance / REACH;
        const force = falloff * falloff * PUSH;
        const nx = dx / distance;
        const ny = dy / distance;
        particle.vx += nx * force;
        particle.vy += ny * force;
        // A little sideways drift turns the push into a swirl.
        particle.vx += -ny * force * 0.35;
        particle.vy += nx * force * 0.35;
      }

      particle.vx += (tx - particle.x) * SPRING * particle.ease;
      particle.vy += (ty - particle.y) * SPRING * particle.ease;
      particle.vx *= DAMP;
      particle.vy *= DAMP;
      particle.x += particle.vx;
      particle.y += particle.vy;
    }

    function draw() {
      if (!ctx) return;
      const seconds = performance.now() / 1000;
      ctx.clearRect(0, 0, width + PAD * 2, height + PAD * 2);

      for (const particle of particles) step(particle, seconds);

      // One path per value step: a few thousand separate fills per frame is the
      // difference between this being free and being felt. Square specks — at
      // this size a circle costs more to rasterise and reads no rounder.
      ctx.fillStyle = palette.text;
      for (let tone = 0; tone < TONES.length; tone++) {
        ctx.globalAlpha = TONES[tone];
        ctx.beginPath();
        for (const p of particles) {
          if (p.accent || p.tone !== tone) continue;
          ctx.rect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        }
        ctx.fill();
      }

      // The full stop keeps the accent it has in the plain heading.
      ctx.globalAlpha = 1;
      ctx.fillStyle = palette.accent;
      ctx.beginPath();
      for (const p of particles) {
        if (!p.accent) continue;
        ctx.rect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      ctx.fill();

      frame = requestAnimationFrame(draw);
    }

    function onPointerMove(event: PointerEvent) {
      const box = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    // Sampling before the webfont lands would trace the fallback face.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      if (!particles.length) return;
      setLive(true);
      frame = requestAnimationFrame(draw);
    });

    const resizeObserver = new ResizeObserver(() => build());
    resizeObserver.observe(source);

    // The specks are painted in the theme's own colours, so they have to be
    // re-read when the theme changes under them.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [key, lines]);

  return (
    <div ref={wrapRef} className="relative">
      <h1
        ref={sourceRef}
        className={`text-5xl font-bold leading-[0.9] tracking-tighter transition-opacity duration-[1200ms] ease-out lg:text-6xl ${
          live ? "opacity-0" : "opacity-100"
        }`}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line.endsWith(".") ? (
              <>
                {line.slice(0, -1)}
                <span className="text-accent">.</span>
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: -PAD, top: -PAD }}
      />
    </div>
  );
}
