export const zIndexTokens = {
  base: 0,
  raised: 10,
  sticky: 100,
  overlay: 500,
  modal: 800,
  toast: 900,
} as const;

export type ZIndexToken = keyof typeof zIndexTokens;
