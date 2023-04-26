import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode  } from '@angular/common/http';

// implementamos el operador retry
// agregamos el operador map
import { retry, catchError, map   } from 'rxjs/operators';
import { throwError } from 'rxjs';

// se importa CreateProductDTO, para la API-Create
// se importa UpdateProductDTO, para la API-Update
import { Product, CreateProductDTO, UpdateProductDTO  } from './../models/product.model';

// vamos a hacer uso de ese ambiente
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  // limit y offset, son opcionales
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();

    // utilizacion de parametros de forma dinamica
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Product[]>(this.apiUrl, { params })
    .pipe(
      retry(3), // hace una trasformacion de la peticion. E implementamos el operador retry. El parametro retry nos dice cuantas veces podriamos rintentar esta peticion
      map(products  => products.map(item => { // se empieza hacer la trasformacion
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => ("Algo esta fallando en el server"));
        }
        if (error.status === HttpStatusCode.NotFound) {
           return throwError(() => ("El producto no existe"));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => ("No estas permitido"));
        }
        return throwError(() => ("Ups algo salio mal"));
      })
    )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }
}
