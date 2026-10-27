import { useEffect, useState } from 'react';
import { decodeNotifications, type LoadNotifications, type Notification } from './notification';

type Props = { roomId: string; load: LoadNotifications };
type State =
  | { status: 'loading' }
  | { status: 'ready'; items: Notification[] }
  | { status: 'error'; message: string };

/** Прив'язує стан панелі до кімнати, щоб попередні дані не потрапляли в нову кімнату. */
export function Notifications(props: Props) {
  return <NotificationFeed key={props.roomId} {...props} />;
}

/** Володіє запитом; cleanup скасовує роботу й блокує запізнілі callbacks. */
function NotificationFeed({ roomId, load }: Props) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ status: 'loading' });

    async function refresh() {
      try {
        const payload = await load(roomId, controller.signal);
        if (active) setState({ status: 'ready', items: decodeNotifications(payload) });
      } catch (error: unknown) {
        if (active) setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Unable to load notifications',
        });
      }
    }
    void refresh();
    return () => {
      active = false;
      controller.abort();
    };
  }, [roomId, load]);

  if (state.status === 'loading') return <p role="status">Loading notifications</p>;
  if (state.status === 'error') return <p role="alert">{state.message}</p>;
  const unread = state.items.filter((item) => item.unread).length;
  return <section aria-label="Notifications">
    <p>Unread: {unread}</p>
    <ul>{state.items.map((item) => <li key={item.id}>{item.text}</li>)}</ul>
  </section>;
}
