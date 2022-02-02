import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  async getTitle() {
    const url = `${this.apiUrl}/v1/basic/title`;
    return await this.http.get(url).toPromise();
  }

  async getProvince() {
    const url = `${this.apiUrl}/v1/basic/province`;
    return await this.http.get(url).toPromise();
  }

  async getDate() {
    const url = `${this.apiUrl}/date`;
    return await this.http.get(url).toPromise();
  }

  async checkTimeCut() {
    const url = `${this.apiUrl}/time-cut`;
    return await this.http.get(url).toPromise();
  }

  async getDateCut() {
    const url = `${this.apiUrl}/date-time-cut`;
    return await this.http.get(url).toPromise();
  }

  async getSystems() {
    const url = `${this.apiUrl}/v1/basic/systems`;
    return await this.http.get(url).toPromise();
  }

  async getAddCode(t, a, p, z) {
    const url = `${this.apiUrl}/v1/basic/getAddCode?t=${t}&a=${a}&p=${p}&z=${z}`;
    return await this.http.get(url).toPromise();
  }

}
