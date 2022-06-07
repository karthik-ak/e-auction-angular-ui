import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {

  today = new Date();
  categories: Category[] = [
    { name: 'Painting', id: 1 },
    { name: 'Sculptor', id: 2 },
    { name: 'Ornament', id: 3 }
  ];

  productForm = new FormGroup({
    id: new FormControl(''),
    productName: new FormControl(),
    shortDescription: new FormControl(),
    longDescription: new FormControl(),
    category: new FormControl(),
    startingPrice: new FormControl(),
    bidEndDate: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    pin: new FormControl('', [Validators.pattern("^[0-9]{6,6}$"), Validators.minLength(6), Validators.maxLength(6)]),
    phone: new FormControl('', [Validators.pattern("^[0-9]{10,10}$"), Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
  }

  Save() {
    if (this.productForm.valid) {
      this.sellerService.AddProduct(this.productForm.value).subscribe(data => {
        if (data) {
          this.productForm.reset();
          alert("Product added successfully!");
        }
      },
        error => {
          //this.productForm.reset();
          alert(`Product adding failed!`);
          throw error;
        },
      );
    }
  }

  Clear() {
    this.productForm.reset();
  }
}

interface Category {
  name: string;
  id: number;
}
