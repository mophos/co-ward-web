import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsZoneService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedZone () {
    const url = `${this.url}/v1//new-manager/report-all/bed-report-by-zone`;
    return this.http.get(url).toPromise();
  }

  exportExcelBedZone () {
    const url = `${this.url}/v1/new-manager/export/bed-report-by-zone`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
