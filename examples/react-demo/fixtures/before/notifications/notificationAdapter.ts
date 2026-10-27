import type { LoadNotifications } from '../../../src/notifications/notification';

// Forwarding-only adapter: allocates a signal that no owner can abort.
export function notificationAdapter(load: LoadNotifications, roomId: string) {
  return load(roomId, new AbortController().signal);
}
