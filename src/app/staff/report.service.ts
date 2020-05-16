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


  async getAdmitPatients(date, query) {
    const url = `${this.apiUrl}/v1/report/get-gcs-admit?date=${date}&query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getAdmitPatientExport(date) {
    const url = `${this.apiUrl}/v1/report/get-gcs-admit/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getPatients(date, query) {
    const url = `${this.apiUrl}/v1/report/get-gcs?date=${date}&query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getPatientExport(date) {
    const url = `${this.apiUrl}/v1/report/get-gcs/export?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getSupplies(date, query) {
    const url = `${this.apiUrl}/v1/report/get-supplies?date=${date}&query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getSupplieExport(date) {
    const url = `${this.apiUrl}/v1/report/get-supplies/export?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getBed(date) {
    const url = `${this.apiUrl}/v1/report/get-bed?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getBedExport(date) {
    const url = `${this.apiUrl}/v1/report/get-bed/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async admitConfirmCase() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case`;
    return await this.http.get(url).toPromise();
  }

  async admitConfirmCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case-summary`;
    return await this.http.get(url).toPromise();
  }

}
