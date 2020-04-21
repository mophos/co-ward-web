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
    const url = `${this.apiUrl}/v1/manager/report/zone?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getCase() {
    const url = `${this.apiUrl}/v1/manager/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(date, query, zone) {
    const url = `${this.apiUrl}/v1/manager/report/supplies?date=${date}&query=${query}&zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getTotal() {
    const url = `${this.apiUrl}/v1/manager/report/total`;
    return await this.http.get(url).toPromise();
  }

}
