import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  doLogin(username: string, password: string) {
    const params = {
      username: username,
      password: password
    }
    const _url = `${this.url}/login`;
    return this.http.post(_url, params).toPromise();
  }

}
