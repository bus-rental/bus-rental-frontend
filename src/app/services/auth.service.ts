import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {JwtDto} from "../schemas/jwt-dto";
import {LoginDto} from "../schemas/login-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginDto): Observable<JwtDto> {
    return this.http.post<JwtDto>(`${this.apiUrl}/login`, credentials);
  }
}
