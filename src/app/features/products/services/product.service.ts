import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, shareReplay } from 'rxjs';
import { LRUCache } from '../../../core/utils/lru-cache';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  private cache = new LRUCache<string, Post[]>(3);

  constructor(private http: HttpClient) {}

  getProducts(url: string = this.API_URL): Observable<Post[]> {
    const cached = this.cache.get(url);

    if (cached) {
      console.log('CACHE HIT:', url);
      return of(cached);
    }

    console.log('API CALL:', url);

    return this.http.get<Post[]>(url).pipe(
      tap((data) => this.cache.set(url, data)),
      shareReplay(1) // prevents duplicate API calls if multiple subscribers
    );
  }
}