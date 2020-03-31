import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getTitle() {
    const url = `${this.url}/basic/title`;
    return this.http.get(url).toPromise();
  }

  getPosition() {
    const url = `${this.url}/basic/position`;
    return this.http.get(url).toPromise();
  }

  upload(files: File, cid) {
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
      const url = `${this.url}/register/upload`;
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }

  saveUser(data) {
    const url = `${this.url}/register`;
    return this.http.post(url, { data }).toPromise();
  }

}
