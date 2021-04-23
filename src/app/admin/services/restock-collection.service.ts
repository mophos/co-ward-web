import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestockCollectionService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRestockCollection(limit, offset) {
    const url = `${this.url}/v2/admin/restock-collection?&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }
}
