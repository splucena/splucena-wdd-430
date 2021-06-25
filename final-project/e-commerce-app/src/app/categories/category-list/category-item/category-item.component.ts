import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../../categories.model';
import { CategoryService } from '../../categories.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  @Input('category') category: Category;
  categoryDelete: Category;
  id: string;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.categoryDelete = this.categoryService.getCategory(this.id);
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category);
    this.router.navigate(['categories']);
  }
}
