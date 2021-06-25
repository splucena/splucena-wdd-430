import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription: Subscription;
  searchTerm: string = '';

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.subscription = this.productService.productChangeEvent.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  search(value: string) {
    this.searchTerm = value;
  }

  addToCart(name: string, price: number) {
    this.cartService.addToCart(name, price);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
