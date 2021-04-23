import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getTitle() {
    const url = `${this.url}/v2/basic/title`;
    return this.http.get(url).toPromise();
  }

  getPosition() {
    const url = `${this.url}/v2/basic/position`;
    return this.http.get(url).toPromise();
  }

  async checkLaser(cid, firstName, lastName, birthDay, laser) {
    const url = `${this.url}/smh/laser`;
    return await this.http.post(url, {
      cid, firstName, lastName, birthDay, laser
    }).toPromise();
  }


  uploadUserSupplie(files: File, cid) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      if (files) {
        formData.append('files', files, cid + '.jpg');
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      // const token = sessionStorage.getItem('token');
      const url = `${this.url}/v2/register/upload-supplie`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  register(data) {
    const url = `${this.url}/v2/register`;
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

  getCid(cid) {
    const url = `${this.url}/v2/register/get-cid?cid=${cid}`;
    return this.http.get(url).toPromise();
  }

  getUsername(username) {
    const url = `${this.url}/v2/register/get-username?username=${username}`;
    return this.http.get(url).toPromise();
  }

  requestOTP(tel) {
    const url = `${this.url}/v2/register/req-otp`;
    return this.http.post(url, { tel }).toPromise();
  }

  verifyOTP(tel, otp, transactionId, vendor) {
    const url = `${this.url}/v2/register/verify-otp`;
    return this.http.post(url, { tel, otp, transactionId, vendor }).toPromise();
  }

}
