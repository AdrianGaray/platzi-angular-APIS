import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// agregamos el operador tab, nos deja correr un proceso sin tener q modificar la respuesta que nos envia el observable
import { tap  } from 'rxjs/operators';


@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now(); // evalue el tiempo inicial
    return next
    .handle(request)
    .pipe(
      tap(() => {
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
