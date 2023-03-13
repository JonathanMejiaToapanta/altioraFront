import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderInterface } from '../models/order.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  public saveOrder(
    saveOrder: OrderInterface
  ): Promise<OrderInterface> {
      return new Promise((resolve, reject) => {
          this.http
              .post<OrderInterface>(
                  environment.apiUrl + '/saveOrdersN', saveOrder
              )
              .subscribe(
                  (response) => {
                      resolve(response);
                  },
                  (error) => {
                      reject(error);
                  }
              );
      });
  }

  findOrders(id: string) {
    return this.http.get(environment.apiUrl + '/getOrderByClient?idClient='+id);
  }

}
