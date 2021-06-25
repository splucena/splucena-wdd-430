import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[] = [];
  productChangeEvent = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getProducts(): any {
    this.http
      .get<{ message: string; products: any }>('http://localhost:3000/products')
      .pipe(
        map((productData) => {
          return productData.products.map((product) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              imageUrl: product.imageUrl,
              price: product.price,
              category: product.category,
            };
          });
        })
      )
      .subscribe((transformedProduct) => {
        console.log(transformedProduct);
        this.products = transformedProduct;
        this.productChangeEvent.next([...this.products]);
      });
  }

  getProduct(id: string) {
    for (let p of this.products) {
      if (p.id === id) {
        return p;
      }
    }

    return null;
  }

  addProduct(product: Product) {
    if (!product) {
      return;
    }

    console.log(product);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; product: Product; id: string }>(
        'http://localhost:3000/products',
        product,
        { headers: headers }
      )
      .subscribe((responseData) => {
        product.id = responseData.id;
        this.products.push(product);
        this.productChangeEvent.next([...this.products]);
      });
  }

  updateProduct(originalProduct: Product, newProduct: Product) {
    if (!originalProduct || !newProduct) {
      return;
    }

    const pos = this.products.indexOf(originalProduct);

    newProduct.id = originalProduct.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/products/' + originalProduct.id, newProduct, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.products[pos] = newProduct;
        this.productChangeEvent.next([...this.products]);
      });
  }
}
