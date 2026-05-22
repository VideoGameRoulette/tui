// Generates all icon assets from public/logo.png using Sharp.
// PNG-in-ICO format for favicon.ico (supported by all modern browsers).
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'public', 'logo.png');

async function resize(size) {
  return sharp(src).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

function buildIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * numImages;

  const offsets = [];
  let currentOffset = dataOffset;
  for (const buf of pngBuffers) {
    offsets.push(currentOffset);
    currentOffset += buf.length;
  }

  const totalSize = currentOffset;
  const ico = Buffer.alloc(totalSize);

  // ICONDIR header
  ico.writeUInt16LE(0, 0);       // reserved
  ico.writeUInt16LE(1, 2);       // type: 1 = ICO
  ico.writeUInt16LE(numImages, 4);

  // ICONDIRENTRY for each image
  for (let i = 0; i < numImages; i++) {
    const base = headerSize + i * entrySize;
    const size = sizes[i];
    ico.writeUInt8(size >= 256 ? 0 : size, base);      // width (0 = 256)
    ico.writeUInt8(size >= 256 ? 0 : size, base + 1);  // height
    ico.writeUInt8(0, base + 2);                        // color count
    ico.writeUInt8(0, base + 3);                        // reserved
    ico.writeUInt16LE(1, base + 4);                     // color planes
    ico.writeUInt16LE(32, base + 6);                    // bits per pixel
    ico.writeUInt32LE(pngBuffers[i].length, base + 8);  // image size
    ico.writeUInt32LE(offsets[i], base + 12);           // image offset
  }

  // Write PNG data
  for (let i = 0; i < numImages; i++) {
    pngBuffers[i].copy(ico, offsets[i]);
  }

  return ico;
}

async function main() {
  console.log('Generating icons from', src);

  // Sizes for ICO (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(icoSizes.map(resize));
  const icoBuffer = buildIco(icoPngs, icoSizes);
  const faviconPath = join(root, 'src', 'app', 'favicon.ico');
  writeFileSync(faviconPath, icoBuffer);
  console.log(`✓ favicon.ico (${icoSizes.join(', ')}px)`);

  // icon.png for Next.js App Router (32x32 → used for <link rel="icon">)
  const icon32 = await resize(32);
  writeFileSync(join(root, 'src', 'app', 'icon.png'), icon32);
  console.log('✓ icon.png (32x32)');

  // apple-icon.png (180x180)
  const apple180 = await resize(180);
  writeFileSync(join(root, 'src', 'app', 'apple-icon.png'), apple180);
  console.log('✓ apple-icon.png (180x180)');

  // PWA manifest icons
  mkdirSync(join(root, 'public', 'icons'), { recursive: true });

  const icon192 = await resize(192);
  writeFileSync(join(root, 'public', 'icons', 'icon-192.png'), icon192);
  console.log('✓ public/icons/icon-192.png');

  const icon512 = await resize(512);
  writeFileSync(join(root, 'public', 'icons', 'icon-512.png'), icon512);
  console.log('✓ public/icons/icon-512.png');

  // Extra: OG / splash image (1200x630 — letterboxed with transparent padding)
  const og = await sharp(src)
    .resize(630, 630, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 0, bottom: 0, left: 285, right: 285, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  writeFileSync(join(root, 'public', 'icons', 'og-image.png'), og);
  console.log('✓ public/icons/og-image.png (1200x630)');

  console.log('\nAll icons generated successfully.');
}

main().catch(err => { console.error(err); process.exit(1); });
