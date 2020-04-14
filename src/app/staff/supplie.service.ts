import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplieService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getSupplieHospital() {
    const url = `${this.apiUrl}/v1/staff/supplies/check-supplie/hos`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies() {
    const url = `${this.apiUrl}/v1/staff/supplies/actived`;
    return await this.http.get(url).toPromise();
  }

  async getSupplieStock() {
    const url = `${this.apiUrl}/v1/staff/supplies`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v1/staff/supplies`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getSupplieDetails(id) {
    const url = `${this.apiUrl}/v1/staff/supplies/details/${id}`;
    return await this.http.get(url).toPromise();
  }

  // async getBalanceList() {
  //   const url = `${this.apiUrl}/v1/staff/balance`;
  //   return await this.http.get(url).toPromise();
  // }

  // async getBalanceEdit(id) {
  //   const url = `${this.apiUrl}/v1/staff/balance/${id}`;
  //   return await this.http.get(url).toPromise();
  // }

  // async updateBalance(id, data) {
  //   const url = `${this.apiUrl}/v1/staff/balance/${id}`;
  //   return await this.http.put(url, { data }).toPromise();
  // }
}
