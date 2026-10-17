// Composites the member's photo and name onto the original flyer artwork.
// All coordinates are in the template's native 2000×2000 pixel space and were
// measured from public/image/flyer-template.jpg.

export const FLYER_TEMPLATE_SRC = "/image/flyer-template.jpg";
export const FLYER_SIZE = 2000;

// White photo placeholder (rounded on all four corners).
const PHOTO_AREA = { x: 151, y: 410, width: 850, height: 923, radius: 20 };

// Navy name band and the "AMARACHI" text sitting on it.
const NAME_BAND_COLOR = "rgb(3, 25, 83)";
const NAME_COVER = { x: 200, y: 1362, width: 785, height: 68 };
const NAME_TEXT = { x: 218, baseline: 1412, capHeight: 33, maxWidth: 740 };
const NAME_COLOR = "rgb(241, 195, 12)";
const NAME_FONT_FAMILY = '"Akira Expanded"';

// Vertical crop bias for the photo: 0 = keep top, 0.5 = centre. Faces usually
// sit in the upper part of a portrait, so lean towards the top.
const PHOTO_FOCUS_Y = 0.3;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${src}`));
    img.src = src;
  });
}

async function ensureNameFont() {
  try {
    await document.fonts.load(`${NAME_TEXT.capHeight * 2}px ${NAME_FONT_FAMILY}`, "AMARACHI");
  } catch {
    // Fall back to whatever the browser resolves; generation should still work.
  }
}

function drawPhoto(ctx: CanvasRenderingContext2D, photo: HTMLImageElement) {
  const { x, y, width, height, radius } = PHOTO_AREA;
  const iw = photo.naturalWidth;
  const ih = photo.naturalHeight;

  // object-fit: cover
  const scale = Math.max(width / iw, height / ih);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) * PHOTO_FOCUS_Y;

  ctx.save();
  ctx.beginPath();
  // Grow by 1px so no anti-aliased white fringe from the placeholder survives.
  ctx.roundRect(x - 1, y - 1, width + 2, height + 2, radius);
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(photo, sx, sy, sw, sh, x - 1, y - 1, width + 2, height + 2);
  ctx.restore();
}

function drawName(ctx: CanvasRenderingContext2D, name: string) {
  const text = name.trim().toUpperCase();

  // Paint over the sample name with the band's flat navy.
  ctx.fillStyle = NAME_BAND_COLOR;
  ctx.fillRect(NAME_COVER.x, NAME_COVER.y, NAME_COVER.width, NAME_COVER.height);

  // Size the font so its cap height matches the original name, then shrink
  // if a long name would run past the band.
  const probe = 100;
  ctx.font = `${probe}px ${NAME_FONT_FAMILY}`;
  const capAscent = ctx.measureText("H").actualBoundingBoxAscent || probe * 0.72;
  let size = (probe * NAME_TEXT.capHeight) / capAscent;

  ctx.font = `${size}px ${NAME_FONT_FAMILY}`;
  const width = ctx.measureText(text).width;
  if (width > NAME_TEXT.maxWidth) {
    size *= NAME_TEXT.maxWidth / width;
    ctx.font = `${size}px ${NAME_FONT_FAMILY}`;
  }

  // Keep shrunken names optically centred on the original line.
  const capHeight = (size * capAscent) / probe;
  const baseline = NAME_TEXT.baseline - (NAME_TEXT.capHeight - capHeight) / 2;

  ctx.fillStyle = NAME_COLOR;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillText(text, NAME_TEXT.x, baseline);
}

export async function generateFlyer(name: string, photoUrl: string): Promise<Blob> {
  const [template, photo] = await Promise.all([
    loadImage(FLYER_TEMPLATE_SRC),
    loadImage(photoUrl),
    ensureNameFont(),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = template.naturalWidth || FLYER_SIZE;
  canvas.height = template.naturalHeight || FLYER_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
  drawPhoto(ctx, photo);
  drawName(ctx, name);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not create the flyer image."))),
      "image/png",
    );
  });
}

export function flyerFileName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `youth-week-2026-${slug || "flyer"}.png`;
}
