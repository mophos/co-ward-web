import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getProvince() {
    const url = `${this.url}/v1/manager/report-all/list/province`;
    return this.http.get(url).toPromise();
  }

  getMinistryList() {
    const url = `${this.url}/v1/new-manager/hospital/ministry`;
    return this.http.get(url).toPromise();
  }

  getSubMinistryList() {
    const url = `${this.url}/v1/new-manager/hospital/sub-ministry`;
    return this.http.get(url).toPromise();
  }

}
