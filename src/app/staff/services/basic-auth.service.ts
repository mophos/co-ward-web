import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getGCS() {
    const url = `${this.apiUrl}/v1/basic-auth/gcs`;
    return await this.http.get(url).toPromise();
  }

  async getBeds() {
    const url = `${this.apiUrl}/v1/basic-auth/beds-admin`;
    return await this.http.get(url).toPromise();
  }

  async getICD10(query) {
    const url = `${this.apiUrl}/v1/basic-auth/icd10?query=${query}`;
    return await this.http.get(url).toPromise();
  }

  async getMedicalSupplies() {
    const url = `${this.apiUrl}/v1/basic-auth/medical-supplies`;
    return await this.http.get(url).toPromise();
  }

  async getCountry() {
    const url = `${this.apiUrl}/v1/basic-auth/country`;
    return await this.http.get(url).toPromise();
  }

  async getGenericSet(type) {
    const url = `${this.apiUrl}/v1/basic-auth/generic-set?type=${type}`;
    return await this.http.get(url).toPromise();
  }

  async closeSystems() {
    const url = `${this.apiUrl}/v1/basic-auth/close-systems`;
    return await this.http.get(url).toPromise();
  }

  async openSystems() {
    const url = `${this.apiUrl}/v1/basic-auth/open-systems`;
    return await this.http.get(url).toPromise();
  }

  async broadcast(message) {
    const url = `${this.apiUrl}/v1/basic-auth/broadcast`;
    return await this.http.post(url, { message }).toPromise();
  }

  async getGeneric(id) {
    const url = `${this.apiUrl}/v1/basic-auth/generic/history?id=${id}`;
    return await this.http.get(url).toPromise();
  }

  async getGenerics() {
    const url = `${this.apiUrl}/v1/basic-auth/generics`;
    return await this.http.get(url).toPromise();
  }

  async saveGeneric(data, id) {
    const url = `${this.apiUrl}/v1/basic-auth/generic/history?id=${id}`;
    return await this.http.post(url, { data }).toPromise();
  }

}
