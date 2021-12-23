import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsHospitalService {

  constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

  getPatientHospital (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const url = `${this.url}/v1/new-manager/report-all/patient-report-by-hospital?date=${params.date}${zonesQuery}${provinceQuery}`;
    return this.http.get(url).toPromise();
  }

  exportExcelPatientHospital (params) {
    const zonesQuery = params.zone ? `&zones[]=${params.zone}` : ''
    let provinceQuery = ''
    params.province.forEach(item => {
      provinceQuery += `&provinces[]=${item.code}`
    })
    const url = `${this.url}/v1/new-manager/export/patient-report-by-hospital?date=${params.date}${zonesQuery}${provinceQuery}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

}
