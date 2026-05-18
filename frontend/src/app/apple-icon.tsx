import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.03em',
          }}
        >
          CS
        </div>
      </div>
    ),
    { ...size }
  );
}
