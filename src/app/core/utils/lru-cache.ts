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
      
        if (this.cache.size >= this.capacity) {
          const iterator = this.cache.keys().next();
          if (!iterator.done) {
            const oldestKey = iterator.value;
            console.log('LRU EVICT:', oldestKey);
            this.cache.delete(oldestKey);
          }
        }
      
        this.cache.set(key, value);
        console.log('CACHE STATE:', Array.from(this.cache.keys()));
      }
  }