import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListProductsComponent } from './list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component:DashboardComponent       
      },
      {
        path: 'dashboard',
        component:DashboardComponent       
      },
      {
        path: 'addproducts',
        component:AddProductsComponent       
      },
      {
        path: 'listproducts',
        component:ListProductsComponent       
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
