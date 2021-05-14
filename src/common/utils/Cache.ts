export default class Cache<T> {
  private value?: T = undefined;
  private dirty: boolean = true;

  set(value: T) {
    this.value = value;
    this.dirty = false;
  }

  get() {
    if (this.dirty) {
      throw new Error('캐시가 더러워요! 퉤!');
    }

    return this.value;
  }

  isValid() {
    return !this.isEmpty() && !this.isDirty();
  }

  isEmpty() {
    return this.dirty === undefined;
  }

  isDirty() {
    return this.dirty;
  }

  markDirty() {
    this.dirty = true;
  }
}

export async function cachedFetch<T>(cache: Cache<T>, fetch: () => T) {
  if (!cache.isValid()) {
    cache.set(await fetch());
  }

  return cache.get();
}
