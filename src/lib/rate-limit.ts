const globalForRateLimit = globalThis as typeof globalThis & {
  ceeRateLimitStore?: Map<string, number[]>;
};

const store = globalForRateLimit.ceeRateLimitStore ?? new Map<string, number[]>();

if (!globalForRateLimit.ceeRateLimitStore) {
  globalForRateLimit.ceeRateLimitStore = store;
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = store.get(key) ?? [];
  const recent = existing.filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    store.set(key, recent);
    return false;
  }

  recent.push(now);
  store.set(key, recent);
  return true;
}
