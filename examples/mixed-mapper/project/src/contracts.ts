export type Media =
  | { kind: 'image'; url: string; thumbnailUrl?: string | null | undefined }
  | { kind: 'video'; posterUrl?: string | null | undefined };

export type NotificationOverrides = {
  muted?: boolean | null | undefined;
  previews?: boolean | null | undefined;
};

export type Message = {
  id: string;
  text: string;
  authorId: string;
  media?: readonly Media[] | null | undefined;
  notification?: NotificationOverrides | null | undefined;
};

export type User = { id: string; displayName?: string | null | undefined };

export type PresentationCache = {
  authorLabels: Map<string, string>;
  previews: Map<string, string>;
};

export type PresentationContext = {
  users: ReadonlyMap<string, User>;
  preferences: { muted: boolean; previews: boolean };
  previewLimit: number;
  cache: PresentationCache;
};

export type MessageCard = {
  id: string;
  authorLabel: string;
  preview: string;
  notify: boolean;
  thumbnail?: string | null | undefined;
};
