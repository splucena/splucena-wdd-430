import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../categories.model';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  private subscription: Subscription;
  searchTerm: string = '';

  constructor(
    private categoryService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subscription = this.categoryService.categoryChangeEvent.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }
  search(value: string) {
    this.searchTerm = value;
  }
  onNewCategory() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
