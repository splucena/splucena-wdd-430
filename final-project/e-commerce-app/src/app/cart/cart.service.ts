import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public counter: number = 0;
  cartCounterChange = new Subject<number>();
  cartContentChange = new Subject<Cart[]>();
  private cart: Cart[] = [];
  private maxCartId: number;

  constructor() {
    this.maxCartId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    this.cart.forEach((e) => {
      let currentId = +e.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getInCart(name: string) {
    for (let c of this.cart) {
      if (c.productName === name) {
        return c;
      }
    }

    return null;
  }

  addToCart(name: string, price: number) {
    console.log(name, price);

    // Check if product is already in the cart
    let checkCart = this.getInCart(name);

    if (checkCart) {
      // Update quantity
      checkCart.quantity = checkCart.quantity + 1;
    } else {
      // Add to cart
      const order = new Cart(this.maxCartId, name, 1, price);
      this.cart.push(order);
      this.counter = this.counter + 1;
    }

    this.cartContentChange.next([...this.cart]);
    this.cartCounterChange.next(this.counter);
  }

  clearCart() {
    this.counter = 0;
    this.cartCounterChange.next(this.counter);
  }

  getCart() {
    return this.counter;
  }
}
