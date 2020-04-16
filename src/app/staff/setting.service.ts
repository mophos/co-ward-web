import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getInfo() {
    const url = `${this.apiUrl}/v1/staff/setting`;
    return await this.http.get(url).toPromise();
  }

  async getUserInfo() {
    const url = `${this.apiUrl}/v1/staff/setting/user`;
    return await this.http.get(url).toPromise();
  }

  async updateUser(data: any) {
    const url = `${this.apiUrl}/v1/staff/setting/user`;
    return await this.http.put(url, { data }).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v1/staff/setting`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getBeds() {
    const url = `${this.apiUrl}/v1/staff/setting/beds`;
    return await this.http.get(url).toPromise();
  }

  async getRemain() {
    const url = `${this.apiUrl}/v1/staff/setting/beds/remain`;
    return await this.http.get(url).toPromise();
  }

  async getMedicalSupplies() {
    const url = `${this.apiUrl}/v1/staff/setting/medical-supplies`;
    return await this.http.get(url).toPromise();
  }

  async getProfessional() {
    const url = `${this.apiUrl}/v1/staff/setting/professional`;
    return await this.http.get(url).toPromise();
  }

  async saveBeds(data) {
    const url = `${this.apiUrl}/v1/staff/setting/beds`;
    return await this.http.post(url, { data }).toPromise();
  }

  async saveProfessional(data) {
    const url = `${this.apiUrl}/v1/staff/setting/professional`;
    return await this.http.post(url, { data }).toPromise();
  }

}
