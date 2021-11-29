import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsSumDailyService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientSumDaily () {
    const url = `${this.url}/`;
    return this.http.get(url).toPromise();
  }

}
