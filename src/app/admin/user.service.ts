import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const url = `${this.url}/v1/admin/user`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const url = `${this.url}/v1/admin/user`;
    return this.http.post(url, data).toPromise();
  }

  update(data: any, id: any) {
    const url = `${this.url}/v1/admin/user/${id}`;
    return this.http.put(url, data).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v1/admin/user/${id}`;
    return this.http.delete(url).toPromise();
  }
}