import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) {}

  verificaAutorizacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return of(true);
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    this._auth = undefined;
    console.log(localStorage.getItem('token'));
  }
}
