import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

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
}
