import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsSumDailyService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientSumDaily (params) {
    const url = `${this.url}/v1/new-manager/report-all/patients-report?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientSumDaily (params) {
    const url = `${this.url}/v1/new-manager/export/patient-sum-daily?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
