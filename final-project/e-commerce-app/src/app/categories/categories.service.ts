import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from './categories.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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

  getCategory(id: string) {
    for (let p of this.categories) {
      if (p.id === id) {
        return p;
      }
    }

    return null;
  }

  addCategory(category: Category) {
    if (!category) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{ message: string; category: Category; id: string }>(
        'http://localhost:3000/categories',
        category,
        { headers: headers }
      )
      .subscribe((responseData) => {
        category.id = responseData.id;
        this.categories.push(category);
        this.categoryChangeEvent.next([...this.categories]);
      });
  }

  updateCategory(originalCategory: Category, newCategory: Category) {
    if (!originalCategory || !newCategory) {
      return;
    }

    const pos = this.categories.indexOf(originalCategory);

    newCategory.id = originalCategory.id;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'http://localhost:3000/categories/' + originalCategory.id,
        newCategory,
        {
          headers: headers,
        }
      )
      .subscribe((response: Response) => {
        this.categories[pos] = newCategory;
        this.categoryChangeEvent.next([...this.categories]);
      });
  }

  deleteCategory(category: Category) {
    if (!category) {
      return;
    }

    const pos = this.categories.indexOf(category);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/categories/' + category.id)
      .subscribe((response: Response) => {
        this.categories.splice(pos, 1);
        this.categoryChangeEvent.next([...this.categories]);
      });
  }
}
