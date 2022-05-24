import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
