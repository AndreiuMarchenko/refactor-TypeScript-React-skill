import assert from 'node:assert/strict';
import { test } from 'node:test';
import { presentMessage } from '../src/index.ts';
import type { Message, PresentationContext } from '../src/contracts.ts';

function message(overrides: Partial<Message> = {}): Message {
  return { id: '9007199254740993', text: ' hello    world ', authorId: 'u1', ...overrides };
}

function context(): PresentationContext {
  return {
    users: new Map([['u1', { id: 'u1', displayName: ' Ada ' }]]),
    preferences: { muted: false, previews: true },
    previewLimit: 8,
    cache: { authorLabels: new Map(), previews: new Map() },
  };
}

test('consumer receives normalized clipped text and populated cache state', () => {
  const state = context();
  assert.deepEqual(presentMessage(message(), state), {
    id: '9007199254740993', authorLabel: 'Ada', preview: 'hello w…', notify: true,
  });
  assert.deepEqual([...state.cache.previews], [['9007199254740993', 'hello w…']]);
  assert.deepEqual([...state.cache.authorLabels], [['u1', 'Ada']]);
});

test('clipping preserves Unicode code points', () => {
  const state = context();
  state.previewLimit = 3;
  assert.equal(presentMessage(message({ text: 'A🚀BC' }), state).preview, 'A🚀…');
  assert.equal(state.cache.previews.get('9007199254740993'), 'A🚀…');
});

test('a zero preview budget yields an empty cached preview', () => {
  const state = context();
  state.previewLimit = 0;
  assert.equal(presentMessage(message(), state).preview, '');
  assert.equal(state.cache.previews.get('9007199254740993'), '');
});

test('short normalized text is not clipped', () => {
  assert.equal(presentMessage(message({ text: '  Hi  ' }), context()).preview, 'Hi');
});

test('current user data replaces a stale author label', () => {
  const state = context();
  state.cache.authorLabels.set('u1', 'Old label');
  state.cache.authorLabels.set('unrelated', 'Keep');
  assert.equal(presentMessage(message(), state).authorLabel, 'Ada');
  assert.deepEqual([...state.cache.authorLabels], [['u1', 'Ada'], ['unrelated', 'Keep']]);
});

test('unknown or unnamed authors have the same visible and cached fallback', () => {
  for (const displayName of [undefined, null, '', '   ']) {
    const state = context();
    state.users = new Map([['u1', { id: 'u1', displayName }]]);
    assert.equal(presentMessage(message(), state).authorLabel, 'Unknown user');
    assert.equal(state.cache.authorLabels.get('u1'), 'Unknown user');
  }
  const state = context();
  state.users = new Map();
  assert.equal(presentMessage(message(), state).authorLabel, 'Unknown user');
});

test('images take precedence over video posters regardless of ordering', () => {
  const result = presentMessage(message({ media: [
    { kind: 'video', posterUrl: 'video.jpg' },
    { kind: 'image', url: 'full.jpg', thumbnailUrl: 'thumb.jpg' },
  ] }), context());
  assert.equal(result.thumbnail, 'thumb.jpg');
});

test('image source is used when its thumbnail is null or missing', () => {
  for (const thumbnailUrl of [undefined, null]) {
    assert.equal(presentMessage(message({ media: [
      { kind: 'image', url: 'full.jpg', thumbnailUrl },
    ] }), context()).thumbnail, 'full.jpg');
  }
});

test('video-only media uses the poster and an empty collection yields null', () => {
  assert.equal(presentMessage(message({ media: [{ kind: 'video', posterUrl: 'poster.jpg' }] }), context()).thumbnail, 'poster.jpg');
  assert.equal(presentMessage(message({ media: [] }), context()).thumbnail, null);
});

test('missing media leaves thumbnail absent', () => {
  assert.equal(Object.hasOwn(presentMessage(message(), context()), 'thumbnail'), false);
});

test('present undefined media leaves a present undefined thumbnail', () => {
  const result = presentMessage(message({ media: undefined }), context());
  assert.equal(Object.hasOwn(result, 'thumbnail'), true);
  assert.equal(result.thumbnail, undefined);
});

test('null media leaves a present null thumbnail', () => {
  const result = presentMessage(message({ media: null }), context());
  assert.equal(Object.hasOwn(result, 'thumbnail'), true);
  assert.equal(result.thumbnail, null);
});

test('explicit false notification overrides supersede true preferences', () => {
  const state = context();
  state.preferences = { muted: true, previews: true };
  const result = presentMessage(message({ notification: { muted: false, previews: false } }), state);
  assert.equal(result.notify, true);
  assert.equal(result.preview, '');
  assert.equal(state.cache.previews.get('9007199254740993'), 'hello w…');
});

for (const [label, notification] of [
  ['missing', undefined], ['undefined', { muted: undefined, previews: undefined }],
  ['null', { muted: null, previews: null }],
] as const) {
  test(`${label} notification values use current preferences`, () => {
    const state = context();
    state.preferences = { muted: true, previews: false };
    const result = presentMessage(message({ notification }), state);
    assert.equal(result.notify, false);
    assert.equal(result.preview, '');
    assert.equal(state.cache.previews.get('9007199254740993'), 'hello w…');
  });
}

test('updated content and preferences replace current output and cache values', () => {
  const state = context();
  presentMessage(message(), state);
  state.preferences.muted = true;
  const result = presentMessage(message({ text: 'New text' }), state);
  assert.equal(result.preview, 'New text');
  assert.equal(result.notify, false);
  assert.equal(state.cache.previews.get('9007199254740993'), 'New text');
});

test('presentation preserves caller-owned message and user records', () => {
  const input = Object.freeze(message({ text: '  Keep  ', media: Object.freeze([{ kind: 'image' as const, url: 'full.jpg' }]) }));
  const state = context();
  const before = structuredClone({ input, users: [...state.users] });
  presentMessage(input, state);
  assert.deepEqual({ input, users: [...state.users] }, before);
});
