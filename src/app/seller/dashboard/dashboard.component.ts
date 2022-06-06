import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product.model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  products: Array<Product> = [];
  productSelectControl = new FormControl(null, Validators.required);
  today = new Date();

  categories: Category[] = [
    { name: 'Painting', id: 1 },
    { name: 'Sculptor', id: 2 },
    { name: 'Ornament', id: 3 }
  ];

  productForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    summary: new FormControl(),
    category: new FormControl(),
    price: new FormControl(),
    bidEndDate: new FormControl('06/06/2022')
  });

  displayedColumns: string[] = ['bidAmount', 'name', 'email', 'mobile', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
    this.getProducts();
    this.today.setDate(this.today.getDate() + 1);
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
  }

  Delete() {

  }

  Update() {

  }

  Accept() {

  }

  Reject() {

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
