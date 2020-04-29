import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportDmsService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getReport2(date) {
    const url = `${this.url}/v1/manager/report-dms/report2?date=${date}`;
    return this.http.get(url).toPromise();
  }

  getReport2Excel(date) {
    const url = `${this.url}/v1/manager/report-dms/report2/excel?date=${date}`;
    return this.http.get(url).toPromise();
  }
}
