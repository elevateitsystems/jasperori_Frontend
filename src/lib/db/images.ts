import { createHash } from 'node:crypto';

const MAX_DEPTH = 40;
const MAX_BYTES = 1_500_000;
const BUCKET = 'site-images';

const extensions: Record<string, string> = {
  'image/webp': 'webp',
  'image/png': 'png',
  'image/jpeg': 'jpg',
};

let bucketReady: Promise<void> | null = null;

/**
 * Replaces an uploaded data URL with a file in the public Supabase Storage bucket.
 * The same bytes keep the same name, so saving a page again does not duplicate the file.
 * Paths that are already `/images/...` stay as they are.
 */
export async function persistImages(value: unknown, depth = 0): Promise<unknown> {
  if (depth > MAX_DEPTH) return value;

  if (typeof value === 'string') {
    if (!value.startsWith('data:image/')) return value;
    return saveDataUrl(value);
  }

  if (Array.isArray(value)) {
    const next: unknown[] = [];
    for (const item of value) next.push(await persistImages(item, depth + 1));
    return next;
  }

  if (value && typeof value === 'object') {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      next[key] = await persistImages(child, depth + 1);
    }
    return next;
  }

  return value;
}

function storageConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, '');
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !key) {
    throw new Error(
      'Supabase Storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY.',
    );
  }
  return { url, key };
}

function storageHeaders(key: string, contentType?: string): HeadersInit {
  return {
    authorization: `Bearer ${key}`,
    apikey: key,
    ...(contentType ? { 'content-type': contentType } : {}),
  };
}

async function ensureBucket() {
  bucketReady ??= createBucket().catch((error: unknown) => {
    bucketReady = null;
    throw error;
  });
  return bucketReady;
}

async function createBucket() {
  const { url, key } = storageConfig();
  const response = await fetch(`${url}/storage/v1/bucket`, {
    method: 'POST',
    headers: storageHeaders(key, 'application/json'),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: MAX_BYTES,
      allowed_mime_types: Object.keys(extensions),
    }),
  });
  if (response.ok || response.status === 409) return;

  const body = await response.text();
  if (/already exists/i.test(body)) return;
  throw new Error('Could not prepare image storage.');
}

async function saveDataUrl(value: string): Promise<string> {
  const match = /^data:(image\/[\w+.-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(value);
  if (!match) throw new Error('Invalid image upload.');

  const mime = match[1];
  const extension = extensions[mime];
  if (!extension) throw new Error('Unsupported image type.');

  const bytes = Buffer.from(match[2], 'base64');
  if (bytes.length === 0 || bytes.length > MAX_BYTES) throw new Error('Image is too large.');

  const name = createHash('sha256').update(bytes).digest('hex').slice(0, 20);
  const filename = `${name}.${extension}`;
  const { url, key } = storageConfig();

  await ensureBucket();
  const response = await fetch(`${url}/storage/v1/object/${BUCKET}/${filename}`, {
    method: 'POST',
    headers: {
      ...storageHeaders(key, mime),
      'x-upsert': 'true',
    },
    body: new Uint8Array(bytes),
  });
  if (!response.ok && response.status !== 409) {
    throw new Error('Could not store the image.');
  }

  return `${url}/storage/v1/object/public/${BUCKET}/${filename}`;
}
