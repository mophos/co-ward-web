import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MinMaxService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList() {
    const url = `${this.url}/v1/admin/hospital/types`;
    return this.http.get(url).toPromise();
  }

  getListHosp(hcode, mcode, scode, query = '', limit, offset) {
    const url = `${this.url}/v1/admin/hospital?hosptype_code=${hcode}&ministry_code=${mcode}&sub_ministry_code=${scode}&query=${query}&limit=${limit}&offset=${offset}`;
    return this.http.get(url).toPromise();
  }

  getListHospTotal(hcode, mcode, scode, query) {
    const url = `${this.url}/v1/admin/hospital?hosptype_code=${hcode}&ministry_code=${mcode}&sub_ministry_code${scode}&query=${query}`;
    return this.http.get(url).toPromise();
  }

  getSupplies(hospcode) {
    const url = `${this.url}/v1/admin/supplies-min-max?hospcode=${hospcode}`;
    return this.http.get(url).toPromise();
  }

  // getList(query = '', limit, offset) {
  //   const url = `${this.url}/v1/admin/supplies-min-max?query=${query}&limit=${limit}&offset=${offset}`;
  //   return this.http.get(url).toPromise();
  // }

  // getListTotal(query = '') {
  //   const url = `${this.url}/v1/admin/supplies-min-max/total?query=${query}`;
  //   return this.http.get(url).toPromise();
  // }

  save(data: any, hospcode: any) {
    const _url = `${this.url}/v1/admin/supplies-min-max?hospcode=${hospcode}`;
    return this.http.post(_url, { data: data }).toPromise();
  }

  // update(data: any, id: any) {
  //   const _url = `${this.url}/v1/admin/supplies-min-max/${id}`;
  //   return this.http.put(_url, { data: data }).toPromise();
  // }

  // remove(id: any) {
  //   const _url = `${this.url}/v1/admin/supplies-min-max/${id}`;
  //   return this.http.delete(_url).toPromise();
  // }
}