import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getMinistryList() {
    const url = `${this.url}/v1/admin/hospital/ministry`;
    return this.http.get(url).toPromise();
  }

  getSubMinistryList() {
    const url = `${this.url}/v1/admin/hospital/sub-ministry`;
    return this.http.get(url).toPromise();
  }

}
