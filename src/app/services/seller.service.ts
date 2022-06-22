import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bid } from '../model/bid.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }

  GetProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}e-auction/api/v1/seller/get-all-products`);
  }

  GetProductsByEmail(emailId: string) {
    return this.http.get<Product[]>(`${environment.apiUrl}e-auction/api/v1/seller/get-products/${emailId}`);
  }

  GetProduct(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}e-auction/api/v1/seller/get-product/${id}`);
  }

  AddProduct(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}e-auction/api/v1/seller/add-product`, product);
  }

  UpdateProduct(product: Product) {
    return this.http.put<Product>(`${environment.apiUrl}e-auction/api/v1/seller/update`, product);
  }

  DeleteProduct(id: string) {
    return this.http.delete<Product>(`${environment.apiUrl}e-auction/api/v1/seller/delete/${id}`);
  }

  AcceptBid(bid: Bid) {
    return this.http.post<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/accept-bid`, bid);
  }

  RejectBid(bid: Bid) {
    return this.http.post<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/reject-bid`, bid);
  }
}
