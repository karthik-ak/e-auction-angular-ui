import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  
  today = new Date();

  productForm = new FormGroup({
    productName: new FormControl(),
    shortDesc: new FormControl(),
    detailDesc: new FormControl(),
    category: new FormControl(),
    startingPrice: new FormControl(),
    bidEndDate: new FormControl()
  });

  categories: Category[] = [
    { name: 'Painting', id: 1 },
    { name: 'Sculptor', id: 2 },
    { name: 'Ornament', id: 3 }
  ];

  constructor() { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
  }

  Save() {
  }
}

interface Category {
  name: string;
  id: number;
}
