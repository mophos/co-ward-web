import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedsProvinceService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getBedProvince (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let query = zonesQuery
    // let zonesQuery = ''
    // params.zone.forEach(item => {
    //   zonesQuery += `&zones[]=${item.code}`
    // })
    // let provinceQuery = ''
    // params.province.forEach(item => {
    //   provinceQuery += `&provinces[]=${item.code}`
    // })
    // let query = zonesQuery + provinceQuery
    const url = `${this.url}/v1/new-manager/report-all/bed-report-by-province?date=${params.date}${query}`;
    return this.http.get(url).toPromise();
  }

  exportExcelBedProvince (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    const url = `${this.url}/v1/new-manager/export/bed-report-by-province?date=${params.date}${zonesQuery}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
