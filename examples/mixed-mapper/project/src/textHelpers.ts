import type { PresentationCache } from './contracts.ts';

function clipAndRemember(id: string, text: string, limit: number, cache: PresentationCache) {
  const points = Array.from(text);
  const preview = points.length <= limit ? text
    : limit === 0 ? '' : `${points.slice(0, limit - 1).join('')}…`;
  cache.previews.set(id, preview);
  return preview;
}

export function formatMessageText(id: string, normalized: string, limit: number, cache: PresentationCache) {
  return clipAndRemember(id, normalized, limit, cache);
}
