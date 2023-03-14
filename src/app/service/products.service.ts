import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.apiUrl + '/getProducts');
  }

  public saveProduct(
    saveproduct: ProductModel
  ): Promise<ProductModel> {
      return new Promise((resolve, reject) => {
          this.http
              .post<ProductModel>(
                  environment.apiUrl + '/insertProduct', saveproduct
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

  findProducts(id: string, cant: number) {
    return this.http.get(environment.apiUrl + '/findProduct?id='+id +"&can="+cant);
  }
}
