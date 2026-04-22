import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, shareReplay, finalize } from 'rxjs';
import { LRUCache } from '../../../core/utils/lru-cache';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  // LRU Cache (capacity = 3)
  private cache = new LRUCache<string, Post[]>(3);

  // Track ongoing requests (prevents duplicate API calls)
  private inFlight = new Map<string, Observable<Post[]>>();

  constructor(private http: HttpClient) {}

  getProducts(url: string = this.API_URL): Observable<Post[]> {
    //1. Check cache first
    const cached = this.cache.get(url);
    if (cached) {
      console.log('CACHE HIT:', url);
      return of(cached);
    }

    // 2. Check if request already in progress
    if (this.inFlight.has(url)) {
      console.log('IN-FLIGHT REUSED:', url);
      return this.inFlight.get(url)!;
    }

    // 3. Make API call
    console.log('API CALL:', url);

    const request$ = this.http.get<Post[]>(url).pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log('STORED IN CACHE:', url);
      }),

      // Cleanup after request completes
      finalize(() => {
        this.inFlight.delete(url);
      }),

      // Share same response across subscribers
      shareReplay(1)
    );

    // Store in-flight request
    this.inFlight.set(url, request$);

    return request$;
  }
}