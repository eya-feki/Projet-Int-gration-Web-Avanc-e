import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { RouterLink, RouterModule } from '@angular/router';
import { CatFilter } from "../../shared/catFilter";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, DetailProductComponent, RouterModule, CatFilter,RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  @Input() name!: string; 
  @Input() search: string = ''; 
  @Input() categoryId!: number;
  @Input() categoryName!: string;
  products: Product[] = [];

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.productService.getProductsByCategory(this.categoryId).subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error fetching products by category:', err),
    });
  }
}
