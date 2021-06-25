import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  originalProduct: Product;
  product: Product;
  editMode: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalProduct = this.productService.getProduct(id);

      if (!this.originalProduct) {
        return;
      }

      this.editMode = true;
      this.product = JSON.parse(JSON.stringify(this.originalProduct));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const product = new Product(
      '',
      value.name,
      value.description,
      value.imageUrl,
      value.price,
      []
    );

    if (this.editMode) {
      // Update product
      this.productService.updateProduct(this.originalProduct, product);
    } else {
      this.productService.addProduct(product);
    }
  }
}
