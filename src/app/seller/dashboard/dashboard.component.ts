import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

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

  displayedColumns: string[] = ['bidAmount', 'name', 'email', 'mobile'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
  }

  getProduct(){
    
  }
}

export interface PeriodicElement {
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
