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

/**
 * Background-style image that fills its positioned parent. With a crop, from `lg` up the photo is
 * placed exactly as in the 1600px design (as percentages, so it scales with the box) and fills
 * that area with object-cover, so it never distorts and never leaves gaps.
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
      style={crop ? cropStyle(crop) : undefined}
      className={cn(
        'absolute inset-0',
        crop &&
          'lg:inset-auto lg:top-(--crop-top) lg:left-(--crop-left) lg:h-(--crop-height) lg:w-(--crop-width)',
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', crop && 'lg:object-(--crop-position)', className)}
      />
    </div>
  );
}
