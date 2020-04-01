
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {
  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) { }

  async getList() {
    const url = `${this.apiUrl}/v1/staff/requisition`;
    return await this.http.get(url).toPromise();
  }

  async getTitle() {
    const url = `${this.apiUrl}/basic/title`;
    return await this.http.get(url).toPromise();
  }

  async getGenerics() {
    const url = `${this.apiUrl}/basic/generics`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v1/staff/requisition`;
    return await this.http.post(url, { data }).toPromise();
  }
}
