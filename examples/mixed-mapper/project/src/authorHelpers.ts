import type { PresentationCache, User } from './contracts.ts';

function resolveLabel(authorId: string, users: ReadonlyMap<string, User>, cache: PresentationCache) {
  const label = users.get(authorId)?.displayName?.trim() || 'Unknown user';
  cache.authorLabels.set(authorId, label);
  return label;
}

export function formatAuthor(authorId: string, users: ReadonlyMap<string, User>, cache: PresentationCache) {
  return resolveLabel(authorId, users, cache);
}
