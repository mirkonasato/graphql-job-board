import { Injectable } from '@angular/core';
import {ACCESS_TOKEN_KEY, API_URL} from "../app.constant";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/login`, {
      email,
      password
    }, {headers: {'Content-Type': 'application/json'}})
      .pipe(catchError((err) => {
        alert(err.message);
        return err;
      }),
    tap(({token}) => localStorage.setItem(ACCESS_TOKEN_KEY, token))
  )
    ;
  }

   isLoggedIn(): boolean {
    return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
  }

   logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

}
