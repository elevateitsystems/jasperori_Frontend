import Image from 'next/image';

import { cn } from '@/lib/cn';
import { cropStyle, type ImageCrop } from '@/lib/image-crops';
import type { ImageAsset } from '@/types/content';

interface CroppedImageProps {
  image: ImageAsset;
  /** `sizes` for the responsive image. */
  sizes: string;
  /** Figma custom crop, applied from `lg` up. Without it the image covers its box (centred). */
  crop?: ImageCrop;
  priority?: boolean;
  /** Extra classes for the <img>, e.g. an object position for small screens. */
  className?: string;
}

/** Above 1600px: design pixel size, anchored left or right (identical to the % crop at 1600px). */
const wideClasses = {
  left: '3xl:top-(--crop-top-px) 3xl:left-(--crop-left-px) 3xl:h-(--crop-height-px) 3xl:w-[max(var(--crop-width-px),100%)]',
  right:
    '3xl:top-(--crop-top-px) 3xl:right-(--crop-right-px) 3xl:left-auto 3xl:h-(--crop-height-px) 3xl:w-(--crop-width-px)',
} as const;

/**
 * Background-style image that fills its positioned parent. With a crop, from `lg` up the photo is
 * placed exactly as in the 1600px design (as percentages, so it scales with the box) and fills
 * that area with object-cover, so it never distorts and never leaves gaps.
 * Below `lg`, the image's own focal point (content: image.focalPoint) sets the object position.
 */
export function CroppedImage({
  image,
  sizes,
  crop,
  priority = false,
  className,
}: CroppedImageProps) {
  return (
    <div
      style={{
        ...(crop ? cropStyle(crop) : {}),
        ...(image.focalPoint ? { '--focal-point': image.focalPoint } : {}),
      }}
      className={cn(
        'absolute inset-0',
        crop &&
          'lg:inset-auto lg:top-(--crop-top) lg:left-(--crop-left) lg:h-(--crop-height) lg:w-(--crop-width)',
        crop?.wide && wideClasses[crop.wide],
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'object-cover',
          image.focalPoint && 'max-lg:object-(--focal-point)',
          crop && 'lg:object-(--crop-position)',
          className,
        )}
      />
    </div>
  );
}
