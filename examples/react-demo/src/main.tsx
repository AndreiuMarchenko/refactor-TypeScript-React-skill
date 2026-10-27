import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Notifications } from './notifications/Notifications';
import type { LoadNotifications } from './notifications/notification';
import './style.css';

// Local transport deliberately ignores cancellation: the component must also guard stale work.
const load: LoadNotifications = async (roomId) => {
  await new Promise((resolve) => setTimeout(resolve, roomId === 'engineering' ? 800 : 100));
  if (roomId === 'invalid') return [{ id: 42, text: 'Broken payload', unread: 'yes' }];
  if (roomId === 'offline') throw new Error('Connection unavailable');
  return [
    { id: `${roomId}-1`, text: `Welcome to ${roomId}`, unread: true },
    { id: `${roomId}-2`, text: 'Release notes are ready', unread: false },
  ];
};

function App() {
  const [roomId, setRoomId] = useState('engineering');
  return <main>
    <h1>Notifications</h1>
    <label>Room <select value={roomId} onChange={(event) => setRoomId(event.target.value)}>
      <option value="engineering">Engineering</option>
      <option value="design">Design</option>
      <option value="invalid">Invalid response</option>
      <option value="offline">Offline</option>
    </select></label>
    <Notifications roomId={roomId} load={load} />
  </main>;
}

const root = document.getElementById('root');
if (!root) throw new Error('Missing root element');
createRoot(root).render(<StrictMode><App /></StrictMode>);
