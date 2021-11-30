import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsProvinceService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedProvince () {
    const url = `${this.url}/v1/new-manager/report-all/bed-report-by-province`;
    return this.http.get(url).toPromise();
  }

  exportExcelBedProvince () {
    const url = `${this.url}/v1/new-manager/export/bed-report-by-province`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
