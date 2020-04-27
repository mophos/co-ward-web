import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FulfillService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(type) {
    const url = `${this.url}/v1/admin/fulfill?type=${type}`;
    return this.http.get(url).toPromise();
  }

  getListSurgical() {
    const url = `${this.url}/v1/admin/fulfill/surgical-mask`;
    return this.http.get(url).toPromise();
  }

  calSurgicalMask(hosptypeCode, totalQty) {
    const url = `${this.url}/v1/admin/fulfill/surgical-mask`;
    return this.http.post(url, { hosptypeCode, totalQty }).toPromise();
  }

  getHopsNode() {
    const url = `${this.url}/v1/admin/fulfill/min-max/get-hopsnode`;
    return this.http.get(url).toPromise();
  }

  getDrugMinMax(hospitalId) {
    const url = `${this.url}/v1/admin/fulfill/min-max/get-drug-min-max?hospitalId=${hospitalId}`;
    return this.http.get(url).toPromise();
  }

  saveDrugMinMax(data: any) {
    const url = `${this.url}/v1/admin/fulfill/min-max/save`;
    return this.http.post(url, { data }).toPromise();
  }

  saveSurgicalMask(data: any) {
    const url = `${this.url}/v1/admin/fulfill/surgical-mask/save`;
    return this.http.post(url, { data }).toPromise();
  }

}
