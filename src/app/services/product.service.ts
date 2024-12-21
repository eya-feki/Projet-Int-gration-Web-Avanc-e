import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Config } from '../shared/config';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private config = inject(Config);
  private http = inject(HttpClient);

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.bdUrl}products`);
  }

  // Fetch a product by reference
  getProduct(reference: string): Observable<Product> {
    return this.http
      .get<Product[]>(`${this.config.bdUrl}products?reference=${reference}`)
      .pipe(map((products) => products[0])); // Extract the first matching product
  }

  // Fetch products by category
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.config.bdUrl}products?categoryId=${categoryId}`
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.config.bdUrl}products`, product);
  }


  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.config.bdUrl}products/${product.id}`,
      product
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.bdUrl}products/${id}`);
  }
  



  addComments(comment: Comment, prod: Product): void {
    prod.comments.push(comment);
  }
}
