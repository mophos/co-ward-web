import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidCaseService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getCovidCase() {
    const url = `${this.apiUrl}/v1/staff/covid-case`;
    return await this.http.get(url).toPromise();
  }

  async getCovidCasePresent() {
    const url = `${this.apiUrl}/v1/staff/covid-case/present`;
    return await this.http.get(url).toPromise();
  }

  async getCovidCaseInfo(covidCaseId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/info?covidCaseId=${covidCaseId}`;
    return await this.http.get(url).toPromise();
  }

  async getCovidCaseHistory(personId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/history?personId=${personId}`;
    return await this.http.get(url).toPromise();
  }

  async saveNewCase(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case`;
    return await this.http.post(url, { data }).toPromise();
  }

  async updateStatus(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case/present`;
    return await this.http.put(url, { data }).toPromise();
  }

  async checkNo(type, cid, passport) {
    const url = `${this.apiUrl}/v1/staff/covid-case/check-register`;
    return await this.http.post(url, {
      type,
      cid,
      passport
    }).toPromise();
  }

  async getListApproved() {
    const url = `${this.apiUrl}/v1/staff/covid-case/approved`;
    return await this.http.get(url).toPromise();
  }
  async getListApprovedDetauls(id) {
    const url = `${this.apiUrl}/v1/staff/covid-case/approved-detail?id=${id}`;
    return await this.http.get(url).toPromise();
  }
}
