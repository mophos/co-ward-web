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
    const url = `${this.url}/v2/login`;
    return this.http.post(url, params).toPromise();
  }

  getVersion() {
    const url = `${this.url}/version`;
    return this.http.get(url).toPromise();
  }

  async getDemo() {
    const url = `${this.url}/demo`;
    return await this.http.get(url).toPromise();
  }

  getUsername(cid, phoneNumber) {
    const url = `${this.url}/v2/login/get-username?cid=${cid}&phoneNumber=${phoneNumber}`;
    return this.http.get(url).toPromise();
  }

  updatePassword(id, passwordNew) {
    const url = `${this.url}/v2/login/update-password`;
    return this.http.post(url, { id, passwordNew }).toPromise();
  }

  updatePassword2(id, cid, passwordNew) {
    const url = `${this.url}/v2/login/update-password2`;
    return this.http.post(url, { id, cid, passwordNew }).toPromise();
  }

  requisOtp(tel) {
    const url = `${this.url}/v2/login/requis-otp`;
    return this.http.post(url, {
      tel
    }).toPromise();
  }

  verifyOtp(tel, transactionId, otp, vendor) {
    const url = `${this.url}/v2/login/verify-otp`;
    return this.http.post(url, {
      tel, transactionId, otp
    }).toPromise();
  }
}
