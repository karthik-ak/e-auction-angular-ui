import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BuyerService } from 'src/app/services/buyer.service';
import { SellerService } from 'src/app/services/seller.service';
import { Bid } from 'src/app/model/bid.model';
import { Product } from 'src/app/model/product.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserInfo } from 'src/app/model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: UserInfo = new UserInfo;
  products: Array<Product> = [];
  productSelectControl = new FormControl(null, Validators.required);
  today = new Date();
  disableBidUpdate: boolean = true;

  categories: Category[] = [
    { name: 'Painting', id: 1 },
    { name: 'Sculptor', id: 2 },
    { name: 'Ornament', id: 3 }
  ];

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    longDescription: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    startingPrice: new FormControl('', Validators.required),
    bidEndDate: new FormControl('', Validators.required),
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    pin: new FormControl('', [Validators.pattern("^[0-9]{6,6}$"), Validators.minLength(6), Validators.maxLength(6)]),
    phone: new FormControl('', [Validators.pattern("^[0-9]{10,10}$"), Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });

  biddingForm = new FormGroup({
    productId: new FormControl(''),
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    pin: new FormControl('', [Validators.pattern("^[0-9]{6,6}$"), Validators.minLength(6), Validators.maxLength(6)]),
    phone: new FormControl('', [Validators.pattern("^[0-9]{10,10}$"), Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    bidAmount: new FormControl(),
    bidStatus: new FormControl(),
    comment: new FormControl(),
    createdAt: new FormControl()
  });

  displayedColumns: string[] = ['bidAmount', 'name', 'email', 'mobile'];
  dataSource = new MatTableDataSource<Bid>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private sellerService: SellerService,
    private buyerService: BuyerService,
    private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.getProducts();
    this.biddingForm.controls["email"].patchValue(this.user.email);
    this.biddingForm.controls["email"].disable();
    this.biddingForm.controls["firstName"].patchValue(this.user.firstName);
    this.biddingForm.controls["lastName"].patchValue(this.user.lastName);
    this.productForm.disable();
  }

  getProducts() {
    this.sellerService.GetProducts().subscribe(data => {
      this.products = data;
    },
      error => {
        throw error;
      });
  }

  getProduct() {
    this.sellerService.GetProduct(this.productSelectControl.value).subscribe(data => {
      this.productForm.reset(data);
      this.getProductBid();
      this.getProductBids();
    }, error => {
      throw error
    });
  }

  getProductBid() {
    this.Clear();
    this.disableBidUpdate = new Date(this.productForm.controls["bidEndDate"].value) < this.today;
    this.disableBidUpdate ? this.biddingForm.disable() : this.biddingForm.enable();
    this.biddingForm.controls["email"].disable();
    this.buyerService.GetBid(this.productSelectControl.value, this.user.email).subscribe(data => {
      this.biddingForm.disable()
      this.biddingForm.reset(data);

      if (!this.disableBidUpdate)
        this.disableBidUpdate = this.biddingForm.controls["bidStatus"]?.value == "Accepted" || this.biddingForm.controls["bidStatus"]?.value == "Rejected";
        
      this.disableBidUpdate ? this.biddingForm.controls["bidAmount"].disable() : this.biddingForm.controls["bidAmount"].enable();
    },
      error => {
        if (!error.ok && error.status != 404)
          throw error;
      });
  }

  getProductBids() {
    this.dataSource.data = [];
    this.buyerService.GetBids(this.productSelectControl.value).subscribe(data => {
      //data = data.filter(x => x.email == this.user.email);
      this.dataSource.data = data;
    },
      error => {
        if (!error.ok && error.status != 404)
          throw error;
      });
  }

  Save() {
    if (this.biddingForm.valid) {
      const bidFormValue = this.biddingForm.getRawValue();
      if (bidFormValue.productId) {
        this.buyerService.UpdateBid(bidFormValue).subscribe(data => {
          if (data) {
            this.getProductBid();
            this.getProductBids();
            alert("Bid details saved successfully!");
          }
        },
          error => {
            alert("Bid details save failed!");
            throw error;
          });
      }
      else {
        bidFormValue.productId = this.productForm.value.id;
        bidFormValue.createdAt = this.today;
        this.buyerService.AddBid(bidFormValue).subscribe(data => {
          if (data) {
            this.getProductBids();
            alert("Bid details saved successfully!");
          }
        },
          error => {
            alert("Bid details save failed!");
            throw error;
          });
      }
    }
  }

  Clear() {
    this.biddingForm.reset();
    this.biddingForm.controls["email"].patchValue(this.user.email);
    this.biddingForm.controls["email"].disable();
    this.biddingForm.controls["firstName"].patchValue(this.user.firstName);
    this.biddingForm.controls["lastName"].patchValue(this.user.lastName);
    this.biddingForm.controls["productId"].patchValue('');
  }
}

interface Category {
  name: string;
  id: number;
}