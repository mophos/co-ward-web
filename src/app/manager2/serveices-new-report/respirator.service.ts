import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespiratorService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRespirator () {
    const url = `${this.url}/`;
    return this.http.get(url).toPromise();
  }

  exportExcelRespirator  () {
    const url = `${this.url}/v1/new-manager/export/respirator `;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
