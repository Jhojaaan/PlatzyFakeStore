import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { SearchEventService } from 'src/app/shared/services/search-event.service';

export interface Search {
  search: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public searchForm = this.fb.group({
    search: [''],
  });
  public showSideBar = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchService: SearchEventService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.listenToSearchForm();
  }

  private listenToSearchForm(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: ({ search }) => {
          if (this.router.url !== '/products/list') {
            this.router.navigate(['/products/list']);
          }
          this.searchService.search({
            title: search || '',
            offset: 0,
          });
        },
      });
  }
}
