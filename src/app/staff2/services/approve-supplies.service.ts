import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApproveSuppliesService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getListApproved() {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/approved`;
    return await this.http.get(url).toPromise();
  }

  async getListHosp() {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/node`;
    return await this.http.get(url).toPromise();
  }

  async getListHospDetail(hospitalIdClient) {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/node/detail?hospitalIdClient=${hospitalIdClient}`;
    return await this.http.get(url).toPromise();
  }

  async getListHospDetailClient() {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/node/detail/client`;
    return await this.http.get(url).toPromise();
  }

  async getListReqDrug(reqId) {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/node/requisition?reqId=${reqId}`;
    return await this.http.get(url).toPromise();
  }

  async getReqStock(id) {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/requisition-stock`;
    return await this.http.post(url, { id }).toPromise();
  }

  async approved(data, dataReqId) {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/requisition`;
    return await this.http.post(url, { data, dataReqId }).toPromise();
  }

  async getListApprovedDetauls(id) {
    const url = `${this.apiUrl}/v1/staff/approve-supplies/approved-detail?id=${id}`;
    return await this.http.get(url).toPromise();
  }

}
