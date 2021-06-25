import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product.model';

@Pipe({
  name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): any {
    let filteredProducts: Product[] = [];
    if (searchTerm && searchTerm.length > 0) {
      filteredProducts = products.filter((product: Product) =>
        product.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
    }

    if (filteredProducts.length < 1) {
      return products;
    }

    return filteredProducts;
  }
}
