import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/categories/categories.model';
import { CategoryService } from 'src/app/categories/categories.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  originalProduct: Product;
  product: Product;
  editMode: boolean = false;
  public categories: Category[] = [];
  private subscription: Subscription;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subscription = this.categoryService.categoryChangeEvent.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
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
      value.category
    );

    if (this.editMode) {
      // Update product
      this.productService.updateProduct(this.originalProduct, product);
    } else {
      this.productService.addProduct(product);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
