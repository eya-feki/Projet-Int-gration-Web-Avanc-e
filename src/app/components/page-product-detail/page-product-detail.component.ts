import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { Config } from '../../shared/config';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Comment } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-page-product-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './page-product-detail.component.html',
  styleUrls: ['./page-product-detail.component.css'],
})
export class PageProductDetailComponent {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private productService = inject(ProductService);
  config = inject(Config);

  comment: Comment = { comment: '', rating: 0, date: new Date().toISOString() };

  product: Product | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const reference = this.route.snapshot.paramMap.get('reference');
    if (reference) {
      this.productService.getProduct(reference).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.errorMessage = 'Product not found.';
        },
      });
    }
  }
  addComment(): void {
    if (this.product) {
      this.product.comments.push(this.comment);
      this.comment = { comment: '', rating: 0, date: new Date().toISOString() };
    }
  }

  goBack(): void {
    this.location.back();
  }
}
