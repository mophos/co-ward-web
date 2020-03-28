import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const _url = `${this.url}/v1/admin/user`;
    return this.http.get(_url).toPromise();
  }

  save(data: any) {
    const _url = `${this.url}/v1/admin/user`;
    return this.http.post(_url, data).toPromise();
  }

  update(data: any, id: any) {
    const _url = `${this.url}/v1/admin/user/${id}`;
    return this.http.put(_url, data).toPromise();
  }

  remove(id: any) {
    const _url = `${this.url}/v1/admin/user/${id}`;
    return this.http.delete(_url).toPromise();
  }
}