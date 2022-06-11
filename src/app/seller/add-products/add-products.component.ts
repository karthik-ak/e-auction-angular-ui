import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/model/user';
import { SellerService } from 'src/app/services/seller.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  user: UserInfo = new UserInfo;
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

  constructor(private sellerService: SellerService,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.user = this.tokenStorageService.getUser();
    this.productForm.controls["email"].patchValue(this.user.email);
    this.productForm.controls["firstName"].patchValue(this.user.firstName);
    this.productForm.controls["lastName"].patchValue(this.user.lastName);
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
    this.productForm.controls["email"].patchValue(this.user.email);
    this.productForm.controls["firstName"].patchValue(this.user.firstName);
    this.productForm.controls["lastName"].patchValue(this.user.lastName);
  }
}

interface Category {
  name: string;
  id: number;
}
