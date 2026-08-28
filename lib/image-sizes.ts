// GENERATED FILE — do not edit by hand.
// Run `node scripts-gen-sizes.mjs` after adding or replacing images in public/media.

export const imageSizes: Record<string, { width: number; height: number }> = {
  "/media/computed-cake/01.jpg": {
    "height": 1648,
    "width": 1239
  },
  "/media/computed-cake/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/computed-cake/03.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/computed-cake/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/dynamic-facade/01.jpg": {
    "height": 1650,
    "width": 1238
  },
  "/media/dynamic-facade/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/dynamic-facade/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/dynamic-facade/video-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/janusmm/01.jpg": {
    "height": 1238,
    "width": 2200
  },
  "/media/janusmm/02.jpg": {
    "height": 1238,
    "width": 2200
  },
  "/media/janusmm/hero.jpg": {
    "height": 1350,
    "width": 2400
  },
  "/media/monument-to-loneliness/01.jpg": {
    "height": 1651,
    "width": 1238
  },
  "/media/monument-to-loneliness/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/monument-to-loneliness/03.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/monument-to-loneliness/04.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/monument-to-loneliness/cover-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/monument-to-loneliness/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/monument-to-loneliness/video-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/placing-nature/01.jpg": {
    "height": 1142,
    "width": 1239
  },
  "/media/placing-nature/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/placing-nature/03.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/placing-nature/04.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/placing-nature/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/placing-nature/video-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/robotic-bamboo-weaving/01.jpg": {
    "height": 1651,
    "width": 1239
  },
  "/media/robotic-bamboo-weaving/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/robotic-bamboo-weaving/03.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/robotic-bamboo-weaving/cover-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/robotic-bamboo-weaving/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/robotic-bamboo-weaving/video-poster.jpg": {
    "height": 720,
    "width": 1280
  },
  "/media/segmented-image/01.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/segmented-image/02.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/segmented-image/03.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/segmented-image/04.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/segmented-image/hero.jpg": {
    "height": 1333,
    "width": 2000
  },
  "/media/shape-grammar/01.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/shape-grammar/hero.jpg": {
    "height": 1350,
    "width": 2400
  },
  "/media/spatial-cue-fine-tuning/01.jpg": {
    "height": 468,
    "width": 1360
  },
  "/media/spatial-cue-fine-tuning/02.jpg": {
    "height": 1292,
    "width": 2000
  },
  "/media/spatial-cue-fine-tuning/03.jpg": {
    "height": 1398,
    "width": 2000
  },
  "/media/spatial-cue-fine-tuning/04.jpg": {
    "height": 1365,
    "width": 2000
  },
  "/media/spatial-cue-fine-tuning/hero.jpg": {
    "height": 936,
    "width": 1400
  },
  "/media/xiongan-wings/01.jpg": {
    "height": 1467,
    "width": 2200
  },
  "/media/xiongan-wings/hero.jpg": {
    "height": 830,
    "width": 1245
  }
};

export function sizeOf(src: string) {
  const size = imageSizes[src];
  if (!size) throw new Error(`Unknown image: ${src} — run \`node scripts-gen-sizes.mjs\``);
  return size;
}
