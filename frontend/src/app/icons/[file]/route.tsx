import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const SIZES: Record<string, number> = {
  'icon-192.png': 192,
  'icon-512.png': 512,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const size = SIZES[file];

  if (!size) {
    return new Response('Not found', { status: 404 });
  }

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
          borderRadius: size * 0.22,
        }}
      >
        <div
          style={{
            fontSize: size * 0.45,
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
    { width: size, height: size }
  );
}
