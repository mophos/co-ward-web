import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  doLogin(username: string, password: string) {
    const params = {
      username,
      password
    };
    const url = `${this.url}/login`;
    return this.http.post(url, params).toPromise();
  }

  getVersion() {
    const url = `${this.url}/version`;
    return this.http.get(url).toPromise();
  }

}
