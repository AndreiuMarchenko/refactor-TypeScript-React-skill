export type Notification = { id: string; text: string; unread: boolean };

export type LoadNotifications = (roomId: string, signal: AbortSignal) => Promise<unknown>;

/** Перевіряє зовнішні дані; відхиляє весь payload, якщо хоча б один запис невалідний. */
export function decodeNotifications(value: unknown): Notification[] {
  if (!Array.isArray(value)) throw new Error('Invalid notifications');
  return value.map((item: unknown) => {
    if (
      typeof item !== 'object' || item === null ||
      !('id' in item) || typeof item.id !== 'string' ||
      !('text' in item) || typeof item.text !== 'string' ||
      !('unread' in item) || typeof item.unread !== 'boolean'
    ) throw new Error('Invalid notifications');
    return { id: item.id, text: item.text, unread: item.unread };
  });
}
