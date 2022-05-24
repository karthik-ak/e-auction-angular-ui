import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
      data: { icon: 'dashboard', text: 'Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'buyer',
    loadChildren: () =>
      import('./buyer/buyer.module').then((m) => m.BuyerModule),
      data: { icon: 'dashboard', text: 'Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
      data: { icon: 'dashboard', text: 'Dashboard' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
