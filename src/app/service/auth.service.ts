import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = environment.baseUrl.replace(/\/+$/, '') + '/';

const login_API = AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(identifier: string, password: string, companyId?: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'subadmin-auth/login',
      {
        ...(companyId ? {companyId} : {}),
        identifier: identifier,
        password: password,
      },
      httpOptions
    );
  }

  Companylogin(payload:
    { email: string; password: string }): Observable<any> {
    return this.http.post(
      login_API + 'company/login',
      payload,
      httpOptions
    );
  }




}
