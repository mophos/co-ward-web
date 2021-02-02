import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PatientsService {

    constructor(private http: HttpClient, @Inject('API_URL') private url: string) { }

    getPatient(queryHc = '', queryHn = '') {
        const url = `${this.url}/v1/admin/patient?&queryHc=${queryHc}&queryHn=${queryHn}`;
        return this.http.get(url).toPromise();
    }

    editInfo(data) {
        const url = `${this.url}/v1/admin/patient/edit-info`;
        return this.http.put(url, { data }).toPromise();
    }


    async getCovidCaseHistory(hospitalId, patientId) {
        const url = `${this.url}/v1/admin/patient/history?hospitalId=${hospitalId}&patientId=${patientId}`;
        return await this.http.get(url).toPromise();
    }

    async getCovidCaseDetails(covidCaseId) {
        const url = `${this.url}/v1/admin/patient/details?covidCaseId=${covidCaseId}`;
        return await this.http.get(url).toPromise();
    }

    async saveEditCovidCase(data) {
        const url = `${this.url}/v1/admin/patient/covid-case`;
        return await this.http.put(url, { data }).toPromise();
    }

    async deleteCovidCase(id) {
        const url = `${this.url}/v1/admin/patient/covid-case/${id}`;
        return await this.http.delete(url).toPromise();
    }

    async saveEditCovidCaseDtail(data) {
        const url = `${this.url}/v1/admin/patient/covid-case-detail`;
        return await this.http.put(url, { data }).toPromise();
    }

    async deleteCovidCaseDetail(id) {
        const url = `${this.url}/v1/admin/patient/covid-case-detail/${id}`;
        return await this.http.delete(url).toPromise();
    }

    async getPatientDischarge(hospitalId) {
        const url = `${this.url}/v1/admin/patient-discharge?hospitalId=${hospitalId}`;
        return await this.http.get(url).toPromise();
    }

}
