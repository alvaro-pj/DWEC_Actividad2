import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {

  productos: Product[] = []

  constructor(private productService: ProductService){
    this.productService.cargarProductos();
    this.productService.products$.subscribe(products => {
    this.productos = products;
      console.log('Prodcutos recibidos : ', this.productos)
    })
  }

  onEliminar(id: string) {
  console.log('Producto a eliminar:', id);
  // Aquí luego llamaremos al servicio
}
}
