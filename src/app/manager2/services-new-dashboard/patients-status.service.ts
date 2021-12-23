import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsStatusService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientsStatus (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const sectorQuery = params.sector ? `&sector[]=${params.sector}` : ''
    const subMinistryQuery = params.subMinistry ? `&sub_ministry_codes[]=${params.subMinistry}` : ''
    const bedTypeQuery = params.bedType ? `&bed_ids[]=${params.bedType}` : ''
    const query = zonesQuery + provinceQuery + sectorQuery + subMinistryQuery + bedTypeQuery

    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-status-each-date?start=${params.startDate}&end=${params.endDate}${query}`;
    return this.http.get(url).toPromise();
  }

  getPatientsStatusCategory (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const sectorQuery = params.sector ? `&sector[]=${params.sector}` : ''
    const subMinistryQuery = params.subMinistry ? `&sub_ministry_codes[]=${params.subMinistry}` : ''
    const bedTypeQuery = params.bedType ? `&bed_ids[]=${params.bedType}` : ''
    const query = zonesQuery + provinceQuery + sectorQuery + subMinistryQuery + bedTypeQuery

    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-category?start=${params.startDate}&end=${params.endDate}${query}`;
    return this.http.get(url).toPromise();
  }

  getPatientsStatusEttDead (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const sectorQuery = params.sector ? `&sector[]=${params.sector}` : ''
    const subMinistryQuery = params.subMinistry ? `&sub_ministry_codes[]=${params.subMinistry}` : ''
    const bedTypeQuery = params.bedType ? `&bed_ids[]=${params.bedType}` : ''
    const query = zonesQuery + provinceQuery + sectorQuery + subMinistryQuery + bedTypeQuery

    const url = `${this.url}/v1/new-manager/report-all/ett-and-date-report?start=${params.startDate}&end=${params.endDate}${query}`;
    return this.http.get(url).toPromise();
  }

}
