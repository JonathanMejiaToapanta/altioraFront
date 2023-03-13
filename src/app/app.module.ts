import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './panel/products/products.component';
import { SidenavComponent } from './panel/sidenav/sidenav.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ClientsComponent } from './panel/clients/clients.component';
import { OrdersComponent } from './panel/orders/orders.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SidenavComponent,
    ClientsComponent,
    OrdersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
