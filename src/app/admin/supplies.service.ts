import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const _url = `${this.url}/v1/admin/supplies`;
    return this.http.get(_url).toPromise();
  }

  save(data: any) {
    const _url = `${this.url}/v1/admin/supplies`;
    return this.http.post(_url, data).toPromise();
  }

  update(data: any, id: any) {
    const _url = `${this.url}/v1/admin/supplies/${id}`;
    return this.http.put(_url, data).toPromise();
  }

  remove(id: any) {
    const _url = `${this.url}/v1/admin/supplies/${id}`;
    return this.http.delete(_url).toPromise();
  }
}