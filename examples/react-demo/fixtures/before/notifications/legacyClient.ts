import type { Notification } from '../../../src/notifications/notification';

// Superseded transport: no callers, no import side effects, no registry entry.
export async function legacyClient(roomId: string): Promise<Notification[]> {
  const response = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/notifications`);
  return response.json() as Promise<Notification[]>;
}
