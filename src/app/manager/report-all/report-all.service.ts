import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportAllService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getReport1(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report1?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport1Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report1/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport2(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report2?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport2Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report2/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport3(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report3?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport3Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report3/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport4(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report4?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport4Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report4/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport5(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report5?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport5Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report5/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport6(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6?date=${date}`;
    return await this.http.get(url).toPromise();
  }
  async getReport6Ministry(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6-ministry?date=${date}`;
    return await this.http.get(url).toPromise();
  }
  async getReport6Sector(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6-sector?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport6Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport6MinistryExcel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6-ministry/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport6SectorExcel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report6-sector/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReport7(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7?date=${date}`;
    return await this.http.get(url).toPromise();
  }
  async getReport7Ministry(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7-ministry?date=${date}`;
    return await this.http.get(url).toPromise();
  }
  async getReport7Sector(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7-sector?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport7Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport7MinistryExcel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7-ministry/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport7SectorExcel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report7-sector/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReport8(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report8?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport8Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report8/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport9(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report9?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport9Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report9/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  async getReport10(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report10?date=${date}`;
    return await this.http.get(url).toPromise();
  }

  async getReport10Excel(date, sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report10/excel?date=${date}`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getReportReviewHomework(sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report-homework`;
    return await this.http.get(url).toPromise();
  }

  async getReportReviewHomeworkExcel(sector) {
    const url = `${this.apiUrl}/v2/manager/report-all/report-homework/excel`;
    return await this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  async getProvince() {
    const url = `${this.apiUrl}/v2/manager/report-all/list/province`;
    return await this.http.get(url).toPromise();
  }

}
