import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bid } from '../model/bid.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private bearerToken: string;
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.bearerToken = this.tokenStorage.getToken()!;
  }

  GetBids(id: string) {
    return this.http.get<Bid[]>(`${environment.apiUrl}e-auction/api/v1/seller/show-bids/${id}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`) });
  }

  GetBid(id: string, emailId: string) {
    return this.http.get<Bid[]>(`${environment.apiUrl}e-auction/api/v1/seller/show-bid/${id}/${emailId}`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`) });
  }

  AddBid(bid: Bid) {
    return this.http.post<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/place-bid`, bid, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`) });
  }

  UpdateBid(bid: Bid) {
    return this.http.put<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/update-bid/${bid.productId}/${bid.email}/${bid.bidAmount}`, bid, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`) });
  }
}
