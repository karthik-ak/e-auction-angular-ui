import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: string[] = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4'];

    productForm = new FormGroup({
      productName: new FormControl(),
      shortDesc: new FormControl(),
      detailDesc: new FormControl(),
      category: new FormControl(),
      startingPrice: new FormControl(),
      bidEndDate: new FormControl()
    });

  constructor() { }

  ngOnInit(): void {
  }

}
