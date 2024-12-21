import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'catFilter',
  standalone: true
})
export class CatFilter implements PipeTransform {
  transform(products: Product[], search: string): Product[] {
    if (!search) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}
