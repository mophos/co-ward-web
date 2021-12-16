import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RespiratorService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getRespirator (params) {
    const url = `${this.url}/v1/new-manager/report-all/medicals-supplies-report-by-hospital?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelRespirator (params) {
    const url = `${this.url}/v1/new-manager/export/medicals-supplies-report-by-hospital?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
