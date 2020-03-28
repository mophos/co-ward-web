import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(query = '', limit, offset) {
    const url = `${this.url}/v1/admin/user?query=${query}&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getListTotal(query = '') {
    const url = `${this.url}/v1/admin/user/total?query=${query}`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const _url = `${this.url}/v1/admin/user`;
    return this.http.post(_url, { data: data }).toPromise();
  }

  update(data: any, id: any) {
    const _url = `${this.url}/v1/admin/user/${id}`;
    return this.http.put(_url, { data: data }).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v1/admin/user/${id}`;
    return this.http.delete(url).toPromise();
  }
}