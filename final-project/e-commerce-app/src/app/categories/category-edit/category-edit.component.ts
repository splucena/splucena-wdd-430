import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../categories.model';
import { CategoryService } from '../categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  originalCategory: Category;
  category: Category;
  editMode: boolean = false;

  public categories: Category[] = [];
  private subscription: Subscription;

  constructor(
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

      this.originalCategory = this.categoryService.getCategory(id);

      if (!this.originalCategory) {
        return;
      }

      this.editMode = true;
      this.category = JSON.parse(JSON.stringify(this.originalCategory));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const category = new Category('', value.name, value.description);

    if (this.editMode) {
      // Update product
      this.categoryService.updateCategory(this.originalCategory, category);
    } else {
      this.categoryService.addCategory(category);
    }

    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['/categories']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
