import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Category } from 'src/app/feature/products/shared/interfaces/category.interface';
import { SearchEventService } from '../../services/search-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  public rangeValues: number[] = [];
  public filtersForm: FormGroup = this.fb.group({
    priceRange: [
      [
        this.searchService.filters.price_min,
        this.searchService.filters.price_max,
      ],
    ],
  });
  public categories: Category[] = [];
  public selectedCategory: number = this.searchService.filters.categoryId || 0;
  constructor(
    private readonly fb: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly searchService: SearchEventService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
    });
  }

  public onPriceChange(): void {
    if (
      this.filtersForm.value.priceRange[1] > 0 &&
      this.filtersForm.value.priceRange[0] === 0
    ) {
      this.filtersForm.patchValue({
        priceRange: [1, this.filtersForm.value.priceRange[1]],
      });
    } else if (this.filtersForm.value.priceRange[1] === 0) {
      this.filtersForm.patchValue({
        priceRange: [0, this.filtersForm.value.priceRange[1]],
      });
    }
    this.filter();
  }

  public onCategoryChange(id: number): void {
    this.selectedCategory = id;
    this.filter();
  }

  public showDeleteFilter(): boolean {
    return (
      this.filtersForm.value.priceRange[0] > 0 ||
      this.filtersForm.value.priceRange[1] > 0 ||
      this.selectedCategory !== 0
    );
  }

  public deleteFilters(): void {
    this.filtersForm.patchValue({
      priceRange: [0, 0],
    });
    this.selectedCategory = 0;
    this.filter();
  }

  private filter(): void {
    if (this.router.url !== '/products/list') {
      this.router.navigate(['/products/list']);
    }
    this.searchService.search({
      price_min: this.filtersForm.value.priceRange[0],
      price_max: this.filtersForm.value.priceRange[1],
      categoryId: this.selectedCategory,
    });
  }
}
