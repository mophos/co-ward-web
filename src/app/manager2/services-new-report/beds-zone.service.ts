import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsZoneService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedZone (params) {
    const url = `${this.url}/v1/new-manager/report-all/bed-report-by-zone?date=${params.date}`;
    return this.http.get(url).toPromise();
  }

  exportExcelBedZone (params) {
    const url = `${this.url}/v1/new-manager/export/bed-report-by-zone?date=${params.date}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
