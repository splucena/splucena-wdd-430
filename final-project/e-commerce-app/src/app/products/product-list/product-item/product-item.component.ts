import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product.model';

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
  constructor() {}

  ngOnInit(): void {}
}
