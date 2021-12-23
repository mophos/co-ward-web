import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsZoneService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientZone (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-zone?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientZone (params) {
    const url = `${this.url}/v1/new-manager/export/patient-report-by-zone?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
