import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportDmsService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getReport1() {
    const url = `${this.apiUrl}/v1/manager/report-dms/report1`;
    return await this.http.get(url).toPromise();
  }

  async getReport1Excel() {
    const url = `${this.apiUrl}/v1/manager/report-dms/report1/excel`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport2(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report2?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport2Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report2/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport3(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report3?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport3Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report3/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport4(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report4?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport4Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report4/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport5(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report5?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport5Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report5/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport6(date) {
    const url = `${this.apiUrl}/v1/report/admin/get-bed`;
    return await this.http.get(url).toPromise();
  }

  async getReport6Excel(date) {
    const url = `${this.apiUrl}/v1/report/admin/get-bed/exce`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport7(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report7?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport7Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report7/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport8(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report8?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport8Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report8/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport9(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report9?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport9Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report9/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport10(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report10?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport10Excel(date) {
    const url = `${this.apiUrl}/v1/manager/report-dms/report10/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  
  async getReportReviewHomeworkGov() {
    const url = `${this.apiUrl}/v1/manager/report-dms/report-homework-gov`;
    return await this.http.get(url).toPromise();
  }
  async getReportReviewHomeworkComp() {
    const url = `${this.apiUrl}/v1/manager/report-dms/report-homework-comp`;
    return await this.http.get(url).toPromise();
  }

}
