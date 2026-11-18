export const PROJECT_BRIEFS_BUCKET = 'project-briefs';
export const MAX_BRIEF_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_BRIEF_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
]);

export const ALLOWED_BRIEF_EXTENSIONS = new Set(['.pdf', '.png', '.jpg', '.jpeg', '.webp']);

export function getExtension(filename) {
  if (typeof filename !== 'string') return '';
  const idx = filename.lastIndexOf('.');
  if (idx === -1) return '';
  return filename.slice(idx).toLowerCase();
}

export function sanitizeBriefFilename(filename) {
  if (typeof filename !== 'string') return '';
  const base = filename.split(/[/\\]/).pop()?.trim() || '';
  const ext = getExtension(base);
  const stem = base.slice(0, base.length - ext.length);
  const cleanedStem = stem
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[.-]+|[.-]+$/g, '')
    .slice(0, 80);
  const safeStem = cleanedStem || 'project-brief';
  return `${safeStem}${ext}`;
}

export function isValidSingleSegmentFileName(name) {
  if (typeof name !== 'string' || !name.trim()) return false;
  if (name.includes('/') || name.includes('\\') || name.includes('..')) return false;
  if (name.startsWith('.')) return false;
  return name.length <= 160;
}

export function verifyMagicBytes(bytes, mimeType) {
  if (!(bytes instanceof Uint8Array) || bytes.length < 4) return false;

  if (mimeType === 'application/pdf') {
    // %PDF
    return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
  }

  if (mimeType === 'image/png') {
    // 89 50 4E 47 0D 0A 1A 0A
    return (
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    );
  }

  if (mimeType === 'image/jpeg') {
    // FF D8 FF
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  if (mimeType === 'image/webp') {
    // RIFF....WEBP
    return (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    );
  }

  return false;
}

export function formatFileSize(bytes) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes) || bytes < 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
