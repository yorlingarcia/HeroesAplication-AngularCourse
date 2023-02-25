import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}
  getHeores() {
    return this.http.get('http://localhost:3000/heroes');
  }
}
