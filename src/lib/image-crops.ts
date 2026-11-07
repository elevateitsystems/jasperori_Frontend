import type { CSSProperties } from 'react';

/**
 * Figma custom image crops ("stretch" in the spec), in the 1600px design.
 * See design/design-tokens.md and design/IMAGE-MAP.md.
 */
export interface ImageCrop {
  /** Size of the image box in the design. */
  box: { width: number; height: number };
  /** Position and size of the photo inside the box in the design (px; may overflow the box). */
  photo: { left: number; top: number; width: number; height: number };
  /** object-position used when the box has another aspect ratio than in the design. */
  position: string;
  /**
   * Above 1600px (no design): keep the photo at its design pixel size, anchored to this side of
   * the box, instead of scaling it with the width (which would zoom far into the photo).
   */
  wide?: 'left' | 'right';
}

export const imageCrops = {
  /** Home hero, box 1600x1015. Overflows 53px on the right. */
  homeHero: {
    box: { width: 1600, height: 1015 },
    photo: { left: 427, top: -28, width: 1226, height: 1532 },
    position: 'top',
    wide: 'right',
  },
  /**
   * About split image, box 798x520. Figma stretches the photo non-uniformly here
   * (1061x641 is wider than the photo's 1600x1068 ratio); we keep the exact crop box and fill
   * it without distortion (object-cover).
   */
  aboutSplit: {
    box: { width: 798, height: 520 },
    photo: { left: 0, top: -60, width: 1061, height: 641 },
    position: 'center',
  },
  /** Services hero, box 1600x1015: fills the height, left-aligned, overflow cut on the right. */
  servicesHero: {
    box: { width: 1600, height: 1015 },
    photo: { left: 0, top: 0, width: 2707, height: 1015 },
    position: 'left',
    wide: 'left',
  },
} as const satisfies Record<string, ImageCrop>;

const percent = (value: number, of: number) => `${(value / of) * 100}%`;

/** CSS variables for CroppedImage: the crop as percentages of the box, so it scales with it. */
export function cropStyle(crop: ImageCrop): CSSProperties & Record<`--${string}`, string> {
  return {
    '--crop-left': percent(crop.photo.left, crop.box.width),
    '--crop-top': percent(crop.photo.top, crop.box.height),
    '--crop-width': percent(crop.photo.width, crop.box.width),
    '--crop-height': percent(crop.photo.height, crop.box.height),
    '--crop-position': crop.position,
    '--crop-left-px': `${crop.photo.left}px`,
    '--crop-right-px': `${crop.box.width - crop.photo.left - crop.photo.width}px`,
    '--crop-top-px': `${crop.photo.top}px`,
    '--crop-width-px': `${crop.photo.width}px`,
    '--crop-height-px': `${crop.photo.height}px`,
  };
}
