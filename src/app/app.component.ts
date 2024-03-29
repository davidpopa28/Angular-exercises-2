import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsServiceService } from './services/products-service.service';
import { Product } from './models/product';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private productsService: ProductsServiceService) {}
  products: Product[] = [];
  emptyProduct: Product = {
    id: undefined,
    name: '',
    description: '',
    ratings: [],
    createdOn: new Date(),
  };
  filteredProducts: Product[] = [];
  keyword!: string;
  editedProduct: Product = { ...this.emptyProduct };
  toEditProduct: Product = { ...this.emptyProduct };
  product: Product = { ...this.emptyProduct };
  showProductForm: boolean = false;
  showEditForm: boolean = false;
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
      console.log(this.products);
    });
  }

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
  }

  createProduct() {
    this.productsService.createProduct(this.product).subscribe(() => {
      this.getAllProducts();
      this.product = this.emptyProduct;
    });
    this.showProductForm = !this.showProductForm;
  }
  deleteProduct(id?: string) {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.getAllProducts();
    });
  }
  toggleEditForm(product: Product) {
    this.showEditForm = !this.showEditForm;
    this.editedProduct = { ...product };
  }
  editProduct(product: Product, productId?: string) {
    this.productsService.editProduct(product, productId).subscribe(() => {
      this.getAllProducts();
      this.editedProduct = this.emptyProduct;
    });
    this.showEditForm = !this.showEditForm;
  }
  getProductsByKeyword() {
    if (this.keyword === undefined) {
      this.getAllProducts();
    } else if (this.keyword.trim() == '') {
      this.getAllProducts();
    } else {
      this.productsService
        .getProductsByKeyword(this.keyword)
        .subscribe((products) => {
          this.filteredProducts = products;
        });
    }
  }
  getProductsByAvgRatingAsc() {
    this.productsService
      .getProductsByAverageRatingAsc()
      .subscribe((products) => {
        this.filteredProducts = products;
      });
  }
  getProductsByAvgRatingDesc() {
    this.productsService
      .getProductsByAverageRatingDesc()
      .subscribe((products) => {
        this.filteredProducts = products;
      });
  }
}
