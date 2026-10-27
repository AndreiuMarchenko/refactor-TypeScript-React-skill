import type { Message, MessageCard, PresentationContext } from './contracts.ts';
import { mapMessage } from './mapMessage.ts';

export function presentMessage(message: Message, context: PresentationContext): MessageCard {
  return mapMessage(message, context);
}
