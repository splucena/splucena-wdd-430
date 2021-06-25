import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from './categories.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: Category[] = [];
  categoryChangeEvent = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  getCategories(): any {
    this.http
      .get<{ message: string; categories: any }>(
        'http://localhost:3000/categories'
      )
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              id: category.id,
              name: category.name,
              description: category.description,
            };
          });
        })
      )
      .subscribe((transformedCategory) => {
        this.categories = transformedCategory;
        this.categoryChangeEvent.next([...this.categories]);
      });
  }
}
