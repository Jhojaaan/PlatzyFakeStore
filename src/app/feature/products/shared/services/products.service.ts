import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';
import { ProductsParams } from '../interfaces/products-params.interface';

@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}

  public getProducts(params: ProductsParams): Observable<Product[]> {
    return this.httpService.doGet(`${environment.apiUrl}/products`, params);
  }

  public getProductDetail(id: number): Observable<Product> {
    return this.httpService.doGet(`${environment.apiUrl}/products/${id}`);
  }
}
