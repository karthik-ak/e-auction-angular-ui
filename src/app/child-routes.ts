import { Routes } from "@angular/router";
import { HomeComponent } from "./buyer/home/home.component";
import { LoginComponent } from "./login/login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AddProductsComponent } from "./seller/add-products/add-products.component";
import { DashboardComponent } from "./seller/dashboard/dashboard.component";
import { ListProductsComponent } from "./seller/list-products/list-products.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'seller',
    component: DashboardComponent,
    data: { icon: 'dashboard', text: 'Dashboard' },
    canActivate: ['CanActivateRouteGuard'],
    children: [
      {
        path: 'list-products',
        component: ListProductsComponent,
        data: { icon: 'dashboard', text: 'Dashboard' }
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
        data: { icon: 'dashboard', text: 'Dashboard' }
      }
    ]
  },
  {
    path: 'buyer',
    component: HomeComponent,
    data: { icon: 'dashboard', text: 'Dashboard' },
    canActivate: ['CanActivateRouteGuard'],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { icon: 'dashboard', text: 'Dashboard' }
      }
    ]
  }
];
