import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Product } from 'src/app/model/product.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserInfo } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  user: UserInfo = new UserInfo;
  displayedColumns: string[] = ['name', 'category', 'shortDescription', 'stratingPrice'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private sellerService: SellerService,
    private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.sellerService.GetProductsByEmail(this.user.email).subscribe(data => {
      this.dataSource.data = data;
    },
      error => {
        throw error;
      });
  }

}
