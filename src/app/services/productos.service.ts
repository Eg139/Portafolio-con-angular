import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){
    return new Promise((resolve, reject) => {

      this.http.get('https://proyecto-angular-994fc.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      this.productos = resp;
      this.cargando = false;
      resolve();
    });
  });
  }

  getProducto(id: string){
    return this.http.get(`https://proyecto-angular-994fc.firebaseio.com/productos/${ id }.json`);

  }
  buscarProducto(termino: string){

    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then( () => {
      //ejecutar despues de tener los productos
      //Aplicar filtro
      this.filtrarProductos(termino);
      });
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string){
  this.productosFiltrado = [];
  termino = termino.toLocaleLowerCase();

  this.productos.forEach( prod => {
    const tituloLower = prod.titulo.toLocaleLowerCase();
    if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
      this.productosFiltrado.push(prod);
    }
  });
  }
}
