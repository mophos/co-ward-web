import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsHospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientHospital (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-hospital?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientHospital (params) {
    const url = `${this.url}/v1/new-manager/export/patient-report-by-hospital?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
