import { HttpInterceptor } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EAuctionHttpInterceptor } from './http.interceptor';

describe('HttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EAuctionHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptor = TestBed.inject(EAuctionHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
