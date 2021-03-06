import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsDischargeService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientDischarge (params) {
    const url = `${this.url}/v1/new-report/discharge-case?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  getPatientDischargeSummary (params) {
    const url = `${this.url}/v1/new-report/discharge-case-summary?start=${params.date}&end=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientDischarge (params) {
    const url = `${this.url}/v1/new-manager/export/discharge-case?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  exportExcelPatientDischargeSummary (params) {
    const url = `${this.url}/v1/new-manager/export/discharge-case-summary?start=${params.date}&end=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
