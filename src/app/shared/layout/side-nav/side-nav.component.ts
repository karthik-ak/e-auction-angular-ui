import { Component, Input, OnInit } from '@angular/core';
import { appRoutes } from '../../../child-routes';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isSeller: string = localStorage.getItem('isSeller')!;
  isBuyer: string = localStorage.getItem('isBuyer')!;
  showBuyerMenu: boolean = this.isBuyer.toLowerCase() == 'true';
  showSellerMenu: boolean = this.isSeller.toLowerCase() == 'true';
  routes = appRoutes;
  constructor() { }

  ngOnInit(): void {
    this.isSeller = localStorage.getItem('isSeller')!;
    this.isBuyer = localStorage.getItem('isBuyer')!;
    this.showBuyerMenu = this.isBuyer.toLowerCase() == 'true';
    this.showSellerMenu = this.isSeller.toLowerCase() == 'true';
  }

}
