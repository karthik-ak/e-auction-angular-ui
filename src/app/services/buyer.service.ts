import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Bid } from '../model/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient) {
  }

  GetBids(id: string) {
    return this.http.get<Bid[]>(`${environment.apiUrl}e-auction/api/v1/buyer/show-bids/${id}`);
  }

  GetBid(id: string, emailId: string) {
    return this.http.get<Bid[]>(`${environment.apiUrl}e-auction/api/v1/buyer/show-bid/${id}/${emailId}`);
  }

  AddBid(bid: Bid) {
    return this.http.post<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/place-bid`, bid);
  }

  UpdateBid(bid: Bid) {
    return this.http.put<Bid>(`${environment.apiUrl}e-auction/api/v1/buyer/update-bid/${bid.productId}/${bid.email}/${bid.bidAmount}`, bid);
  }
}
