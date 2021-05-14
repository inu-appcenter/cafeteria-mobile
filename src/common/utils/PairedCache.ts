import Cache from './Cache';

export default class PairedCache<K, V> {
  private caches: Map<K, Cache<V>> = new Map();

  set(key: K, value: V) {
    if (this.caches.get(key) === undefined) {
      this.caches.set(key, new Cache<V>());
    }

    this.caches.get(key)?.set(value);
  }

  get(key: K) {
    return this.caches.get(key)?.get();
  }

  isValid(key: K) {
    return this.caches.get(key)?.isValid() || false;
  }
}

export async function pairCachedFetch<K, V>(
  cache: PairedCache<K, V>,
  key: K,
  fetch: () => V,
) {
  if (!cache.isValid(key)) {
    cache.set(key, await fetch());
  }

  return cache.get(key);
}
