import { Component, OnInit } from '@angular/core';
import { OrderInterface } from 'src/app/models/order.models';
import { ClientsService } from 'src/app/service/clients.service';
import { OrdersService } from 'src/app/service/orders.service';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  productSelect: string = '';
  clientSelect: string = '';
  product: any = [];
  client: any = [];
  ifProductSelect: boolean = false;
  idProduct: string = '';
  productsSelected: any = [];
  saveOrders: boolean = false;
  listOrders: boolean = false;
  ifclienSelect: boolean = false;
  idClient: string = '';
  ordersClient: any = [];

  constructor(
    private productService: ProductsService,
    private serviceClient: ClientsService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.listProducts();
    this.listClients();
  }

  listProducts() {
    this.productService.getProducts().subscribe(data => {
      this.product.push(data);
    });
  }

  listClients() {
    this.serviceClient.getClients().subscribe(data => {
      this.client.push(data);
    });
  }

  viewsave() {
    this.saveOrders = true
    this.listOrders = false;
  }

  listor() {
    this.saveOrders = false
    this.listOrders = true;
  }

  onProduct(value: any){
    if (value != 'Seleccionar') {
      this.ifProductSelect = true;
      this.idProduct = value;
    } else {
      this.ifProductSelect = false;
      this.idProduct = '';
    }
  }

  addProduct() {
    this.productService.findProducts(this.idProduct).subscribe(data => {
      this.productsSelected.push(data)
    })
  }

  deleteProduct(i: number) {
    this.productsSelected.splice(i,1)
  }

  saveOrder() {
    if (this.clientSelect != '' && this.productsSelected.length > 0) {
      Swal.fire({
        text: '¿Desea guardar los datos?',
        showCancelButton: true,
        cancelButtonColor: 'rgba(255, 0, 0, 0.637)',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#00687d',
        confirmButtonText: 'Guardar'
      }).then((result) => {
        if (result.value) {
          this.productsSelected.forEach((element: any) => {
            const order: OrderInterface = {
              id: 'e0219786-2a49-451c-89b2-7546a8af45ea',
              dateCreated: new Date(),
              idProduct: element[0].id,
              idClient: this.clientSelect
            }
            this.orderService.saveOrder(order).then((result) => {
              Swal.fire('Orden Guardada');
              this.restart();
            }).catch((error) => {
              Swal.fire('Volver a intentarlo');
            })
          });
        }else{
          //this.restart();
        }
      });
    } else {
      Swal.fire("Seleccionar un cliente y agregar productos")
    }
  }

  restart() {
    this.productsSelected = [];
    this.clientSelect = '';
    this.idProduct = '';
    this.ifProductSelect = false;
    this.productSelect = '';
    this.saveOrders = false
  }

  onClient(value: any){
    if (value != 'Seleccionar') {
      this.ifclienSelect = true;
      this.idClient = value;
    } else {
      this.ifclienSelect = false;
      this.idClient = '';
    }
  }

  searOrders() {
    this.ordersClient.splice(0, this.ordersClient.length)
    this.orderService.findOrders(this.idClient).subscribe(data => {
      this.ordersClient.push(data)
    })
  }
}
