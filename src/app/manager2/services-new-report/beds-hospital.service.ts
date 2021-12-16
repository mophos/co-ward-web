import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsHospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedHospital (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const url = `${this.url}/v1/new-manager/report-all/bed-report-by-hospital?date=${params.date}${zonesQuery}${provinceQuery}`;
    return this.http.get(url).toPromise();
  }

  exportExcelBedHospital (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const url = `${this.url}/v1/new-manager/export/bed-report-by-hospital?date=${params.date}${zonesQuery}${provinceQuery}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
