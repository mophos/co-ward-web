import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getPatients(query) {
    const url = `${this.apiUrl}/v1/staff/report/patient?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getCase() {
    const url = `${this.apiUrl}/v1/staff/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(query) {
    const url = `${this.apiUrl}/v1/staff/report/supplies?query=${query}`;
    return await this.http.get(url).toPromise();
  }
}
