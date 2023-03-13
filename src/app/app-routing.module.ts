import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SidenavComponent } from './panel/sidenav/sidenav.component';
import { ClientsComponent } from './panel/clients/clients.component';
import { ProductsComponent } from './panel/products/products.component';
import { OrdersComponent } from './panel/orders/orders.component';


export const routes: Routes =
    [
      {
        path: 'sidenav', component: SidenavComponent
      },
      { path: 'clients', component: ClientsComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'orders', component: OrdersComponent},
    ]
    ;

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
