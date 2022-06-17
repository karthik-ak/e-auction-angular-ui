import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class EAuctionHttpInterceptor implements HttpInterceptor {
  private bearerToken: string;
  constructor(private tokenStorage: TokenStorageService) {
    this.bearerToken = this.tokenStorage.getToken()!;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.bearerToken) {
      request = request.clone({
        withCredentials: true,
        setHeaders: { Authorization: `Bearer ${this.bearerToken}` }
      })
    }
    return next.handle(request);
  }
}
