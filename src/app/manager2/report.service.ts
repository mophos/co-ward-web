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

  async admitConfirmCase(limit = 100, offset = 0) {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case?limit=${limit}&offset=${offset}`;
    return await this.http.get(url).toPromise();
  }

  async admitConfirmCaseTotal() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case/total`;
    return await this.http.get(url).toPromise();
  }

  async admitConfirmCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case-summary`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCase(limit = 100, offset = 0) {
    const url = `${this.apiUrl}/v1/report/admit-pui-case?limit=${limit}&offset=${offset}`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCaseTotal() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case/total`;
    return await this.http.get(url).toPromise();
  }

  async admitPuiCaseSummary() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case-summary`;
    return await this.http.get(url).toPromise();
  }

  async dischargeDaily(date) {
    const url = `${this.apiUrl}/v1/report/discharge-daily?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async dischargeDailyExport(date) {
    const url = `${this.apiUrl}/v1/report/discharge-daily/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async dischargeDailyExportDms(date) {
    const url = `${this.apiUrl}/v1/report/discharge-daily/excel/dms?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async dischargeCaseEntryDate(date) {
    const url = `${this.apiUrl}/v1/report/discharge-entrydate?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async dischargeCaseEntryDateExport(date) {
    const url = `${this.apiUrl}/v1/report/discharge-entrydate/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
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

  async getLabPositive() {
    const url = `${this.apiUrl}/v1/report/lab-positive`;
    return await this.http.get(url).toPromise();
  }


  async admintConfirmCaseExport() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case/export`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async admintConfirmCaseExportDms() {
    const url = `${this.apiUrl}/v1/report/admit-confirm-case/export/dms`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async admintPuiCaseExport() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case/export`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async admintPuiCaseExportDms() {
    const url = `${this.apiUrl}/v1/report/admit-pui-case/export/dms`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async reportBedZone() {
    const url = `${this.apiUrl}/v1/report/bed-zone`;
    return await this.http.get(url).toPromise();
  }
  async reportBedProvince() {
    const url = `${this.apiUrl}/v1/report/bed-province`;
    return await this.http.get(url).toPromise();
  }

  //////////////// new ////////////////////////

  async  reportRetrospective () {
    const url = 'https://618f591050e24d0017ce16b5.mockapi.io/user'
    return await this.http.get(url).toPromise()
  }
}
