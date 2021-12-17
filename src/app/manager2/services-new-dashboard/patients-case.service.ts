import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsCaseService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientsCase (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-case-each-date?start=${params.startDate}&end=${params.endDate}`;
    return this.http.get(url).toPromise();
  }

}
