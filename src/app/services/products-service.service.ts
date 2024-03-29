import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private baseUrl = "https://localhost:44332/"
  private apiPath = "api/Products";
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${this.apiPath}`);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}${this.apiPath}`, product)
  }
  deleteProduct(productId?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.apiPath}/${productId}`)
  }
  editProduct(product: Product, productId?: string): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}${this.apiPath}/${productId}`, product);
  }
  getProductsByKeyword(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${this.apiPath}/ProductsByKeyword/${keyword}`);
  }
  getProductsByAverageRatingAsc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${this.apiPath}/ProductsByAverageRatingAsc`);
  }
  getProductsByAverageRatingDesc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${this.apiPath}/ProductsByAverageRatingDesc`);
  }
}
