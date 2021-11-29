import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsProvinceService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientProvince (params) {
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-province?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

}
