import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestockService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRestock(limit, offset) {
    const url = `${this.url}/v1/admin/restock?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  createRestock() {
    const url = `${this.url}/v1/admin/restock/create`;
    return this.http.get(url).toPromise();
  }

}
