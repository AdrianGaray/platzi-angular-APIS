import { Injectable } from '@angular/core';

// HttpClient para las peticion
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model'; // importamos el DTO

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/users`;

// inyeccion de dependencia
  constructor(
    private http: HttpClient
    ) { }

    create(dto: CreateUserDTO) {
      return this.http.post<User>(this.apiUrl, dto);
    }

    getAll() {
      return this.http.get<User[]>(this.apiUrl);
    }
}
