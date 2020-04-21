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

  async getCase() {
    const url = `${this.apiUrl}/v1/staff/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(date, query) {
    const url = `${this.apiUrl}/v1/staff/report/supplies?date=${date}&query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getPatients(date,query) {
    const url = `${this.apiUrl}/v1/staff/report/hosp?date=${date}&query=${query}`;
    return await this.http.get(url).toPromise();
  }
}
