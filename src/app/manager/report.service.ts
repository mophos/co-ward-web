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
    const url = `${this.apiUrl}/v1/report/get-gcs-admit?zone=${zone}&date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getProfessionals(zone) {
    const url = `${this.apiUrl}/v1/report/get-professional?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getBeds(zone, date) {
    const url = `${this.apiUrl}/v1/report/get-bed?zone=${zone}&date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getMedicals(zone) {
    const url = `${this.apiUrl}/v1/report/get-medicals?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getCase() {
    const url = `${this.apiUrl}/v1/report/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getSupplies(date, query = '', zone = '') {
    const url = `${this.apiUrl}/v1/report/get-supplies?date=${date}&query=${query}&zone=${zone}`;
    return await this.http.get(url).toPromise();
  }


  async getSupplieExport(date, query = '', zone = '') {
    const url = `${this.apiUrl}/v1/report/get-supplies/export?date=${date}&query=${query}&zone=${zone}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getTotal() {
    const url = `${this.apiUrl}/v1/report/total`;
    return await this.http.get(url).toPromise();
  }

  async getSumByZone(zone) {
    const url = `${this.apiUrl}/v1/report/total-zone?zone=${zone}`;
    return await this.http.get(url).toPromise();
  }

  async getAdminBeds() {
    const url = `${this.apiUrl}/v1/report/admin/get-bed`;
    return await this.http.get(url).toPromise();
  }

  async getReportBedExcel() {
    const url = `${this.apiUrl}/v1/report/get-bed/excel/new`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReportBedCsv() {
    const url = `${this.apiUrl}/v1/report/admin/get-bed/csv`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async provinceCaseDate(startDate, endDate) {
    const url = `${this.apiUrl}/v1/report/province-case-date?startDate=${startDate}&endDate=${endDate}`;
    return await this.http.get(url).toPromise();
  }

  async admitConfirmCase() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case`;
    return await this.http.get(url).toPromise();
  }

  async admitConfirmCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case-summary`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCase() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case-summary`;
    return await this.http.get(url).toPromise();
  }

  async homework() {
    const url = `${this.apiUrl}/v1/report/homework`;
    return await this.http.get(url).toPromise();
  }

  async homeworkDetail(filter = 'all') {
    const url = `${this.apiUrl}/v1/report/homework-detail?filter=${filter}`;
    return await this.http.get(url).toPromise();
  }

  async getRecords() {
    const url = `${this.apiUrl}/v1/report/records`;
    return await this.http.get(url).toPromise();
  }

  async getLocalQuarantine() {
    const url = `${this.apiUrl}/v1/report/local-quarantine`;
    return await this.http.get(url).toPromise();
  }

  async getLocalQuarantineHotel() {
    const url = `${this.apiUrl}/v1/report/local-quarantine-hotel`;
    return await this.http.get(url).toPromise();
  }

  async summaryLocalQuarantineZone() {
    const url = `${this.apiUrl}/v1/report/summary-local-quarantine-zone`;
    return await this.http.get(url).toPromise();
  }

  async summaryLocalQuarantineZone2() {
    const url = `${this.apiUrl}/v1/report/summary-local-quarantine-zone/2`;
    return await this.http.get(url).toPromise();
  }

  async summaryLocalQuarantineProvince() {
    const url = `${this.apiUrl}/v1/report/summary-local-quarantine-province`;
    return await this.http.get(url).toPromise();
  }
}
