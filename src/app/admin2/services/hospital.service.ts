import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(query = '', limit, offset) {
    const url = `${this.url}/v1/admin/hospital?query=${query}&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getTypeList() {
    const url = `${this.url}/v1/admin/hospital/type`;
    return this.http.get(url).toPromise();
  }

  getMinistryTypeList() {
    const url = `${this.url}/v1/admin/hospital/ministry-type`;
    return this.http.get(url).toPromise();
  }

  getMinistryList() {
    const url = `${this.url}/v1/admin/hospital/ministry`;
    return this.http.get(url).toPromise();
  }

  getSubMinistryList() {
    const url = `${this.url}/v1/admin/hospital/sub-ministry`;
    return this.http.get(url).toPromise();
  }

  getListTotal(query = '') {
    const url = `${this.url}/v1/admin/hospital/total?query=${query}`;
    return this.http.get(url).toPromise();
  }

  save(data: any) {
    const url = `${this.url}/v1/admin/hospital`;
    return this.http.post(url, { data }).toPromise();
  }

  update(data: any, id: any) {
    const url = `${this.url}/v1/admin/hospital/${id}`;
    return this.http.put(url, { data }).toPromise();
  }

  remove(id: any) {
    const url = `${this.url}/v1/admin/hospital/${id}`;
    return this.http.delete(url).toPromise();
  }

  async getSupplieHospital() {
    const url = `${this.url}/v1/admin/supplies/check-supplie`;
    return await this.http.get(url).toPromise();
  }

  getHeadHospital (code) {
    const url = `${this.url}/v1/admin/hospital/${code}/hospcode`;
    return this.http.get(url).toPromise();
  }
}
