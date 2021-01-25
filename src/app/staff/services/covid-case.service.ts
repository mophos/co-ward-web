import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidCaseService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getCovidCase(query = '') {
    const url = `${this.apiUrl}/v1/staff/covid-case?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getListOldPatients(token) {
    const url = `${this.apiUrl}/v1/staff/covid-case/list/old-patient?token=${token}`;
    return await this.http.get(url).toPromise();
  }

  async getListOldPatientDetails(covidCaseId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/list/old-patient/details?id=${covidCaseId}`;
    return await this.http.get(url).toPromise();
  }

  async getCovidCasePresent(query) {
    const url = `${this.apiUrl}/v1/staff/covid-case/present?query=${query}`;
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

  async getCovidCaseDetails(covidCaseId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/details?covidCaseId=${covidCaseId}`;
    return await this.http.get(url).toPromise();
  }

  async saveNewCase(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case`;
    return await this.http.post(url, { data }).toPromise();
  }

  async saveOldCase(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case/old`;
    return await this.http.post(url, { data }).toPromise();
  }

  async updateCase(id, data) {
    const url = `${this.apiUrl}/v1/staff/covid-case`;
    return await this.http.put(url, { data }).toPromise();
  }

  async updateConfrimDate(id, date) {
    const url = `${this.apiUrl}/v1/staff/covid-case/confirm-date`;
    return await this.http.put(url, { id, date }).toPromise();
  }

  async updateStatus(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case/present`;
    return await this.http.put(url, { data }).toPromise();
  }

  async editStatus(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case/present/edit`;
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

  async getListHosp() {
    const url = `${this.apiUrl}/v1/staff/covid-case/node`;
    return await this.http.get(url).toPromise();
  }

  async getListHospDetail(hospitalIdClient) {
    const url = `${this.apiUrl}/v1/staff/covid-case/node/detail?hospitalIdClient=${hospitalIdClient}`;
    return await this.http.get(url).toPromise();
  }

  async getListHospDetailClient() {
    const url = `${this.apiUrl}/v1/staff/covid-case/node/detail/client`;
    return await this.http.get(url).toPromise();
  }

  async getListReqDrug(reqId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/node/requisition?reqId=${reqId}`;
    return await this.http.get(url).toPromise();
  }

  async getReqStock(id) {
    const url = `${this.apiUrl}/v1/staff/covid-case/requisition-stock`;
    return await this.http.post(url, { id }).toPromise();
  }

  async approved(data, dataReqId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/requisition`;
    return await this.http.post(url, { data, dataReqId }).toPromise();
  }

  async updateOldPatient(data) {
    const url = `${this.apiUrl}/v1/staff/covid-case/update/old-patient`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getListApprovedDetauls(id) {
    const url = `${this.apiUrl}/v1/staff/covid-case/approved-detail?id=${id}`;
    return await this.http.get(url).toPromise();
  }

  async getBeds(token) {
    const url = `${this.apiUrl}/v1/staff/covid-case/beds?token=${token}`;
    return await this.http.get(url).toPromise();
  }

  async getGCS(token) {
    const url = `${this.apiUrl}/v1/staff/covid-case/gcs?token=${token}`;
    return await this.http.get(url).toPromise();
  }
  async getVentilators(token) {
    const url = `${this.apiUrl}/v1/staff/covid-case/ventilators?token=${token}`;
    return await this.http.get(url).toPromise();
  }
  async getMedicalSupplies() {
    const url = `${this.apiUrl}/v1/staff/covid-case/medical-supplies`;
    return await this.http.get(url).toPromise();
  }

  async updateDischarge(data, detail) {
    const url = `${this.apiUrl}/v1/staff/covid-case/update/discharge`;
    return await this.http.post(url, { data, detail }).toPromise();
  }

  async removeCase(id) {
    const url = `${this.apiUrl}/v1/staff/covid-case?covidCaseId=${id}`;
    return await this.http.delete(url).toPromise();
  }

  async infoCidByKey(key, type) {
    const url = `${this.apiUrl}/v1/staff/smh?key=${key}&type=${type}`;
    return await this.http.get(url).toPromise();
  }

  async splitDates(covidCaseId) {
    const url = `${this.apiUrl}/v1/staff/covid-case/detail/split-dates?covidCaseId=${covidCaseId}`;
    return await this.http.get(url).toPromise();
  }

  async updateAllCase() {
    const url = `${this.apiUrl}/v1/staff/covid-case/update/all-case`;
    return await this.http.get(url).toPromise();
  }
}
