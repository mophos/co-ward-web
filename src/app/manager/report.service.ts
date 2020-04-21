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

  async getPatients(zone, date) {
    const url = `${this.apiUrl}/v1/report/get-gcs?zone=${zone}&date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getProfessionals(zone) {
    const url = `${this.apiUrl}/v1/report/get-professional?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getBeds(zone) {
    const url = `${this.apiUrl}/v1/report/get-bed?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getCase() {
    const url = `${this.apiUrl}/v1/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(date, query, zone) {
    const url = `${this.apiUrl}/v1/report/supplies?date=${date}&query=${query}&zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getTotal() {
    const url = `${this.apiUrl}/v1/report/total`;
    return await this.http.get(url).toPromise();
  }

  async getSumByZone(zone) {
    const url = `${this.apiUrl}/v1/report/total-zone?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

}
