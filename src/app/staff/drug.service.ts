import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getDrugStock() {
    const url = `${this.apiUrl}/v1/staff/drugs`;
    return await this.http.get(url).toPromise();
  }

  async getDrugDetails(id) {
    const url = `${this.apiUrl}/v1/staff/drugs/details/${id}`;
    return await this.http.get(url).toPromise();
  }
  async save(data) {
    const url = `${this.apiUrl}/v1/staff/drugs`;
    return await this.http.post(url, { data }).toPromise();
  }

  async getDrugs() {
    const url = `${this.apiUrl}/v1/staff/drugs/actived`;
    return await this.http.get(url).toPromise();
  }

  async saveBed() {
    const url = `${this.apiUrl}/v1/staff/bed/save/bed`;
    return await this.http.get(url).toPromise();
  }
}
