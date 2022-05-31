import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  declarations:
    [
      PageNotFoundComponent,
      LayoutComponent,
      SideNavComponent,
      TopNavComponent
    ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    PageNotFoundComponent,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    TopNavComponent
  ]
})
export class SharedModule { }
