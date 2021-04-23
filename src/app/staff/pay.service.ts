import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async getTimeCut() {
    const url = `${this.apiUrl}/time-cut`;
    return await this.http.get(url).toPromise();
  }

  async getList() {
    const url = `${this.apiUrl}/v2/staff/pay/surgical-mask`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v2/staff/pay`;
    return await this.http.post(url, { data }).toPromise();
  }

  async update(data, id) {
    const url = `${this.apiUrl}/v2/staff/pay?id=${id}`;
    return await this.http.put(url, { data }).toPromise();
  }

  remove(id: any) {
    const url = `${this.apiUrl}/v2/staff/pay/${id}`;
    return this.http.delete(url).toPromise();
  }
}
