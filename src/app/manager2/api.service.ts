import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  checkBedEOC(date) {
    const url = `${this.url}/v1/manager/eoc/beds?date=${date}`;
    return this.http.get(url).toPromise();
  }

  checkBed() {
    const url = `${this.url}/v1/manager/services/check-bed`;
    return this.http.get(url).toPromise();
  }

  checkRemainHosp() {
    const url = `${this.url}/v1/manager/services/remain/hosp/qty`;
    return this.http.get(url).toPromise();
  }

  checkSupplies() {
    const url = `${this.url}/v1/manager/services/check-supplies`;
    return this.http.get(url).toPromise();
  }

}
