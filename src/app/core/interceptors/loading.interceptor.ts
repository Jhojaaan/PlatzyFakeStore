import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalPeticiones = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.totalPeticiones++;
    this.mostrarCargando();
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.totalPeticiones--;
            if (this.totalPeticiones === 0) {
              this.ocultarCargando();
            }
          }
        },
        error: (error) => {
          this.totalPeticiones--;
          if (this.totalPeticiones === 0) {
            this.ocultarCargando();
          }
        },
      })
    );
  }

  mostrarCargando() {
    this.spinnerService.show();
  }

  ocultarCargando() {
    this.spinnerService.hide();
  }
}
