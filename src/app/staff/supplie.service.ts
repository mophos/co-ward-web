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
    const url = `${this.apiUrl}/v2/staff/supplies/total`;
    return await this.http.get(url).toPromise();
  }

  async getTotal() {
    const url = `${this.apiUrl}/v2/staff/covid-case/gcs-bed`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies() {
    const url = `${this.apiUrl}/v2/staff/supplies/actived`;
    return await this.http.get(url).toPromise();
  }

  async getSupplieStock() {
    const url = `${this.apiUrl}/v2/staff/supplies`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v2/staff/supplies`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getSupplieDetails(id) {
    const url = `${this.apiUrl}/v2/staff/supplies/details/${id}`;
    return await this.http.get(url).toPromise();
  }

}
