import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsAdmitService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientAdmit (params) {
    const url = `${this.url}/v1/new-report/admit-case?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  getPatientAdmitSummary (params) {
    const url = `${this.url}/v1/new-report/admit-case-summary?start=${params.date}&end=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientAdmit (params) {
    const url = `${this.url}/v1/new-manager/export/patient-admit?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
