import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const url = `${this.url}/v1/admin/supplies`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const url = `${this.url}/v1/admin/supplies`;
    return this.http.post(url, data).toPromise();
  }

  update(data: any, id: any) {
    const url = `${this.url}/v1/admin/supplies/${id}`;
    return this.http.put(url, data).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v1/admin/supplies/${id}`;
    return this.http.delete(url).toPromise();
  }
}