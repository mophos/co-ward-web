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
  saveFulFillDrug(data: any) {
    const url = `${this.url}/v1/admin/fulfill/drugs`;
    return this.http.post(url, { data }).toPromise();
  }
  getFulFillDrug() {
    const url = `${this.url}/v1/admin/fulfill/drugs`;
    return this.http.get(url).toPromise();
  }
  saveFulFillSupplies(data: any) {
    const url = `${this.url}/v1/admin/fulfill/supplies`;
    return this.http.post(url, { data }).toPromise();
  }
  getFulFillSupplies() {
    const url = `${this.url}/v1/admin/fulfill/supplies`;
    return this.http.get(url).toPromise();
  }
  approvedDrugs(data) {
    const url = `${this.url}/v1/admin/fulfill/drugs/approved`;
    return this.http.post(url, { data }).toPromise();
  }
  approvedSupplies(data) {
    const url = `${this.url}/v1/admin/fulfill/supplies/approved`;
    return this.http.post(url, { data }).toPromise();
  }

}
