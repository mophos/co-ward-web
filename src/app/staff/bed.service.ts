import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

  async getBeds() {
    const url = `${this.apiUrl}/v2/staff/bed`;
    return await this.http.get(url).toPromise();
  }

  async getBedDetails(id) {
    const url = `${this.apiUrl}/v2/staff/bed/${id}`;
    return await this.http.get(url).toPromise();
  }

  async getListBeds() {
    const url = `${this.apiUrl}/v2/staff/bed/list/bed`;
    return await this.http.get(url).toPromise();
  }

  async getBedHospital() {
    const url = `${this.apiUrl}/v2/staff/bed/check-bed`;
    return await this.http.get(url).toPromise();
  }

  async saveBed(date) {
    const url = `${this.apiUrl}/v2/staff/bed/save/bed/${date}`;
    return await this.http.get(url).toPromise();
  }

  async save(data: any) {
    const url = `${this.apiUrl}/v2/staff/bed`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getBalanceList() {
    const url = `${this.apiUrl}/v2/staff/balance`;
    return await this.http.get(url).toPromise();
  }

  async getBalanceEdit(id) {
    const url = `${this.apiUrl}/v2/staff/balance/${id}`;
    return await this.http.get(url).toPromise();
  }

  async updateBalance(id, data) {
    const url = `${this.apiUrl}/v2/staff/balance/${id}`;
    return await this.http.put(url, { data }).toPromise();
  }
}
