import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  counter: number;
  private subscription: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.counter = this.cartService.getCart();
    this.subscription = this.cartService.cartCounterChange.subscribe(
      (counter: number) => {
        this.counter = counter;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToCart() {
    this.router.navigate(['/cart'], { relativeTo: this.route });
  }

  goToCheckout() {
    this.router.navigate(['/checkout'], { relativeTo: this.route });
  }
}
