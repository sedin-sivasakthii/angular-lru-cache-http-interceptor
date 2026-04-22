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

  <div class="controls">
  <button (click)="fetchCustom('https://jsonplaceholder.typicode.com/posts')">Posts</button>
  <button (click)="fetchCustom('https://jsonplaceholder.typicode.com/comments')">Comments</button>
  <button (click)="fetchCustom('https://jsonplaceholder.typicode.com/albums')">Albums</button>
  <button (click)="fetchCustom('https://jsonplaceholder.typicode.com/todos')">Todos</button>
</div>

  <ul>
  @for (item of posts; track item.id) {
    <li>
      <strong>
        {{ item.title || item.name }}
      </strong>
      <br />
      <small>
        {{ item.body }}
      </small>
    </li>
  }
</ul>
`
})
export class ProductListComponent {
    posts: Post[] = [];
  
    constructor(private service: ProductService) {}
  
    // Add this method
    fetch() {
      this.service.getProducts().subscribe({
        next: (data) => (this.posts = data)
      });
    }
  
    // (optional for LRU testing)
    fetchCustom(url: string) {
      this.service.getProducts(url).subscribe(data => {
        this.posts = data;
      });
    }
  }