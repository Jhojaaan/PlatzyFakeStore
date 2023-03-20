import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Filters } from 'src/app/shared/interfaces/filters.interface';
import { SearchEventService } from 'src/app/shared/services/search-event.service';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsParams } from '../../shared/interfaces/products-params.interface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  public products: Product[] = [];
  public paginator = {
    rows: this.searchService.filters.limit,
    totalRecords: 200,
    rowsPerPageOptions: [12, 24, 36],
    first: this.searchService.filters.offset,
  };



  private destroy$: Subject<void> = new Subject();

  constructor(
    private readonly productsService: ProductsService,
    private readonly searchService: SearchEventService
  ) {}

  ngOnInit(): void {
    this.listenToSearchEvent();
  }

  public paginate(event: any): void {
    // this.paginator.first = event.first;
    // this.paginator.rows = event.rows;
    this.paginator = {
      ...this.paginator,
      ...event,
    };
    // this.getProducts(this.getParams());
    this.searchService.search(this.getParams());
  }

  private getProducts(params: ProductsParams): void {
    this.productsService.getProducts(params).subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
    });
  }

  private getParams(): ProductsParams {
    return {
      limit: this.paginator.rows || 0,
      offset: this.paginator.first || 0,
    };
  }

  private listenToSearchEvent(): void {
    this.searchService.searchEvent$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (filters: Filters) => {
        this.paginator.first = filters.offset || 0;
        this.getProducts({ ...this.getParams(), ...filters });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
