const CORNERS = ["tl", "tr", "bl", "br"] as const;

/**
 * Image frame for the project index. Nothing is drawn at rest — the picture
 * stands on its own; on hover four marks close in on it and hold, the way a
 * viewfinder locks focus. Expects a `group` ancestor.
 *
 * The marks stop short of the picture instead of touching it. Several covers
 * are documentation boards laid out on a white ground, and anything drawn hard
 * against those reads as a gap between frame and picture rather than as a
 * frame — the white inside the picture and the white behind it run together.
 *
 * The wrapper exists because the marks sit outside the picture while the crop
 * that holds the picture to its box would clip anything outside it. One element
 * crops, the other carries the marks.
 *
 * On the dark theme the cropped plate also rests a little below full
 * brightness — see `.cover-plate` in globals.css for why.
 */
export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="cover-frame relative">
      <div className="cover-plate relative overflow-hidden bg-subtle">{children}</div>
      {CORNERS.map((corner) => (
        <span key={corner} aria-hidden className={`cover-mark cover-mark--${corner}`} />
      ))}
    </div>
  );
}
