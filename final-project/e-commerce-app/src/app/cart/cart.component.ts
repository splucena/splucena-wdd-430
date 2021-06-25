import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public cart: Cart[] = [];
  private subscription: Subscription;
  public total: number = 0.0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCartContent();
    let subtotal = 0.0;
    let tempTotal = 0.0;
    for (let c of this.cart) {
      subtotal += c.price * c.quantity;
      tempTotal += subtotal;
    }
    this.total = tempTotal;

    this.subscription = this.cartService.cartContentChange.subscribe(
      (cart: Cart[]) => {
        this.cart = cart;
      }
    );
  }

  checkout() {
    this.router.navigate(['/checkout'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
