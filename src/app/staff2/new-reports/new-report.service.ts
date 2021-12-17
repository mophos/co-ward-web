import { Injectable,Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewReportService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientAdmit (params) {
    const url = `${this.url}/v1/new-report/admit-case?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  getPatientAdmitSummary (params) {
    const url = `${this.url}/v1/new-report/admit-case-summary?start=${params.date}&end=${params.date}`;
    return this.http.get(url).toPromise();
  }

  getNewBeds (params) {
    // const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    // let provinceQuery = ''
    // params.province.forEach(item => {
    //   provinceQuery += `&provinces[]=${item.code}`
    // })
    const url = `${this.url}/v1/new-staff/report-all/bed-report-by-hospital?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientAdmit (params) {
    const url = `${this.url}/v1/new-manager/export/admit-case?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  exportExcelPatientAdmitSummary (params) {
    const url = `${this.url}/v1/new-manager/export/admit-case-summary?start=${params.date}&end=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
