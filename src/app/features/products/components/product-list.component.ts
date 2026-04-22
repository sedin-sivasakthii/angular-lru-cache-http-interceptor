import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { SpinnerComponent } from '../../../shared/components/spinner.component';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  template: `
    <app-spinner></app-spinner>

    <button (click)="fetch()">Fetch Products</button>

    <ul>
      @for (item of posts; track item.id) {
        <li>{{ item.title }}</li>
      }
    </ul>
  `
})
export class ProductListComponent {
  posts: Post[] = [];

  constructor(private service: ProductService) {}

  fetch() {
    this.service.getProducts().subscribe({
      next: (data) => (this.posts = data)
    });
  }
}