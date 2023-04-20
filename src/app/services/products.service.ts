import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

// se importa CreateProductDTO, para la API-Create
// se importa UpdateProductDTO, para la API-Update
import { Product, CreateProductDTO, UpdateProductDTO  } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

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
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
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
  }
}
