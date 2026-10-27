import { StrictMode } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Notifications } from '@notifications';
import type { LoadNotifications } from '../src/notifications/notification';

afterEach(cleanup);

function deferred() {
  let resolve!: (value: unknown) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<unknown>((ok, fail) => { resolve = ok; reject = fail; });
  return { promise, resolve, reject };
}

const item = (text: string) => ({ id: '9007199254740993', text, unread: true });

describe('Notifications contract', () => {
  it('shows loading while a request is pending', () => {
    render(<Notifications roomId="a" load={() => new Promise(() => {})} />);
    expect(screen.getByRole('status').textContent).toBe('Loading notifications');
  });

  it('renders valid data and the unread count', async () => {
    render(<Notifications roomId="a" load={async () => [item('Hello'), { id: '2', text: 'Read', unread: false }]} />);
    expect(await screen.findByText('Hello')).toBeTruthy();
    expect(await screen.findByText('Unread: 1')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders an empty response', async () => {
    render(<Notifications roomId="a" load={async () => []} />);
    expect(await screen.findByText('Unread: 0')).toBeTruthy();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('shows a current request error', async () => {
    render(<Notifications roomId="a" load={async () => { throw new Error('Offline'); }} />);
    expect((await screen.findByRole('alert')).textContent).toBe('Offline');
  });

  it('rejects invalid wire data', async () => {
    render(<Notifications roomId="a" load={async () => [{ id: 42, text: 'Invalid', unread: 'yes' }]} />);
    expect((await screen.findByRole('alert')).textContent).toBe('Invalid notifications');
  });

  it('ignores a late success after a room change', async () => {
    const old = deferred();
    const load: LoadNotifications = (room) => room === 'a' ? old.promise : Promise.resolve([item('Current')]);
    const view = render(<Notifications roomId="a" load={load} />);
    view.rerender(<Notifications roomId="b" load={load} />);
    await screen.findByText('Current');
    await act(async () => old.resolve([item('Obsolete')]));
    expect(screen.queryByText('Obsolete')).toBeNull();
    expect(screen.getByText('Current')).toBeTruthy();
  });

  it('ignores a late error after a room change', async () => {
    const old = deferred();
    const load: LoadNotifications = (room) => room === 'a' ? old.promise : Promise.resolve([item('Current')]);
    const view = render(<Notifications roomId="a" load={load} />);
    view.rerender(<Notifications roomId="b" load={load} />);
    await screen.findByText('Current');
    await act(async () => old.reject(new Error('Old failure')));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('Current')).toBeTruthy();
  });

  it('aborts the previous request on a room change', () => {
    const signals: AbortSignal[] = [];
    const load: LoadNotifications = (_room, signal) => {
      signals.push(signal);
      return new Promise(() => {});
    };
    const view = render(<Notifications roomId="a" load={load} />);
    view.rerender(<Notifications roomId="b" load={load} />);
    expect(signals).toHaveLength(2);
    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });

  it('aborts the request on unmount', () => {
    const load = vi.fn<LoadNotifications>(() => new Promise(() => {}));
    const view = render(<Notifications roomId="a" load={load} />);
    view.unmount();
    expect(load.mock.calls[0][1].aborted).toBe(true);
  });

  it('cleans up StrictMode setup without cancelling its replacement', async () => {
    const load = vi.fn<LoadNotifications>(async () => [item('Current')]);
    const view = render(<StrictMode><Notifications roomId="a" load={load} /></StrictMode>);
    await screen.findByText('Current');
    expect(load.mock.calls).toHaveLength(2);
    expect(load.mock.calls[0][1].aborted).toBe(true);
    expect(load.mock.calls[1][1].aborted).toBe(false);
    view.unmount();
    expect(load.mock.calls[1][1].aborted).toBe(true);
  });

  it('resets to loading when the room changes', async () => {
    const load: LoadNotifications = (room) => room === 'a'
      ? Promise.resolve([item('First room')]) : new Promise(() => {});
    const view = render(<Notifications roomId="a" load={load} />);
    await screen.findByText('First room');
    view.rerender(<Notifications roomId="b" load={load} />);
    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.queryByText('First room')).toBeNull();
  });

  it('uses the replacement loader', async () => {
    const view = render(<Notifications roomId="a" load={async () => [item('First loader')]} />);
    await screen.findByText('First loader');
    view.rerender(<Notifications roomId="a" load={async () => [item('Second loader')]} />);
    expect(await screen.findByText('Second loader')).toBeTruthy();
    expect(screen.queryByText('First loader')).toBeNull();
  });
});
