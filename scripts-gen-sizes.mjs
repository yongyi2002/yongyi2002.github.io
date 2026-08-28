// Regenerates lib/image-sizes.ts from the files in public/media.
// Run with: node scripts-gen-sizes.mjs
import { readdirSync, statSync, writeFileSync, openSync, readSync, closeSync } from "node:fs";
import { join } from "node:path";

/** Minimal JPEG SOF parser — reads intrinsic dimensions without a dependency. */
function jpegSize(file) {
  const fd = openSync(file, "r");
  const buf = Buffer.alloc(statSync(file).size);
  readSync(fd, buf, 0, buf.length, 0);
  closeSync(fd);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error(`No SOF marker in ${file}`);
}

const root = "public/media";
const out = {};
for (const dir of readdirSync(root).sort()) {
  for (const file of readdirSync(join(root, dir)).sort()) {
    if (!file.endsWith(".jpg")) continue;
    out[`/media/${dir}/${file}`] = jpegSize(join(root, dir, file));
  }
}

writeFileSync(
  "lib/image-sizes.ts",
  `// GENERATED FILE — do not edit by hand.\n` +
    `// Run \`node scripts-gen-sizes.mjs\` after adding or replacing images in public/media.\n\n` +
    `export const imageSizes: Record<string, { width: number; height: number }> = ${JSON.stringify(out, null, 2)};\n\n` +
    `export function sizeOf(src: string) {\n` +
    `  const size = imageSizes[src];\n` +
    `  if (!size) throw new Error(\`Unknown image: \${src} — run \\\`node scripts-gen-sizes.mjs\\\`\`);\n` +
    `  return size;\n` +
    `}\n`,
);
console.log(`Wrote lib/image-sizes.ts (${Object.keys(out).length} images)`);
