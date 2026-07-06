/**
 * In-process keyed async mutex. Serialises async work sharing a key so a
 * read-modify-write on the filesystem store can't lose an update.
 *
 * The Fly deploy runs ONE machine with a single data volume (fly.toml), so
 * one Node process owns all writes and an in-process lock is sufficient. If
 * this ever scales to multiple instances, the store/quota writes would need
 * real file locks (flock / O_EXCL temp+rename) instead.
 */
const tails = new Map<string, Promise<unknown>>();

export function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = tails.get(key) ?? Promise.resolve();
  const next = prev.then(fn, fn); // run fn regardless of the prior job's outcome
  tails.set(key, next);
  void next.finally(() => {
    if (tails.get(key) === next) tails.delete(key);
  });
  return next;
}
