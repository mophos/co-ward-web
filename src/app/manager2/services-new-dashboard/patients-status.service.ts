import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsStatusService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientsStatus (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-status-each-date?start=${params.startDate}&end=${params.endDate}`;
    return this.http.get(url).toPromise();
  }

  getPatientsStatusCategory (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-category?start=${params.startDate}&end=${params.endDate}`;
    return this.http.get(url).toPromise();
  }

  getPatientsStatusEttDead (params) {
    const url = `${this.url}/v1/new-manager/report-all/ett-and-date-report?start=${params.startDate}&end=${params.endDate}`;
    return this.http.get(url).toPromise();
  }

}
