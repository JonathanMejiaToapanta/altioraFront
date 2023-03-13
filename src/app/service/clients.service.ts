import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(environment.apiUrl + '/getClients');
  }

  public saveClient(
    saveclient: ClientModel
  ): Promise<ClientModel> {
      return new Promise((resolve, reject) => {
          this.http
              .post<ClientModel>(
                  environment.apiUrl + '/insertClient', saveclient
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

  deleteClient(idCliente: String) {
    console.log(idCliente)
    return this.http.post(environment.apiUrl + '/deleteClient?idClient=' + idCliente, {});
  }
}
