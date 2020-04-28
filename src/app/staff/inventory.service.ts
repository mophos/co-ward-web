import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getSuppiles() {
    const url = `${this.apiUrl}/v1/staff/balance/supplies`;
    return await this.http.get(url).toPromise();
  }

  async saveBalance(data) {
    const url = `${this.apiUrl}/v1/staff/balance`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getBalanceList() {
    const url = `${this.apiUrl}/v1/staff/balance`;
    return await this.http.get(url).toPromise();
  }

  async getBalanceEdit(id) {
    const url = `${this.apiUrl}/v1/staff/balance/${id}`;
    return await this.http.get(url).toPromise();
  }

  async updateBalance(id, data) {
    const url = `${this.apiUrl}/v1/staff/balance/${id}`;
    return await this.http.put(url, { data }).toPromise();
  }

  async getInventoryStatus(limit = 20, offset = 0) {
    const url = `${this.apiUrl}/v1/staff/balance/inventory-status?limit=${limit}&offset=${offset}`;
    return await this.http.get(url).toPromise();
  }

  async getReceives() {
    const url = `${this.apiUrl}/v1/staff/balance/receives`;
    return await this.http.get(url).toPromise();
  }

  async getListFulfull() {
    const url = `${this.apiUrl}/v1/staff/receives/fulfill`;
    return await this.http.get(url).toPromise();
  }

  async getReceivesDetail(id) {
    const url = `${this.apiUrl}/v1/staff/balance/get-receives-detail?id=${id}`;
    return await this.http.get(url).toPromise();
  }

  async getReceivesGenerics() {
    const url = `${this.apiUrl}/v1/staff/balance/get-receives-generics`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v1/staff/balance/save`;
    return await this.http.post(url, { data }).toPromise();
  }

  async saveWmGenerics(data) {
    const url = `${this.apiUrl}/v1/staff/receives`;
    return await this.http.post(url, { data }).toPromise();
  }
}
