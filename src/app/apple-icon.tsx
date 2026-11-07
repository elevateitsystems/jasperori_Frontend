import { ImageResponse } from 'next/og';

import { LogoMark } from '@/lib/og-mark';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** iOS home-screen icon (180x180 PNG): the logo mark, full bleed (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#17233F' }}>
      <LogoMark size={180} square="#17233F" />
    </div>,
    size,
  );
}
