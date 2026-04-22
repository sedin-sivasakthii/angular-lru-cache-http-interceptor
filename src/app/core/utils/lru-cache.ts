export class LRUCache<K, V> {
    private cache = new Map<K, V>();
  
    constructor(private capacity: number) {}
  
    get(key: K): V | undefined {
      if (!this.cache.has(key)) return undefined;
  
      const value = this.cache.get(key)!;
  
      // Move to most recent
      this.cache.delete(key);
      this.cache.set(key, value);
  
      return value;
    }
  
    set(key: K, value: V): void {
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
  
      // Evict least recently used
      if (this.cache.size >= this.capacity) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
  
      this.cache.set(key, value);
    }
  
    has(key: K): boolean {
      return this.cache.has(key);
    }
  }