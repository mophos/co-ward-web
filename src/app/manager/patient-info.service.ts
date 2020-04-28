import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientInfoService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getList(keys) {
    const url = `${this.url}/v1/manager/patient-info?keys=${keys}`;
    return this.http.get(url).toPromise();
  }
}
