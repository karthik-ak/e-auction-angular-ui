import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

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

  Save(){
  }
}
