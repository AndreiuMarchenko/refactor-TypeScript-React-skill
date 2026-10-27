import type { Message, MessageCard, PresentationContext } from './contracts.ts';
import { formatMessageText } from './textHelpers.ts';
import { formatAuthor } from './authorHelpers.ts';

export function mapMessage(message: Message, context: PresentationContext): MessageCard {
  const normalized = message.text.replace(/\s+/gu, ' ').trim();
  const preview = formatMessageText(message.id, normalized, context.previewLimit, context.cache);
  const authorLabel = formatAuthor(message.authorId, context.users, context.cache);
  const muted = message.notification?.muted ?? context.preferences.muted;
  const previews = message.notification?.previews ?? context.preferences.previews;
  const card: MessageCard = {
    id: message.id,
    authorLabel,
    preview: previews ? preview : '',
    notify: !muted,
  };

  if (Object.hasOwn(message, 'media')) {
    if (message.media === undefined) card.thumbnail = undefined;
    else if (message.media === null) card.thumbnail = null;
    else {
      const image = message.media.find((media) => media.kind === 'image');
      const video = message.media.find((media) => media.kind === 'video');
      card.thumbnail = image ? image.thumbnailUrl ?? image.url : video?.posterUrl ?? null;
    }
  }
  return card;
}
