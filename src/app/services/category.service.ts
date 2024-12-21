import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { CATEGORIES } from '../shared/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories!: Category[];


  constructor() {
    this.categories = CATEGORIES;
  }
  getAllCategory(): Category[] {
    return this.categories;
  }
  addCategory(cat: Category) {
    this.categories.push(cat);
  }
  getCategoryById(id: number): Category {
    return <Category>this.categories.find((c: Category) => c.id === id);
  }

}
