import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private bearerToken: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
    this.bearerToken = this.tokenStorage.getToken()!;
  }

  GetProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}e-auction/api/v1/seller/get-all-products`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)});
  }

  GetProduct(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}e-auction/api/v1/seller/get-product/${id}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)});
  }

  AddProduct(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}e-auction/api/v1/seller/add-product`, product,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)});
  }

  UpdateProduct(product: Product) {
    return this.http.put<Product>(`${environment.apiUrl}e-auction/api/v1/seller/update`, product, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)});
  }

  DeleteProduct(id: string) {
    return this.http.delete<Product>(`${environment.apiUrl}e-auction/api/v1/seller/delete/${id}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)});
  }
}
