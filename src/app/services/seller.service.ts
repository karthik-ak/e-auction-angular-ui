import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  GetProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}Products/GetAllProducts`);
  }

  GetProduct(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}Products/GetProduct/${id}`);
  }

  AddProduct(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}Products/CreateProduct`, product);
  }

  UpdateProduct(product: Product) {
    return this.http.put<Product>(`${environment.apiUrl}Products/UpdateProduct`, product);
  }

  DeleteProduct(id: string) {
    return this.http.delete<Product>(`${environment.apiUrl}Products/DeleteProduct/${id}`);
  }
}
