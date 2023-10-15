import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PaginatedProducts } from '../interfaces/paginated-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint = `${environment.api}/products`

  constructor( private http: HttpClient) {}

  backend(filters?: {page?: number}): Observable<PaginatedProducts> {
    let params = new HttpParams()

    if (filters?.page) {
      params = params.set('page', filters.page.toString())
    } 

    return this.http.get<PaginatedProducts>(`${this.endpoint}/backend`, {params});
  }

}
