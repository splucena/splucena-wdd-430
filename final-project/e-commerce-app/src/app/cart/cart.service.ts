import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public counter: number = 0;
  cartCounterChange = new Subject<number>();

  constructor() {}

  addToCart() {
    this.counter = this.counter + 1;
    this.cartCounterChange.next(this.counter);
  }

  clearCart() {
    return (this.counter = 0);
  }

  getCart() {
    return this.counter;
  }
}
