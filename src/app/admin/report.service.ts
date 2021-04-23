import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getPatients(zone, date) {
    const url = `${this.apiUrl}/v2/report/get-gcs-admit?zone=${zone}&date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getProfessionals(zone) {
    const url = `${this.apiUrl}/v2/report/get-professional?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getBeds(zone, date) {
    const url = `${this.apiUrl}/v2/report/get-bed?zone=${zone}&date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getAdminBeds() {
    const url = `${this.apiUrl}/v2/report/admin/get-bed`;
    return await this.http.get(url).toPromise();
  }

  async getMedicals(zone, date) {
    const url = `${this.apiUrl}/v2/report/get-medicals?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getCase() {
    const url = `${this.apiUrl}/v2/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(date, query, zone) {
    const url = `${this.apiUrl}/v2/report/get-supplies?date=${date}&query=${query}&zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getTotal() {
    const url = `${this.apiUrl}/v2/report/total`;
    return await this.http.get(url).toPromise();
  }

  async getSumByZone(zone) {
    const url = `${this.apiUrl}/v2/report/total-zone?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getFulFillDrugs1(id) {
    const url = `${this.apiUrl}/v2/report/fulfill-drugs-1?id=` + map(id, 'id').join('&id=');
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getFulFillDrugs2(id) {
    const url = `${this.apiUrl}/v2/report/fulfill-drugs-2?id=` + map(id, 'id').join('&id=');
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getFulFillSuppiles(id) {
    const url = `${this.apiUrl}/v2/report/fulfill-supplies?id=` + map(id, 'id').join('&id=');
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReportBedExcel() {
    const url = `${this.apiUrl}/v2/report/admin/get-bed/exce`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReportBedCsv() {
    const url = `${this.apiUrl}/v2/report/admin/get-bed/csv`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
}
