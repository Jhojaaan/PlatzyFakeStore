import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Category } from 'src/app/feature/products/shared/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService) {}

  getCategories(): Observable<Category[]> {
    return this.httpService.doGet(`${environment.apiUrl}/categories`);
  }
}
