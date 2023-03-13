import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/service/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  addClient: Boolean = false;
  listClient: Boolean = false;
  client: any = [];
  name: string = '';
  last: string = '';
  id: string = '';
  ifEdit = false;

  constructor(
    private serviceClient: ClientsService
  ) {
  }

  ngOnInit() {
  }

  viewClient() {
    this.addClient = true;
    this.listClient = false;
  }

  listClients() {
    this.listClient = true;
    this.addClient = false;
    this.serviceClient.getClients().subscribe(data => {
      this.client.push(data);
    });
  }

  saveClient(){
    if (this.name != '' && this.last != '') {
      const cli: ClientModel = {
        idClient: '',
        name: this.name,
        lastName: this.last
      }
      Swal.fire({
        text: '¿Desea guardar los datos?',
        showCancelButton: true,
        cancelButtonColor: 'rgba(255, 0, 0, 0.637)',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#00687d',
        confirmButtonText: 'Guardar'
      }).then((result) => {
        if (result.value) {
          this.serviceClient.saveClient(cli).then((result) => {
            Swal.fire('Cliente Guardado');
            this.client = [];
            this.listClients();
            this.cancelar();
          }).catch((error) => {
            Swal.fire('Volver a intentarlo');
          })
        }else{
          this.cancelar()
        }
      });
    }else{
      Swal.fire("Ingrese valores validos")
    }
  }

  cancelar() {
    this.last = '';
    this.name = '';
    this.addClient = false
  }

  delete(id: string){
    Swal.fire({
      text: '¿Desea eliminar el cliente?',
      showCancelButton: true,
      cancelButtonColor: 'rgba(255, 0, 0, 0.637)',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00687d',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
        this.serviceClient.deleteClient(id).subscribe(() => {
          Swal.fire('Cliente Eliminado');
          this.client = [];
          this.listClients();
        }, () => {
          Swal.fire('Volver a intentarlo');
        })
      }
    });
  }

  editClient(data: ClientModel) {
    this.id = data.idClient;
    this.name = data.name;
    this.last = data.lastName;
    this.ifEdit = true;
    this.addClient = true;
    this.listClient = false;
  }

  updateClient(){
    if (this.name != '' && this.last != '') {
      const cli: ClientModel = {
        idClient: this.id,
        name: this.name,
        lastName: this.last
      }
      Swal.fire({
        text: '¿Desea guardar los cambios?',
        showCancelButton: true,
        cancelButtonColor: 'rgba(255, 0, 0, 0.637)',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#00687d',
        confirmButtonText: 'Guardar'
      }).then((result) => {
        if (result.value) {
          this.serviceClient.saveClient(cli).then((result) => {
            Swal.fire('Cambios Guardados');
            this.client = [];
            this.listClients();
            this.cancelarcambios();
          }).catch((error) => {
            Swal.fire('Volver a intentarlo');
          })
        }else{
          this.cancelar()
        }
      });
    }else{
      Swal.fire("Ingrese valores validos")
    }
  }

  cancelarcambios(){
    this.cancelar();
    this.id = '';
    this.ifEdit = false;
  }

}
