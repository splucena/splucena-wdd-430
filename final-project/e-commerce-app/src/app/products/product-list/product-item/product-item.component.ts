import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: Product;
  public defaultImage: string =
    'https://material.angular.io/assets/img/examples/shiba2.jpg';
  public defaultAvatar: string =
    'https://material.angular.io/assets/img/examples/shiba1.jpg';
  productDelete: Product;
  id: string;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productDelete = this.productService.getProduct(this.id);
    });
  }

  deleteProduct() {
    //this.productService.deleteProduct(id);
    this.productService.deleteProduct(this.product);
    this.router.navigate(['/products']);
  }
}
