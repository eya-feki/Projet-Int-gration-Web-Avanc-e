import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { SearchComponent } from '../search/search.component';
import { CategoryComponent } from '../category/category.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CategoryComponent, SearchComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  categories: Category[] = [];
  products: Product[] = [];
  search: string = '';
  filteredProductsList: Product[] = [];
  clickNb: number = 0;
  selectedCategoryId: number | null = null;
  addingProduct: boolean = false;
  editingProduct: Product | null = null;
  newProduct: Product = {
    id:"",
    reference: '',
    name: '',
    stockQte: 0,
    unitPrice: 0,
    image: '',
    category: '', 
    categoryId: 0, 
    comments: [],
  };

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchAllProducts();
    this.search = "";
  }

  fetchCategories(): void {
    this.categories = this.categoryService.getAllCategory();
  }

  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProductsList = products; 
      },
      error: (err) => console.error('Error fetching all products:', err),
    });
  }


  fetchProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (products) => (this.products = products),
      error: (err) => console.error('Error fetching products by category:', err),
    });
  }
  updateSearch(searchTerm: string): void {
    this.search = searchTerm;
    this.filteredProductsList = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  performSearch(): void {
    console.log('Performing search for:', this.search);
    // Add additional logic if needed
  }
  filteredProducts(): Product[] {
    if (!this.search) {
      return this.products;
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  addProduct(): void {
  
    const newProduct: Product = {
      id: `prod${Date.now()}`, 
      reference: `prod${Date.now()}`, 
      name: this.newProduct.name || 'New Product', 
      stockQte: this.newProduct.stockQte || 0, 
      unitPrice: this.newProduct.unitPrice || 0,
      image: this.newProduct.image || 'images/default.jpg', 
      category: this.newProduct.category || 'Uncategorized', 
      categoryId: this.newProduct.categoryId || 0, 
      comments: [],
    };
  
    // Add the product via the ProductService
    this.productService.addProduct(newProduct).subscribe({
      next: (product) => {
        this.products.push(product); // Update the local list with the added product
        this.filteredProductsList.push(product); // Update the filtered list
        alert('Product added successfully!');
        this.cancelAdd(); // Close the modal after adding
      },
      error: (err) => console.error('Error adding product:', err),
    });
  }
  openAddModal(): void {
    this.addingProduct = true;
    this.resetNewProduct(); 
  }
  
  cancelAdd(): void {
    this.addingProduct = false;
  }
  resetNewProduct(): void {
    this.newProduct = {
      id: "",
      reference: "",
      name: "",
      stockQte: 0,
      unitPrice: 0,
      image: "",
      category: "",
      categoryId: 0,
      comments: [],
    };
  }
  
  editProduct(id: string): void {

    const productToEdit = this.products.find((product) => product.id === id);
  
    if (productToEdit) {
      this.editingProduct = { ...productToEdit };
    } else {
      console.error(`Product with id ${id} not found.`);
    }
  }
  
  saveProduct(): void {
    if (this.editingProduct) {
      // Call the updateProduct service method to save the changes
      this.productService.updateProduct(this.editingProduct).subscribe({
        next: (updatedProduct) => {
          // Find the index of the updated product in the product list
          const index = this.products.findIndex((p) => p.id === updatedProduct.id);
          if (index !== -1) {
            // Update the product in the list with the updated details
            this.products[index] = updatedProduct;
          }
          // Clear the editingProduct to close the modal
          this.editingProduct = null;
          alert('Product updated successfully!');
        },
        error: (err) => console.error('Error updating product:', err),
      });
    } else {
      console.error('No product is being edited.');
    }
  }
  

  cancelEdit(): void {
    this.editingProduct = null;
  }
  
  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          alert('Product deleted successfully!');
        },
        error: (err) => console.error('Error deleting product:', err),
      });
    }
  }
  
  
  
}
