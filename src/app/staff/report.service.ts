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

  async admitPuiCase() {
    const url = `${this.apiUrl}/v1/staff/report/admit-pui-case`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCaseSummary() {
    const url = `${this.apiUrl}/v1/staff/report/admit-pui-case-summary`;
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

  async getBedExport() {
    const url = `${this.apiUrl}/v1/report/get-bed/excel/new`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async admitConfirmCase() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case`;
    return await this.http.get(url).toPromise();
  }
  async checkAdmitConfirmCase(data) {
    const url = `${this.apiUrl}/v1/report/check-admit-confirm-case`;
    return await this.http.post(url, data).toPromise();
  }

  async admitConfirmCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case-summary`;
    return await this.http.get(url).toPromise();
  }

  async exportCheckAdmitConfirmCase() {
    const url = `${this.apiUrl}/v1/report/check-admit-confirm-case/export`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async medicalSupplies() {
    const url = `${this.apiUrl}/v1/report/medical-supplies`;
    return await this.http.get(url).toPromise();
  }
  
  async getCovidCaseDc(query = '') {
    const url = `${this.apiUrl}/v1/staff/report/discharge-case?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  

}
