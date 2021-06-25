import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public cart: Cart[] = [];
  private subscription: Subscription;
  public total: number = 0.0;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

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

  shopAgain() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  completeCheckout() {
    this.cartService.clearCart();
  }
}
