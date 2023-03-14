import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  addProduct: Boolean = false;
  listProduct: Boolean = false;
  product: any = [];
  code: string = '';
  name: string = '';
  id: string = '';
  price: number = 0;

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  viewProduct() {
    this.addProduct = true;
    this.listProduct = false;
  }

  listProducts() {
    this.listProduct = true;
    this.addProduct = false;
    this.productService.getProducts().subscribe(data => {
      this.product.push(data);
    });
  }

  saveProduct(){
    if (this.code != '' && this.name != '' && this.price > 0) {
      const prod: ProductModel = {
        id: 'e0219786-2a49-451c-89b2-7546a8af45ea',
        code: this.code,
        name: this.name,
        priceUnit: this.price,
        stock: 10
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
          this.productService.saveProduct(prod).then((result) => {
            Swal.fire('Producto Guardado');
            this.product = [];
            this.listProducts();
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
    this.code = '';
    this.name = '';
    this.price = 0;
    this.addProduct = false
  }
}
