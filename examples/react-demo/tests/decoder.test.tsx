import { describe, expect, it } from 'vitest';
import { decodeNotifications } from '../src/notifications/notification';

describe('wire decoder', () => {
  it.each([null, {}, [null], [{ id: '1', text: 3, unread: true }], [{ id: '1', text: 'x' }]])(
    'rejects a malformed payload: %j', (payload) => {
      expect(() => decodeNotifications(payload)).toThrow('Invalid notifications');
    },
  );
  it('preserves identifiers beyond safe integer precision', () => {
    expect(decodeNotifications([{ id: '9007199254740993', text: 'Hello', unread: false }])[0].id)
      .toBe('9007199254740993');
  });
});
