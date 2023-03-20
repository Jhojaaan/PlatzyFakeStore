import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from '../interfaces/filters.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchEventService {
  public filters: Filters = {
    title: '',
    categoryId: 0,
    price_min: 0,
    price_max: 0,
    limit: 12,
    offset: 0,
  };
  private searchEvent = new BehaviorSubject<Filters>({});
  public searchEvent$ = this.searchEvent.asObservable();
  constructor() {}

  public search(filters: Filters): void {
    this.filters = { ...this.filters, ...filters };
    this.searchEvent.next(this.filters);
  }
}
