import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private baseUrl = "https://localhost:44332/"
  private apiPath = "api/Stores";
  constructor(private http: HttpClient) { }

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}${this.apiPath}`);
  }
  createStores(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.baseUrl}${this.apiPath}`, store)
  }
  deleteStores(storeId?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.apiPath}/${storeId}`)
  }
  editStore(store: Store, storesId?: string): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}${this.apiPath}/${storesId}`, store);
  }
  getStoresByKeyword(keyword: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}${this.apiPath}/StoresByKeyword/${keyword}`);
  }
  getStoresByCountry(country: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}${this.apiPath}/StoresByCountry/${country}`);
  }
  getStoresByMonthlyIncome(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}${this.apiPath}/StoresByMonthlyIncome`);
  }
  transferOwnershipOfStore(newOwnerName: string, storesId?: string, ): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}${this.apiPath}/${storesId}`, newOwnerName);
  }
  getStoresByCity(city: string): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.baseUrl}${this.apiPath}/StoresByCity/${city}`);
  }
}
