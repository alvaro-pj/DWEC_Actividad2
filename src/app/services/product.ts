import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product{
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private url ='https://api.npoint.io/1dee63ad8437c82b24fe'

  private productSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productSubject.asObservable();

  private productsOriginales: Product[] = [];

  constructor (private http: HttpClient){
  }

  cargarProductos() {
  this.http.get<Product[]>(this.url).subscribe({
    next: (products) => {
      this.productsOriginales = products;
      this.productSubject.next(products);
    },
    error: (err) => console.error('Error al cargar productos:', err)
  });
}



  agregarProducto(datos: any) {

    const nuevoProducto: Product = {
      _id: crypto.randomUUID(),   // Generamos un ID único (trampilla)
      name: datos.name,
      description: datos.description,
      price: datos.price,
      category: datos.category,
      image: datos.image,
      active: datos.active
    };

    // Añadimos el nuevo producto al principio de la lista
    this.productsOriginales = [nuevoProducto, ...this.productsOriginales];

    // Emitimos la nueva lista para que Angular actualice la vista
    this.productSubject.next(this.productsOriginales);
}

  eliminarProducto(id: string) {
    this.productsOriginales = this.productsOriginales.filter(p => p._id !== id);
    this.productSubject.next(this.productsOriginales);
  }


  filtrarPorNombre(nombre: string) {
  const filtrados = this.productsOriginales.filter(p =>
    p.name.toLowerCase().includes(nombre.toLowerCase())
  );
  this.productSubject.next(filtrados);
}

filtrarPorCategoria(categoria: string) {
  const filtrados = this.productsOriginales.filter(p =>
    p.category.toLowerCase().includes(categoria.toLowerCase())
  );
  this.productSubject.next(filtrados);
}

filtrarPorActivo(soloActivos: boolean) {
  const filtrados = soloActivos
    ? this.productsOriginales.filter(p => p.active)
    : this.productsOriginales;

  this.productSubject.next(filtrados);
}

}
