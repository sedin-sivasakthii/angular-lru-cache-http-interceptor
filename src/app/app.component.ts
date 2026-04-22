import { Component } from '@angular/core';
import { ProductListComponent } from './features/products/components/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent],
  template: `
    <h1>Angular LRU Cache Demo</h1>
    <app-product-list></app-product-list>
  `
})
export class AppComponent {}