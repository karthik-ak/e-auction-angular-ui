import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DashboardComponent,
    AddProductsComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // FlexLayoutModule,
    // MatSidenavModule,
    // MatInputModule,
    // MatToolbarModule,
    // MatCardModule,
    // MatRadioModule,
    MatDatepickerModule,
    // MatIconModule,
    // MatListModule,
    // MatMenuModule
    MatPaginatorModule
  ]
})
export class SellerModule { }
