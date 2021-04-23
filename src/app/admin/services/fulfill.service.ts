import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FulfillService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getListDrugs(orderType = null, orderSort = null) {
    const url = `${this.url}/v2/admin/fulfill/product/drugs?orderType=${orderType}&orderSort=${orderSort}`;
    return this.http.get(url).toPromise();
  }

  getListSupplies(orderType = null, orderSort = null) {
    const url = `${this.url}/v2/admin/fulfill/product/supplies?orderType=${orderType}&orderSort=${orderSort}`;
    return this.http.get(url).toPromise();
  }

  getListSurgical() {
    const url = `${this.url}/v2/admin/fulfill/list/surgical-mask`;
    return this.http.get(url).toPromise();
  }

  calSurgicalMask(hosptypeCode, totalQty) {
    const url = `${this.url}/v2/admin/fulfill/surgical-mask`;
    return this.http.post(url, { hosptypeCode, totalQty }).toPromise();
  }

  getHopsNode() {
    const url = `${this.url}/v2/admin/fulfill/min-max/get-hopsnode`;
    return this.http.get(url).toPromise();
  }

  saveFulFillDrug(data: any) {
    const url = `${this.url}/v2/admin/fulfill/drugs`;
    return this.http.post(url, { data }).toPromise();
  }
  getFulFillDrug() {
    const url = `${this.url}/v2/admin/fulfill/drugs`;
    return this.http.get(url).toPromise();
  }
  saveFulFillSupplies(data: any, list: any) {
    const url = `${this.url}/v2/admin/fulfill/supplies`;
    return this.http.post(url, { data, list }).toPromise();
  }
  getFulFillSupplies() {
    const url = `${this.url}/v2/admin/fulfill/supplies`;
    return this.http.get(url).toPromise();
  }

  getFulFillUnpaidSupplies() {
    const url = `${this.url}/v2/admin/fulfill/supplies/unpaids`;
    return this.http.get(url).toPromise();
  }

  approvedDrugs(data) {
    const url = `${this.url}/v2/admin/fulfill/drugs/approved`;
    return this.http.post(url, { data }).toPromise();
  }
  approvedSupplies(data) {
    const url = `${this.url}/v2/admin/fulfill/supplies/approved`;
    return this.http.post(url, { data }).toPromise();
  }

  getHopsNodeDrugs() {
    const url = `${this.url}/v2/admin/min-max/get-hopsnode-drugs`;
    return this.http.get(url).toPromise();
  }

  getHopsNodeSupplies() {
    const url = `${this.url}/v2/admin/min-max/get-hopsnode-supplies`;
    return this.http.get(url).toPromise();
  }

  getDrugMinMax(hospitalId) {
    const url = `${this.url}/v2/admin/min-max/get-min-max?hospitalId=${hospitalId}&type=DRUG`;
    return this.http.get(url).toPromise();
  }

  getSuppliesMinMax(hospitalId) {
    const url = `${this.url}/v2/admin/min-max/get-min-max?hospitalId=${hospitalId}&type=SUPPLIES`;
    return this.http.get(url).toPromise();
  }

  saveDrugMinMax(data: any) {
    const url = `${this.url}/v2/admin/min-max/save?type=DRUG`;
    return this.http.post(url, { data }).toPromise();
  }

  saveSurgicalMask(data: any, week: any) {
    const url = `${this.url}/v2/admin/fulfill/surgical-mask/save`;
    return this.http.post(url, { data, week }).toPromise();
  }

  saveSuppliesMinMax(data: any) {
    const url = `${this.url}/v2/admin/min-max/save?type=SUPPLIES`;
    return this.http.post(url, { data }).toPromise();
  }

  getDrugSumDetails(id) {
    const url = `${this.url}/v2/admin/fulfill/drugs-sum-details?id=${id}`;
    return this.http.get(url).toPromise();
  }

  approved(data) {
    const url = `${this.url}/v2/admin/fulfill/approved-surgicak-mask?data=${data}`;
    return this.http.get(url).toPromise();
  }

  getSuppliesSumDetails(id) {
    const url = `${this.url}/v2/admin/fulfill/supplies-sum-details?id=${id}`;
    return this.http.get(url).toPromise();
  }

  getSurgicalMaskDetails(id) {
    const url = `${this.url}/v2/admin/fulfill/detail/surgical-mask-details?id=${id}`;
    return this.http.get(url).toPromise();
  }

  getNodeDrugs() {
    const url = `${this.url}/v2/admin/fulfill/node/drugs`;
    return this.http.get(url).toPromise();
  }

  getBalanceDrugs(hospitalId) {
    const url = `${this.url}/v2/admin/fulfill/balance/drugs?hospitalId=${hospitalId}`;
    return this.http.get(url).toPromise();
  }
}
