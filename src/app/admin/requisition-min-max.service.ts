
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisitionMinMaxService {
  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const url = `${this.url}/basic/hospital`;
    return this.http.get(url).toPromise();
  }

  getGenericSupplies() {
    const url = `${this.url}/v1/admin/supplies-min-max/requisition/center`;
    return this.http.get(url).toPromise();
  }

  getGenericSupplieHosp(hospcode) {
    const url = `${this.url}/v1/admin/supplies-min-max/requisition/center/hosp?hospcode=${hospcode}`;
    return this.http.get(url).toPromise();
  }

  // getListTotal(query = '') {
  //   const url = `${this.url}/v1/admin/hospital/total?query=${query}`;
  //   return this.http.get(url).toPromise();
  // }

  save(data: any) {
    const url = `${this.url}/v1/admin/supplies-min-max/center`;
    return this.http.post(url, { data }).toPromise();
  }

  // update(data: any, id: any) {
  //   const url = `${this.url}/v1/admin/hospital/${id}`;
  //   return this.http.put(url, { data }).toPromise();
  // }

  // remove(id: any) {
  //   const url = `${this.url}/v1/admin/hospital/${id}`;
  //   return this.http.delete(url).toPromise();
  // }

  // async getSupplieHospital() {
  //   const url = `${this.url}/v1/admin/supplies/check-supplie`;
  //   return await this.http.get(url).toPromise();
  // }
}
