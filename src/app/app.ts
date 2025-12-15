import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Product, ProductService } from './services/product';
import { ProductsList } from './products-list/products-list';
import { ProductFormComponent } from './product-form/product-form';
import { ProductFilter } from './product-filter/product-filter';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ProductsList, ProductFormComponent, ProductFilter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion-productos');

    constructor (private productService: ProductService){

  }


  onProductoCreado(producto: any) {
    this.productService.agregarProducto(producto);
  }
}
