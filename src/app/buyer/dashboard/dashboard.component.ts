import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BuyerService } from 'src/app/services/buyer.service';
import { SellerService } from 'src/app/services/seller.service';
import { Bid } from 'src/app/model/bid.model';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  products: Array<Product> = [];
  bids: Array<Bid> = [];
  productSelectControl = new FormControl(null, Validators.required);
  today = new Date();

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
    createdAt: new FormControl()
  });

  displayedColumns: string[] = ['bidAmount', 'name', 'email', 'mobile'];
  dataSource = new MatTableDataSource<Bid>(this.bids);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private sellerService: SellerService,
    private buyerService: BuyerService) { }

  ngOnInit(): void {
    this.today.setDate(this.today.getDate() + 1);
    this.getProducts();
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
    }, error => { throw error });
    this.getProductBids();
  }

  getProductBids() {
    this.buyerService.GetBids(this.productSelectControl.value).subscribe(data => {
      this.bids = data;
    },
      error => {
        if (!error.ok && error.status != 404)
          throw error;
      });
  }

  Save() {
    debugger;
    if (this.biddingForm.valid) {
      if (this.biddingForm.value.productId) {
        this.buyerService.UpdateBid(this.biddingForm.value).subscribe(data => {
          if (data) {
            //this.getProducts();
            alert("Bid details saved successfully!");
          }
        },
          error => {
            alert("Bid details save failed!");
            throw error;
          });
      }
      else {
        this.biddingForm.controls["productId"].patchValue(this.productForm.value.id);
        this.biddingForm.controls["createdAt"].patchValue(this.today);
        this.buyerService.AddBid(this.biddingForm.value).subscribe(data => {
          if (data) {
            //this.getProducts();
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
  }
}

interface Category {
  name: string;
  id: number;
}

interface PeriodicElement {
  bidAmount: number;
  name: string;
  email: string;
  mobile: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { bidAmount: 100, name: 'Ram', email: "ram@hotmail.com", mobile: 985632141 },
  { bidAmount: 200, name: 'Yogesh', email: "yogesh@gmail.com", mobile: 985632142 },
  { bidAmount: 300, name: 'Karthik', email: "karthik@outlook.com", mobile: 985632143 },
  { bidAmount: 400, name: 'Guru', email: "guru@yahoo.com", mobile: 985632144 },
  { bidAmount: 500, name: 'Venkat', email: "venkat@gmail.com", mobile: 985632145 },
  { bidAmount: 600, name: 'Rajesh', email: "rajesh@yahoo.co.in", mobile: 985632146 },
  { bidAmount: 700, name: 'Srinisha', email: "srinisha@gmail.com", mobile: 985632147 }
];
