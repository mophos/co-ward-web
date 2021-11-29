import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsHospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedHospital () {
    const url = `${this.url}/v1/new-manager/report-all/bed-report-by-hospital`;
    return this.http.get(url).toPromise();
  }

}
