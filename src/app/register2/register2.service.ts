
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Register2Service {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getTitle() {
    const url = `${this.url}/v2/basic/title`;
    return this.http.get(url).toPromise();
  }

  getPosition() {
    const url = `${this.url}/v2/basic/position`;
    return this.http.get(url).toPromise();
  }


  register2(data) {
    const url = `${this.url}/v2/register/2`;
    return this.http.post(url, { data }).toPromise();
  }

  getNodeDrugs(id) {
    const url = `${this.url}/v2/register/get-node-drugs?id=${id}`;
    return this.http.get(url).toPromise();
  }
  getNodeSupplies(id) {
    const url = `${this.url}/v2/register/get-node-supplies?id=${id}`;
    return this.http.get(url).toPromise();
  }

  requestOTP(tel) {
    const url = `${this.url}/v2/register/req-otp`;
    return this.http.post(url, { tel }).toPromise();
  }

  verifyOTP(refCode, otp) {
    const url = `${this.url}/v2/register/verify-otp`;
    return this.http.post(url, { refCode, otp }).toPromise();
  }

}
