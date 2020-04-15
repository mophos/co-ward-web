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

  async getList() {
    const url = `${this.apiUrl}/v1/staff/pay/surgical-mask`;
    return await this.http.get(url).toPromise();
  }

  async save(data) {
    const url = `${this.apiUrl}/v1/staff/pay`;
    return await this.http.post(url, { data }).toPromise();
  }
}
