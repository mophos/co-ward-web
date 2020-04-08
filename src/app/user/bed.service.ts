import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

  async getBeds() {
    const url = `${this.apiUrl}/v1/staff/bed`;
    return await this.http.get(url).toPromise();
  }

  async getBedDetails(id) {
    const url = `${this.apiUrl}/v1/staff/bed/${id}`;
    return await this.http.get(url).toPromise();
  }

  async getBedHospital() {
    const url = `${this.apiUrl}/v1/staff/bed/check-bed`;
    return await this.http.get(url).toPromise();
  }

  async saveBed() {
    const url = `${this.apiUrl}/v1/staff/bed/save/bed`;
    return await this.http.get(url).toPromise();
  }

  async saveDetail(id, data) {
    const url = `${this.apiUrl}/v1/staff/bed`;
    return await this.http.post(url, { id, data }).toPromise();
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
