const cache = new Map<string, { data: unknown; expiry: number }>();

/**
 * Retrieve an item from the in-memory cache.
 * Returns null if missing or expired.
 */
export const getCache = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  return cached.data as T;
};

/**
 * Store an item in the in-memory cache.
 * @param {string} key
 * @param {T} data
 * @param {number} ttlMs - Time-to-live in milliseconds
 */
export const setCache = <T>(key: string, data: T, ttlMs: number): void => {
  cache.set(key, { data, expiry: Date.now() + ttlMs });
};

/**
 * Clear a specific item from the in-memory cache.
 */
export const clearCache = (key: string): void => {
  cache.delete(key);
};
