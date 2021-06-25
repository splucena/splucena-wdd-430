import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private productService: ProductsService) {}

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
