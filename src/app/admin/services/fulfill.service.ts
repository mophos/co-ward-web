import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FulfillService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(type) {
    const url = `${this.url}/v1/admin/fulfill?type=${type}`;
    return this.http.get(url).toPromise();
  }


}
