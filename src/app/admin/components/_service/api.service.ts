import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, RegisterUser } from '../_model/users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
  private readonly http = inject(HttpClient);
  private readonly API_URL1 : string = 'https://node-js-deploy-1.onrender.com/login';
  private readonly API_URL2 : string = 'https://node-js-deploy-1.onrender.com/newUser'

  public loginUser(loginUser : LoginUser ): Observable<LoginUser> {
    console.log("loginData", loginUser)
    return this.http.post<LoginUser>(`${this.API_URL1}`, loginUser);
  }

  public registerUser(registerUser : RegisterUser): Observable<RegisterUser>{
    console.log("registerData", registerUser);
    return this.http.post<RegisterUser>(`${this.API_URL2}`, registerUser);
  }
}