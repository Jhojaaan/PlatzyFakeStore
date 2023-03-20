import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public doGet<T>(url: string, params?: any): Observable<T> {
    return this.httpClient.get<T>(url, { params });
  }

  public doPost<T, R>(url: string, body: T): Observable<R> {
    return this.httpClient.post<R>(url, body);
  }

}
