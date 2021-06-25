import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './categories.model';

@Pipe({
  name: 'categoriesFilter',
})
export class CategoriesFilterPipe implements PipeTransform {
  transform(products: Category[], searchTerm: string): any {
    let filteredProducts: Category[] = [];
    if (searchTerm && searchTerm.length > 0) {
      filteredProducts = products.filter((product: Category) =>
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
