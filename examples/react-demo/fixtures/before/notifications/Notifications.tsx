import { useEffect, useState } from 'react';
import type { LoadNotifications, Notification } from '../../../src/notifications/notification';
import { notificationAdapter } from './notificationAdapter';

// Historical baseline: unsafe cast, redundant state, missing ownership cleanup.
export function Notifications({ roomId, load }: { roomId: string; load: LoadNotifications }) {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');
    notificationAdapter(load, roomId).then((payload) => {
      setItems(payload as Notification[]);
      setLoading(false);
    }).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : 'Unable to load notifications');
      setLoading(false);
    });
  }, [roomId, load]);

  useEffect(() => setUnread(items.filter((item) => item.unread).length), [items]);

  if (loading) return <p role="status">Loading notifications</p>;
  if (error) return <p role="alert">{error}</p>;
  return <section aria-label="Notifications">
    <p>Unread: {unread}</p>
    <ul>{items.map((item) => <li key={item.id}>{item.text}</li>)}</ul>
  </section>;
}
